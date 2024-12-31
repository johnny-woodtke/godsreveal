// sort-imports-ignore
import Sentry from "./instrumentation";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { Tag } from "@/constants";
import openai from "@/openai/routes";

const port = Bun.env.PORT;
if (!port) {
  throw new Error("PORT is not set");
}

const app = new Elysia()
  .trace(
    Sentry.startNewTrace(() => async (params) => {
      const {
        id,
        context: {
          path,
          request: { method },
        },
      } = params;
      await Sentry.startSpan(
        {
          name: `${method} ${path}`,
          attributes: {
            id,
            method,
            path,
          },
        },
        async (span) => {
          params.onBeforeHandle((process) => {
            span.setAttributes({
              begin: process.begin,
            });
          });

          await params.onAfterResponse((process) => {
            process.onStop((detail) => {
              span.setAttributes({
                end: detail.end,
              });
            });
          });
        },
      );
    }),
  )
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "EschatoloGPT API",
          version: "1.0.0",
        },
        tags: [
          { name: Tag.DEFAULT, description: "Default routes" },
          { name: Tag.THREAD, description: "Thread routes" },
          { name: Tag.MESSAGE, description: "Message routes" },
        ],
      },
    }),
  )
  .onError(({ error }) => {
    Sentry.captureException(error);
  })
  .use(openai)
  .get("/", () => "Server is running", {
    detail: {
      summary: "Server status",
      description: "Checks if the server is running",
      tags: [Tag.DEFAULT],
    },
    params: t.Undefined(),
    response: {
      200: t.String(),
    },
  })
  .listen({
    port,
    idleTimeout: 60, // 60 seconds
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

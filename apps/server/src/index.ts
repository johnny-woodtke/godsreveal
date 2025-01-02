// sort-imports-ignore
import Sentry from "@/instrumentation";

import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { Tag } from "@/constants";
import openai from "@/openai/routes";

const port = Bun.env.PORT;
if (!port) {
  throw new Error("PORT is not set");
}

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/docs",
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
  .use(
    staticPlugin({
      prefix: "/",
    }),
  )
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") {
      return;
    }
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

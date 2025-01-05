import { cors } from "@elysiajs/cors";
import cron from "@elysiajs/cron";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { sentry } from "elysiajs-sentry";

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
  .use(
    cron({
      name: "God's Reveal Keep Alive",
      pattern: "* */1 * * *", // every 1 minute
      run: async () => {
        // get host from env
        const url = Bun.env.GODSREVEAL_HOST;
        if (!url) {
          throw new Error("GODSREVEAL_HOST is not set");
        }

        // if dev, just log
        if (Bun.env.NODE_ENV === "development") {
          console.log("God's Reveal Keep Alive:", url);
          return;
        }

        // get and log response
        const response = await fetch(url);
        console.log(
          "God's Reveal Keep Alive:",
          response.status,
          response.statusText,
        );
      },
    }),
  )
  .use(sentry())
  .use(openai)
  .get(
    "/",
    () => {
      return "Server is running";
    },
    {
      detail: {
        summary: "Server status",
        description: "Checks if the server is running",
        tags: [Tag.DEFAULT],
      },
      params: t.Undefined(),
      response: {
        200: t.String(),
      },
    },
  )
  .listen({
    port,
    idleTimeout: 60, // 60 seconds
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

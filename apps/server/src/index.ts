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
  .use(openai)
  .get("/", () => "Server is running", {
    detail: {
      summary: "Server Status",
      description: "This is a simple server status endpoint",
    },
    response: {
      200: t.String(),
    },
    tags: [Tag.DEFAULT],
  })
  .listen({
    port,
    // 60 seconds
    idleTimeout: 60,
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { verifyAuth } from "@/auth/utils";
import { chat, getMessages } from "@/openai/user";

const port = Bun.env.PORT;
if (!port) {
  throw new Error("PORT is not set");
}

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .onBeforeHandle(({ request, error }) =>
    !verifyAuth(request) ? error(401, "Unauthorized") : undefined,
  )
  .get("/", () => "Server is running", {
    detail: {
      summary: "Server Status",
      description: "This is a simple server status endpoint",
    },
    response: {
      200: t.String(),
    },
  })
  .group("/chat", (app) =>
    app
      .post(
        "/",
        async ({ body, error }) =>
          chat(body)
            .then((res) => {
              if ("status" in res) {
                return error(res.status, res.message);
              }
              return res;
            })
            .catch((e) => {
              const msg = "Error in POST /chat";
              console.error(msg, e);
              return error(
                500,
                "Something went wrong. Please try again later.",
              );
            }),
        {
          body: t.Object({
            message: t.String(),
            threadId: t.Optional(t.String()),
          }),
          detail: {
            summary: "Chat with EschatoloGPT",
            tags: ["chat"],
          },
          response: {
            200: t.Object({
              messages: t.Array(
                t.Object({
                  id: t.String(),
                  role: t.String(),
                  content: t.String(),
                }),
              ),
              hasMore: t.Boolean(),
              threadId: t.String(),
            }),
            404: t.String(),
            500: t.String(),
          },
        },
      )
      .get(
        "/:threadId",
        async ({ params: { threadId }, error }) =>
          getMessages({ threadId })
            .then((res) => {
              if ("status" in res) {
                return error(res.status, res.message);
              }
              return res;
            })
            .catch((e) => {
              const msg = "Error in GET /chat/:threadId";
              console.error(msg, e);
              return error(
                500,
                "Something went wrong. Please try again later.",
              );
            }),
        {
          params: t.Object({
            threadId: t.String(),
          }),
          detail: {
            summary: "Get messages from a thread",
            tags: ["chat"],
          },
          response: {
            200: t.Object({
              messages: t.Array(
                t.Object({
                  id: t.String(),
                  role: t.String(),
                  content: t.String(),
                }),
              ),
              hasMore: t.Boolean(),
              threadId: t.String(),
            }),
            404: t.String(),
            500: t.String(),
          },
        },
      ),
  )
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

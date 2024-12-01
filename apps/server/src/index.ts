import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { verifyAuth } from "@/auth/utils";
import {
  addMessageToThread,
  createThread,
  getMessagesFromThread,
  getMessagesFromThreadSchema,
  getThreadName,
  runThread,
} from "@/openai/user";

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
  .post(
    "/thread/message",
    async ({ body }) => {
      // get or create thread
      let threadId: string;
      if (!body.threadId) {
        threadId = await createThread();
      } else {
        threadId = body.threadId;
      }

      // add message to thread
      await addMessageToThread({
        threadId,
        message: body.message,
      });

      // get messages in thread
      const messages = await getMessagesFromThread({
        threadId,
      });

      // return response
      return {
        messages,
        threadId,
      };
    },
    {
      body: t.Object({
        message: t.String(),
        threadId: t.Optional(t.String()),
      }),
      detail: {
        summary: "Get or create a thread and add a message to it",
      },
      response: {
        200: t.Object({
          messages: getMessagesFromThreadSchema,
          threadId: t.String(),
        }),
      },
    },
  )
  .get(
    "/thread/:threadId",
    ({ params }) =>
      getMessagesFromThread({
        threadId: params.threadId,
      }),
    {
      detail: {
        summary: "Get messages from a thread",
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: getMessagesFromThreadSchema,
      },
    },
  )
  .post(
    "/thread/:threadId/run",
    ({ params }) =>
      runThread({ threadId: params.threadId, assistantName: "egpt" }),
    {
      detail: {
        summary: "Run a thread",
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: getMessagesFromThreadSchema,
      },
    },
  )
  .get(
    "/thread/:threadId/name",
    ({ params }) => getThreadName({ threadId: params.threadId }),
    {
      detail: {
        summary: "Get the name of a thread",
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: t.String(),
      },
    },
  )
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

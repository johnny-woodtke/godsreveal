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
  .post("/thread/create", createThread, {
    detail: {
      summary: "Create a thread",
      description: "Creates a new thread and returns the threadId",
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
        summary: "Send message",
        description:
          "Creates or gets a thread and adds a user-role message to it",
      },
      response: {
        200: t.Object({
          messages: getMessagesFromThreadSchema,
          threadId: t.String(),
        }),
      },
    },
  )
  .get("/thread/:threadId", ({ params }) => getMessagesFromThread(params), {
    detail: {
      summary: "Get messages",
      description: "Gets all messages from a thread",
    },
    params: t.Object({
      threadId: t.String(),
    }),
    response: {
      200: getMessagesFromThreadSchema,
    },
  })
  .post(
    "/thread/:threadId/run",
    ({ params }) => runThread({ ...params, assistantName: "egpt" }),
    {
      detail: {
        summary: "Run a thread",
        description:
          "Runs a thread by sending it to the EschatoloGPT assistant for a response",
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: getMessagesFromThreadSchema,
      },
    },
  )
  .get("/thread/:threadId/name", ({ params }) => getThreadName(params), {
    detail: {
      summary: "Get the thread name",
      description: "Gets the name of a thread by analyzing the messages",
    },
    params: t.Object({
      threadId: t.String(),
    }),
    response: {
      200: t.String(),
    },
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

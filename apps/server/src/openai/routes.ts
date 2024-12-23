import { Elysia, t } from "elysia";

import auth from "@/auth/plugin";
import { Tag } from "@/constants";

import {
  addMessageToThread,
  createThread,
  getMessagesFromThread,
  getMessagesFromThreadSchema,
  getThreadName,
  runThread,
} from "./user";

export default new Elysia()
  .use(auth)
  .post("/thread/create", createThread, {
    detail: {
      summary: "Create a thread",
      description: "Creates a new thread and returns the threadId",
      tags: [Tag.THREAD],
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
        tags: [Tag.MESSAGE, Tag.THREAD],
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
      tags: [Tag.MESSAGE, Tag.THREAD],
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
        tags: [Tag.THREAD],
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
      tags: [Tag.THREAD],
    },
    params: t.Object({
      threadId: t.String(),
    }),
    response: {
      200: t.String(),
    },
  });

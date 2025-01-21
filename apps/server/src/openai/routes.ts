import { Elysia, t } from "elysia";
import { tSync as _tSync, sync } from "elysiajs-sync";

import { config, message } from "@godsreveal/web-idb";

import auth from "@/auth/plugin";
import { Tag } from "@/constants";

import {
  addMessageToThread,
  createThread,
  getMessagesFromThread,
  getThreadName,
  runThread,
} from "./user";

const tSync = _tSync(config);

export default new Elysia()
  .use(auth)
  .use(sync(config))
  .post(
    "/thread/create",
    async ({ sync }) => {
      const thread = await createThread();
      return sync(thread.id, {
        thread: {
          put: [thread, undefined],
        },
      });
    },
    {
      detail: {
        summary: "Create a thread",
        description: "Creates a new thread and returns the threadId",
        tags: [Tag.THREAD],
      },
      body: t.Undefined(),
      response: {
        200: tSync(t.String()),
      },
    },
  )
  .post(
    "/thread/message",
    async ({ sync, body }) => {
      // get or create thread
      let threadId: string;
      if (!body.threadId) {
        const thread = await createThread();
        threadId = thread.id;
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
      const updatedAt = new Date();
      return sync(
        {
          messages,
          threadId,
        },
        {
          message: {
            bulkPut: [messages, undefined, undefined],
          },
          thread: {
            ...(!body.threadId
              ? {
                  put: [
                    { id: threadId, createdAt: updatedAt, updatedAt },
                    undefined,
                  ],
                }
              : {
                  update: [threadId, { updatedAt }],
                }),
          },
        },
      );
    },
    {
      detail: {
        summary: "Send message",
        description:
          "Creates or gets a thread and adds a user-role message to it",
        tags: [Tag.MESSAGE, Tag.THREAD],
      },
      body: t.Object({
        message: t.String(),
        threadId: t.Optional(t.String()),
      }),
      response: {
        200: tSync(
          t.Object({
            messages: t.Array(message),
            threadId: t.String(),
          }),
        ),
      },
    },
  )
  .get(
    "/thread/:threadId",
    async ({ sync, params }) => {
      const messages = await getMessagesFromThread(params);
      return sync(messages, {
        message: {
          bulkPut: [messages, undefined, undefined],
        },
      });
    },
    {
      detail: {
        summary: "Get messages",
        description: "Gets all messages from a thread",
        tags: [Tag.MESSAGE, Tag.THREAD],
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: tSync(t.Array(message)),
      },
    },
  )
  .post(
    "/thread/:threadId/run",
    async ({ params, sync }) => {
      const messages = await runThread({ ...params, assistantName: "egpt" });
      return sync(messages, {
        message: {
          bulkPut: [messages, undefined, undefined],
        },
      });
    },
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
        200: tSync(t.Array(message)),
      },
    },
  )
  .get(
    "/thread/:threadId/name",
    async ({ sync, params }) => {
      const name = await getThreadName(params);
      return sync(name, {
        thread: {
          update: [
            params.threadId,
            {
              name,
            },
          ],
        },
      });
    },
    {
      detail: {
        summary: "Get the thread name",
        description: "Gets the name of a thread by analyzing the messages",
        tags: [Tag.THREAD],
      },
      params: t.Object({
        threadId: t.String(),
      }),
      response: {
        200: tSync(t.String()),
      },
    },
  );

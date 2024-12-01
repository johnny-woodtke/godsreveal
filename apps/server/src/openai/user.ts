import { Static, t } from "elysia";

import { getAssistantIdOrThrow, openai } from "@/openai/client";

export async function createThread(): Promise<string> {
  // create new thread
  const res = await openai("/v1/threads", {
    method: "POST",
  }).then((res) => res.json());

  // return threadId
  return res.id;
}

type AddMessageToThreadProps = {
  threadId: string;
  message: string;
};

export async function addMessageToThread({
  threadId,
  message,
}: AddMessageToThreadProps) {
  // add message to thread
  await openai(`/v1/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      role: "user",
      content: message,
    }),
  });
}

type GetMessagesFromThreadProps = {
  threadId: string;
};

export const getMessagesFromThreadSchema = t.Array(
  t.Object({
    id: t.String(),
    role: t.Union([t.Literal("user"), t.Literal("assistant")]),
    content: t.String(),
  }),
);

export async function getMessagesFromThread({
  threadId,
}: GetMessagesFromThreadProps): Promise<
  Static<typeof getMessagesFromThreadSchema>
> {
  // get messages from thread
  const res = await openai(`/v1/threads/${threadId}/messages`).then((res) =>
    res.json(),
  );

  // format and return messages
  return res.data
    .sort((a: any, b: any) => a.created_at - b.created_at)
    .map((message: any) => ({
      id: message.id,
      role: message.role,
      content: message.content[0].text.value,
    }));
}

type RunThreadProps = {
  threadId: string;
  assistantName: "egpt" | "thread-namer";
};

export async function runThread({
  threadId,
  assistantName,
}: RunThreadProps): Promise<Static<typeof getMessagesFromThreadSchema>> {
  // create an assistant run for the thread
  const res = await openai(`/v1/threads/${threadId}/runs`, {
    method: "POST",
    body: JSON.stringify({
      assistant_id: getAssistantIdOrThrow(assistantName),
      stream: true,
    }),
  });

  // listen for run complete
  await listenForThreadRunCompletion(res);

  // return messages from thread
  return getMessagesFromThread({ threadId });
}

const RUN_COMPLETED_EVENT = "thread.run.completed";

async function listenForThreadRunCompletion(res: Response) {
  // get reader from response
  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error("No response stream available");
  }

  // read the stream
  while (true) {
    // read the stream
    const { done, value } = await reader.read();

    // break if done
    if (done) {
      break;
    }

    // convert the stream chunk to text
    const chunk = new TextDecoder().decode(value);

    // get data from chunk
    const lines = chunk.split("\n");
    const chunkData = {
      event: lines[0]?.split(": ")[1],
      data: lines[1]?.split(": ")[1],
    };

    // check if event is thread.run.completed
    if (chunkData.event === RUN_COMPLETED_EVENT) {
      // parse data and break
      break;
    }
  }
}

type GetThreadNameProps = {
  threadId: string;
};

export async function getThreadName({ threadId }: GetThreadNameProps) {
  // get thread messages
  const threadMessages = await getMessagesFromThread({ threadId });

  // format messages into a string
  const messagesString = threadMessages
    .map((message) => `${roleMap[message.role]}: ${message.content}`)
    .join("\n");

  // create thread
  const nameThreadId = await createThread();

  // add messages to thread
  await addMessageToThread({ threadId: nameThreadId, message: messagesString });

  // run thread
  const messages = await runThread({
    threadId: nameThreadId,
    assistantName: "thread-namer",
  });

  // get thread name from assistant response
  const threadName = messages[1]?.content;

  // throw error if no thread name
  if (!threadName) {
    throw new Error("No thread name found");
  }

  // return thread name
  return threadName;
}

const roleMap = {
  user: "User",
  assistant: "Assistant",
};

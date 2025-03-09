import type { Message, Thread } from "@godsreveal/web-idb";

import { getAssistantIdOrThrow, openai } from "@/openai/client";

export async function createThread(): Promise<Thread> {
  // create new thread
  const res = await openai("/v1/threads", {
    method: "POST",
  }).then((res) => res.json());

  // return threadId
  const createdAt = new Date(res.created_at * 1000);
  return {
    id: res.id,
    createdAt,
    updatedAt: createdAt,
  };
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

export async function getMessagesFromThread({
  threadId,
}: GetMessagesFromThreadProps): Promise<Message[]> {
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
      createdAt: new Date(message.created_at * 1000),
      threadId,
    }));
}

type RunThreadProps = {
  threadId: string;
  assistantName: "egpt" | "thread-namer";
};

export async function runThread({
  threadId,
  assistantName,
}: RunThreadProps): Promise<Message[]> {
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

async function listenForThreadRunCompletion(
  res: Response,
): Promise<{ threadId: string }> {
  // get reader from response
  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error("No response stream available");
  }

  // thread ID
  let threadId: string | undefined;

  // read the stream
  // eslint-disable-next-line no-constant-condition
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

    // set thread ID
    if (!threadId && chunkData.data) {
      try {
        const data = JSON.parse(chunkData.data);
        if (data.thread_id && typeof data.thread_id === "string") {
          threadId = data.thread_id;
        }
      } catch (e) {
        console.error("Error parsing chunk data", e);
      }
    }

    // check if event is thread.run.completed
    if (chunkData.event === RUN_COMPLETED_EVENT) {
      // break
      break;
    }
  }

  // throw error if no thread ID
  if (!threadId) {
    throw new Error("No thread ID found");
  }

  // return thread ID
  return { threadId };
}

type GetThreadNameProps = {
  threadId: string;
};

export async function getThreadName({ threadId }: GetThreadNameProps) {
  // get thread messages
  const messages = await getMessagesFromThread({ threadId });

  // create thread and run
  const res = await openai(`/v1/threads/runs`, {
    method: "POST",
    body: JSON.stringify({
      assistant_id: getAssistantIdOrThrow("thread-namer"),
      thread: {
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      },
      stream: true,
    }),
  });

  // listen for run complete
  const { threadId: nameThreadId } = await listenForThreadRunCompletion(res);

  // get messages from name thread
  const nameMessages = await getMessagesFromThread({ threadId: nameThreadId });

  // get name from messages
  let name = nameMessages[nameMessages.length - 1]?.content;
  if (!name) {
    throw new Error("No thread name found");
  }

  // remove surrounding quotes if present
  if (name.startsWith('"') && name.endsWith('"')) {
    name = name.slice(1, -1);
  }

  // return name
  return name;
}

import { getAssistantIdOrThrow, openai } from "@/openai/client";

type GetMessagesProps = {
  threadId: string;
};

export async function getMessages({ threadId }: GetMessagesProps): Promise<
  | {
      status: 404;
      message: string;
    }
  | {
      messages: {
        id: string;
        role: "user" | "assistant";
        content: string;
      }[];
      hasMore: boolean;
      threadId: string;
    }
> {
  // get response from openai
  const res = await openai(`/v1/threads/${threadId}/messages?order=asc`).then(
    (res) => res.json(),
  );

  // check if response is ok
  if (res.error) {
    return {
      status: 404,
      message: "Thread not found",
    };
  }

  // return response
  return {
    messages: res.data.map((message: any) => ({
      id: message.id,
      role: message.role,
      content: message.content[0].text.value,
    })),
    hasMore: res.has_more,
    threadId,
  };
}

type ChatProps = {
  message: string;
  threadId?: string;
};

export async function chat({ message, threadId: inputtedThreadId }: ChatProps) {
  // get thread for message fetching
  const threadId = await (inputtedThreadId
    ? addMessageToThreadAndRun({
        threadId: inputtedThreadId,
        message,
      })
    : createNewThreadAndRun({ message }));

  // get messages from thread
  return getMessages({ threadId });
}

type CreateNewThreadAndRunProps = {
  message: string;
};

async function createNewThreadAndRun({ message }: CreateNewThreadAndRunProps) {
  // create new thread and run assistant
  const res = await openai("/v1/threads/runs", {
    method: "POST",
    body: JSON.stringify({
      assistant_id: getAssistantIdOrThrow(),
      thread: {
        messages: [{ role: "user", content: message }],
      },
      stream: true,
    }),
  });

  // listen to stream response for runId, threadId
  return listenToRunStream(res);
}

type AddMessageToThreadAndRunProps = {
  threadId: string;
  message: string;
};

async function addMessageToThreadAndRun({
  threadId,
  message,
}: AddMessageToThreadAndRunProps) {
  // add message to thread
  await openai(`/v1/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      role: "user",
      content: message,
    }),
  });

  // create an assistant run for the thread
  const res = await openai(`/v1/threads/${threadId}/runs`, {
    method: "POST",
    body: JSON.stringify({
      assistant_id: getAssistantIdOrThrow(),
      stream: true,
    }),
  });

  // listen to stream response and return threadId and runId
  return listenToRunStream(res);
}

async function listenToRunStream(res: Response) {
  // get reader from response
  const reader = res.body?.getReader();
  if (!reader) {
    throw new Error("No response stream available");
  }

  // initialize threadId
  let threadId: string | undefined;

  // read the stream we get thread run completion
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
    if (chunkData.event === "thread.run.completed") {
      // parse data and break
      const data = JSON.parse(chunkData.data || "{}");
      threadId = data.thread_id;
      break;
    }
  }

  // throw error if threadId is not found
  if (!threadId) {
    throw new Error("Failed to get thread ID from response");
  }

  // return threadId
  return threadId;
}

import { openai } from "@/openai/client";

type GetMessagesProps = {
  threadId: string;
};

export async function getMessages({ threadId }: GetMessagesProps) {
  // get response from openai
  const res = await openai(`/v1/threads/${threadId}/messages?order=asc`).then(
    (res) => res.json(),
  );

  // return response
  return {
    messages: res.data.map((message: any) => ({
      id: message.id,
      content: message.content[0].text.value,
    })),
    hasMore: res.has_more,
  };
}

type ChatProps = {
  message: string;
  threadId?: string;
};

export function chat({ message, threadId }: ChatProps) {
  // if no context is provided, create new thread and run assistant
  if (!threadId) {
    return createNewThreadAndRun({ message });
  }
  // add message to thread and run assistant
  return addMessageToThreadAndRun({
    threadId,
    message,
  });
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
    }),
  }).then((res) => res.json());

  // return thread id
  return res.thread_id;
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
  }).then((res) => res.json());

  // create an assistant run for the thread
  await openai(`/v1/threads/${threadId}/runs`, {
    method: "POST",
    body: JSON.stringify({
      assistant_id: getAssistantIdOrThrow(),
    }),
  }).then((res) => res.json());

  // return thread id
  return threadId;
}

function getAssistantIdOrThrow() {
  const assistantId = Bun.env.EGPT_ASSISTANT_ID;
  if (!assistantId) {
    throw new Error("EGPT_ASSISTANT_ID is not set");
  }
  return assistantId;
}

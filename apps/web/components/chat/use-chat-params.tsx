"use client";

import { useSearchParams } from "next/navigation";

import { usePushUrl } from "@/components/use-push-url";
import { getClient } from "@/lib/eden";

export function useChatParams() {
  const searchParams = useSearchParams();

  const { push } = usePushUrl();

  const client = getClient();

  const threadId = searchParams.get(THREAD_ID_PARAM);

  /**
   * Sets the current thread. Input `null` to start a new thread.
   */
  async function setThreadId(threadId: string | null) {
    const params = new URLSearchParams(searchParams);

    if (threadId) {
      params.set(THREAD_ID_PARAM, threadId);
    } else {
      // create thread and set threadId
      const res = await client.thread.create.post();
      if (!res.data) {
        throw new Error("Failed to create thread");
      }
      params.set(THREAD_ID_PARAM, res.data);
    }

    push({ searchParams: params });
  }

  const chatModalOpen = searchParams.get(CHAT_MODAL_OPEN_PARAM) === "true";

  /**
   * Sets the chat modal open state.
   */
  async function setChatModalOpen(open: boolean) {
    const params = new URLSearchParams(searchParams);

    if (open) {
      params.set(CHAT_MODAL_OPEN_PARAM, "true");
    } else {
      params.delete(CHAT_MODAL_OPEN_PARAM);
      params.delete(THREAD_ID_PARAM);
    }

    push({ searchParams: params });
  }

  return { threadId, setThreadId, chatModalOpen, setChatModalOpen };
}

const THREAD_ID_PARAM = "thread";

const CHAT_MODAL_OPEN_PARAM = "chat";

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getClient } from "@/lib/eden";

export function useParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

    router.push(`${pathname}?${params.toString()}`);
  }

  const chatModalOpen = searchParams.get(CHAT_MODAL_OPEN_PARAM) === "true";

  /**
   * Sets the chat modal open state.
   */
  async function setChatModalOpen(open: boolean) {
    const params = new URLSearchParams(searchParams);

    if (open) {
      params.set(CHAT_MODAL_OPEN_PARAM, "true");

      // create thread and set threadId
      const res = await client.thread.create.post();
      if (!res.data) {
        throw new Error("Failed to create thread");
      }
      params.set(THREAD_ID_PARAM, res.data);
    } else {
      params.delete(CHAT_MODAL_OPEN_PARAM);
      params.delete(THREAD_ID_PARAM);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return { threadId, setThreadId, chatModalOpen, setChatModalOpen };
}

const THREAD_ID_PARAM = "thread";

const CHAT_MODAL_OPEN_PARAM = "chat";

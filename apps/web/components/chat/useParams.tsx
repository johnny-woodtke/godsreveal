"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { usePushUrl } from "@/components/usePushUrl";
import { useUrlFragment } from "@/components/useUrlFragment";
import { getClient } from "@/lib/eden";

export function useParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const urlFragment = useUrlFragment();
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

    push({ pathname, searchParams: params, urlFragment });
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

    push({ pathname, searchParams: params, urlFragment });
  }

  return { threadId, setThreadId, chatModalOpen, setChatModalOpen };
}

const THREAD_ID_PARAM = "thread";

const CHAT_MODAL_OPEN_PARAM = "chat";

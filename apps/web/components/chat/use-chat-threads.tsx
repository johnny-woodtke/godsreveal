"use client";

import { setCookie as _setCookie, getCookie } from "cookies-next/client";
import { addYears } from "date-fns";
import { useEffect, useState } from "react";

export type ChatThread = {
  id: string;
  updatedAt: Date;
  title: string;
};

/**
 * Stores and serves thread IDs and names using browser cookies.
 */
export function useChatThreads() {
  // state for threads
  const [threads, setThreads] = useState<ChatThread[]>([]);

  // load threads from cookie on initial load
  useEffect(() => {
    try {
      // get cookie
      const cookie = getCookie(THREADS_COOKIE_NAME);

      // parse cookie
      const parsed = parseThreads(cookie);

      // set threads if parsed.length > 0
      if (parsed.length) {
        setThreads(parsed);
      }
    } catch (e) {
      console.error("Error loading threads from cookie:", e);
    }
  }, []);

  /**
   * Sets the threads cookie. Should be called after threads state is updated.
   */
  function setCookie(threads: ChatThread[]) {
    _setCookie(THREADS_COOKIE_NAME, JSON.stringify(threads), {
      // set the cookie to expire in one year
      expires: addYears(new Date(), 1),
    });
  }

  /**
   * Upserts a thread to the threads cookie.
   */
  function upsertThread(thread: ChatThread) {
    // check if thread with ID already exists
    const index = threads.findIndex((t) => t.id === thread.id);

    // insert/update thread
    let newThreads = [...threads];
    if (index === -1) {
      // if thread does not exist, add it
      newThreads.push(thread);
    } else {
      // if thread exists, update it
      newThreads[index] = thread;
    }

    // sort threads by updatedAt
    const sorted = newThreads.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    // update threads state and cookie
    setThreads(sorted);
    setCookie(sorted);
  }

  /**
   * Removes a thread from the threads cookie.
   */
  function removeThread(id: string) {
    // remove thread
    const newThreads = threads.filter((t) => t.id !== id);
    // update threads state and cookie
    setThreads(newThreads);
    setCookie(newThreads);
  }

  /**
   * Checks if a thread exists in the threads cookie.
   */
  function hasThread(id: string): boolean {
    return threads.some((t) => t.id === id);
  }

  /**
   * Gets a thread from the threads cookie.
   */
  function getThread(id: string): ChatThread | undefined {
    return threads.find((t) => t.id === id);
  }

  // return threads state and functions
  return {
    threads,
    upsertThread,
    removeThread,
    hasThread,
    getThread,
  };
}

const THREADS_COOKIE_NAME = "godsreveal-threads";

function parseThreads(threads?: string): ChatThread[] {
  // return empty array if no threads
  if (!threads) {
    return [];
  }

  // parse threads
  const parsed = JSON.parse(threads);

  // check if array
  if (!Array.isArray(parsed)) {
    return [];
  }

  // parse out non-thread items and filter out duplicate IDs
  return parsed
    .filter(isThread)
    .filter(
      (thread, index, self) =>
        index === self.findIndex((t) => t.id === thread.id),
    );
}

function isThread(item: unknown): item is ChatThread {
  return (
    // check if item is defined object
    !!item &&
    typeof item === "object" &&
    // check if item.id is defined string
    "id" in item &&
    typeof item.id === "string" &&
    !!item.id &&
    // check if item.title is defined string
    "title" in item &&
    typeof item.title === "string" &&
    !!item.title
  );
}

"use client";

import { getCookie, setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

export type Thread = {
  id: string;
  title: string;
};

/**
 * Stores and serves thread IDs and names using browser cookies.
 */
export function useThreads() {
  // state for threads
  const [threads, setThreads] = useState<Thread[]>([]);

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

  // set cookie on threads updates
  useEffect(() => {
    setCookie(THREADS_COOKIE_NAME, JSON.stringify(threads));
  }, [threads]);

  // add new thread to threads
  function addThread(thread: Thread) {
    // check if thread with ID already exists
    const index = threads.findIndex((t) => t.id === thread.id);

    // if thread does not exist, add it
    if (index === -1) {
      setThreads([...threads, thread]);
      return;
    }

    // if thread exists, update it
    const newThreads = [...threads];
    newThreads[index] = thread;
    setThreads(newThreads);
  }

  // remove thread from threads
  function removeThread(id: string) {
    setThreads(threads.filter((t) => t.id !== id));
  }

  // return threads state and functions
  return {
    threads,
    addThread,
    removeThread,
  };
}

const THREADS_COOKIE_NAME = "godsreveal-threads";

function parseThreads(threads?: string): Thread[] {
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

function isThread(item: unknown): item is Thread {
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

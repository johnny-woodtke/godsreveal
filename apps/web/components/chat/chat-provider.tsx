"use client";

import { useLiveQuery } from "dexie-react-hooks";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import type { RequiredKeys } from "@godsreveal/lib";
import type { Message, Thread } from "@godsreveal/web-idb";

import { useSync } from "@/components/use-sync";
import { getClient } from "@/lib/eden";

import { useChatParams } from "./use-chat-params";

type ChatProps = {
  message: string;
};

type ChatContextType = {
  threadId: string | null;
  setThreadId: (threadId: string | null) => Promise<void>;

  threads: RequiredKeys<Thread, "name">[];
  removeThread: (threadId: string) => void;

  isThreadLoading: boolean;
  setIsThreadLoading: Dispatch<SetStateAction<boolean>>;

  isThreadNaming: boolean;
  setIsThreadNaming: Dispatch<SetStateAction<boolean>>;

  messages: Message[];

  form: UseFormReturn<ChatProps>;

  isUserSubmitting: boolean;
  isAssistantSubmitting: boolean;

  onSubmit: (data: ChatProps) => Promise<void>;
  runThread: (threadId: string) => Promise<void>;

  onSelectThread: (threadId: string | null) => void;
  fetchThreadMessages: (threadId: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | null>(null);

type ChatProviderProps = {
  threads: RequiredKeys<Thread, "name">[];
  children: React.ReactNode;
};

export default function ChatProvider({ threads, children }: ChatProviderProps) {
  // sync
  const { sync, db } = useSync();

  // current thread
  const { threadId, setThreadId, chatModalOpen } = useChatParams();

  // fetching thread messages loading state
  const [isThreadLoading, setIsThreadLoading] = useState(false);

  // messages
  const messages =
    useLiveQuery(() => {
      if (!threadId) {
        return [];
      }
      return db.message.where("threadId").equals(threadId).sortBy("createdAt");
    }, [threadId]) ?? [];

  // message input form state
  const form = useForm<ChatProps>({
    defaultValues: {
      message: "",
    },
  });

  // user submitting message loading state
  const isUserSubmitting = form.formState.isSubmitting;

  // assistant submitting message loading state
  const [isAssistantSubmitting, setIsAssistantSubmitting] = useState(false);

  // thread naming loading state
  const [isThreadNaming, setIsThreadNaming] = useState(false);

  // server client
  const client = getClient();

  /**
   * Removes the inputted thread.
   */
  async function removeThread(inputtedThreadId: string) {
    // remove thread from state
    await db.thread.delete(inputtedThreadId);

    // if threadId is the current thread, unset it
    // and select the latest thread
    if (threadId === inputtedThreadId) {
      const latestThread = threads[0];
      onSelectThread(latestThread?.id ?? null);
    }
  }

  /**
   * Fetches the messages for the inputted thread and sets the messages state.
   */
  async function fetchThreadMessages(threadId: string) {
    // set loading
    setIsThreadLoading(true);

    // fetch messages
    sync
      .fetch(() => client.thread({ threadId }).get())
      .catch((e) => {
        console.error("Failed to fetch thread messages:", e);
        form.setError("message", {
          message: "Failed to fetch latest thread messages",
        });
      });

    // unset loading
    setIsThreadLoading(false);
  }

  /**
   * Sets the current thread. Input `null` to start a new thread.
   */
  function onSelectThread(threadId: string | null) {
    // reset form
    form.reset();

    // set thread if there were messages
    setThreadId(threadId).then(() => {
      // fetch thread messages
      threadId && fetchThreadMessages(threadId);
    });
  }

  /**
   * Sets the name of the inputted thread ID.
   */
  async function setThreadName(threadId: string) {
    try {
      // set loading
      setIsThreadNaming(true);

      // get thread name
      const res = await sync.fetch(() =>
        client.thread({ threadId }).name.get(),
      );

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to set thread name");
      }
    } catch (e) {
      console.error("Failed to set thread name:", e);
    } finally {
      // unset loading
      setIsThreadNaming(false);
    }
  }

  /**
   * Runs the inputted thread to get an assistant response.
   */
  async function runThread(threadId: string) {
    try {
      // set submitting
      setIsAssistantSubmitting(true);

      // run thread
      const res = await sync.fetch(() =>
        client.thread({ threadId }).run.post(),
      );

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to run thread");
      }

      // if thread does not exist, set thread name and updatedAt
      !threads.find((thread) => thread.id === threadId) &&
        setThreadName(threadId);
    } catch (e) {
      console.error(e);
      form.setError("message", { message: "Failed to run thread" });
    } finally {
      // unset submitting
      setIsAssistantSubmitting(false);
    }
  }

  /**
   * Submits a message to the thread.
   */
  async function onSubmit({ message }: ChatProps) {
    try {
      // post message to thread
      const res = await sync.fetch(() =>
        client.thread.message.post({
          message,
          ...(threadId ? { threadId } : {}),
        }),
      );

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to send message");
      }

      // clear form
      form.reset();

      // run post submit
      runThread(res.data.response.threadId);
    } catch (e) {
      console.error(e);
      form.setError("message", { message: "Failed to send message" });
    }
  }

  // handle chat modal open
  useEffect(() => {
    // if closed, return
    if (!chatModalOpen) {
      return;
    }

    // if threadId, fetch messages
    if (threadId) {
      fetchThreadMessages(threadId);
      return;
    }

    // if no threadId, get latest thread
    const latestThread = threads[0];
    onSelectThread(latestThread?.id ?? null);
  }, [chatModalOpen]);

  return (
    <ChatContext.Provider
      value={{
        threadId,
        setThreadId,
        threads,
        removeThread,
        isThreadLoading,
        setIsThreadLoading,
        isThreadNaming,
        setIsThreadNaming,
        messages,
        form,
        isUserSubmitting,
        isAssistantSubmitting,
        onSubmit,
        runThread,
        onSelectThread,
        fetchThreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import { getClient } from "@/lib/eden";

import { Thread, useThreads } from "./useThreads";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatProps = {
  message: string;
};

type ChatContextType = {
  threadId: string | null;
  setThreadId: Dispatch<SetStateAction<string | null>>;

  threads: Thread[];
  addThread: (thread: Thread) => void;
  removeThread: (threadId: string) => void;

  isThreadLoading: boolean;
  setIsThreadLoading: Dispatch<SetStateAction<boolean>>;

  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;

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
  children: React.ReactNode;
};

export default function ChatProvider({ children }: ChatProviderProps) {
  // current thread
  const [threadId, setThreadId] = useState<string | null>(null);

  // other threads
  const { threads, addThread, removeThread } = useThreads();

  // fetching thread messages loading state
  const [isThreadLoading, setIsThreadLoading] = useState(false);

  // messages
  const [messages, setMessages] = useState<Message[]>([]);

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

  // server client
  const client = getClient();

  /**
   * Fetches the messages for the inputted thread and sets the messages state.
   */
  async function fetchThreadMessages(threadId: string) {
    try {
      // set loading
      setIsThreadLoading(true);

      // fetch messages
      const res = await client.thread({ threadId }).get();

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to fetch thread messages");
      }

      // set messages
      setMessages(res.data);
    } catch (e) {
      console.error("Failed to fetch thread messages:", e);
      form.setError("message", {
        message: "Failed to fetch thread messages",
      });
    } finally {
      setIsThreadLoading(false);
    }
  }

  /**
   * Sets the current thread. Input `null` to start a new thread.
   */
  function onSelectThread(threadId: string | null) {
    // unset messages
    setMessages([]);

    // set thread
    setThreadId(threadId);

    // reset form
    form.reset();

    // fetch thread messages
    threadId && fetchThreadMessages(threadId);
  }

  /**
   * Runs the inputted thread to get an assistant response.
   */
  async function runThread(threadId: string) {
    try {
      // set submitting
      setIsAssistantSubmitting(true);

      // run thread
      const res = await client.thread({ threadId }).run.post();

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to run thread");
      }

      // set messages
      setMessages(res.data);
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
  async function onSubmit(data: ChatProps) {
    try {
      // post message to thread
      const res = await client.thread.message.post({
        message: data.message,
        ...(threadId ? { threadId } : {}),
      });

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to send message");
      }

      // set messages
      setMessages(res.data.messages);

      // add thread to threads
      if (!threadId) {
        addThread({
          id: res.data.threadId,
          title: `Thread: ${res.data.threadId}`,
        });
      }

      // set thread
      setThreadId(res.data.threadId);

      // clear form
      form.reset();

      // run post submit
      runThread(res.data.threadId);
    } catch (e) {
      console.error(e);
      form.setError("message", { message: "Failed to send message" });
    }
  }

  return (
    <ChatContext.Provider
      value={{
        threadId,
        setThreadId,
        threads,
        addThread,
        removeThread,
        isThreadLoading,
        setIsThreadLoading,
        messages,
        setMessages,
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

"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import { getClient } from "@/lib/eden";

import { useParams } from "./useParams";
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
  setThreadId: (threadId: string | null) => Promise<void>;

  threads: Thread[];
  addThread: (thread: Thread) => void;
  removeThread: (threadId: string) => void;

  isThreadLoading: boolean;
  setIsThreadLoading: Dispatch<SetStateAction<boolean>>;

  isThreadNaming: boolean;
  setIsThreadNaming: Dispatch<SetStateAction<boolean>>;

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
  const { threadId, setThreadId, chatModalOpen } = useParams();

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

  // thread naming loading state
  const [isThreadNaming, setIsThreadNaming] = useState(false);

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

  // fetch thread messages on chat modal open and threadId change
  useEffect(() => {
    chatModalOpen && threadId && fetchThreadMessages(threadId);
  }, [chatModalOpen]);

  /**
   * Sets the current thread. Input `null` to start a new thread.
   */
  function onSelectThread(threadId: string | null) {
    // unset messages
    setMessages([]);

    // reset form
    form.reset();

    // set thread
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
      // check if thread already exists
      if (threads.find((t) => t.id === threadId)) {
        return;
      }

      // set loading
      setIsThreadNaming(true);

      // get thread name
      const res = await client.thread({ threadId }).name.get();

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to set thread name");
      }

      // add thread to threads
      addThread({
        id: threadId,
        title: res.data,
      });
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
      const res = await client.thread({ threadId }).run.post();

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to run thread");
      }

      // set messages
      setMessages(res.data);

      // add thread to threads and set thread name
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
      const res = await client.thread.message.post({
        message,
        ...(threadId ? { threadId } : {}),
      });

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to send message");
      }

      // set messages
      setMessages(res.data.messages);

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
        isThreadNaming,
        setIsThreadNaming,
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

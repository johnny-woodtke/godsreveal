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

import { useSync } from "@/components/use-sync";
import { getClient } from "@/lib/eden";

import { useChatParams } from "./use-chat-params";
import { ChatThread, useChatThreads } from "./use-chat-threads";

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

  threads: ChatThread[];
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
  // sync
  const sync = useSync();

  // current thread
  const { threadId, setThreadId, chatModalOpen } = useChatParams();

  // other threads
  const {
    upsertThread,
    hasThread,
    getThread,
    threads,
    removeThread: _removeThread,
  } = useChatThreads();

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
   * Removes the inputted thread.
   */
  function removeThread(inputtedThreadId: string) {
    // remove thread from cookies/state
    _removeThread(inputtedThreadId);

    // if threadId is the current thread, unset it
    if (threadId === inputtedThreadId) {
      onSelectThread(null);
    }
  }

  /**
   * Fetches the messages for the inputted thread and sets the messages state.
   */
  async function fetchThreadMessages(threadId: string) {
    try {
      // set loading
      setIsThreadLoading(true);

      // fetch messages
      const res = await sync.fetch(() => client.thread({ threadId }).get());

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to fetch thread messages");
      }

      // set messages
      setMessages(res.data.response);
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
    // unset messages if there were any
    setMessages([]);

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

      // add thread to threads
      upsertThread({
        id: threadId,
        title: res.data.response,
        updatedAt: new Date(),
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
      const res = await sync.fetch(() =>
        client.thread({ threadId }).run.post(),
      );

      // if no data, throw error
      if (!res.data) {
        throw new Error("Failed to run thread");
      }

      // set messages
      setMessages(res.data.response);

      // if thread does not exist, set thread name and updatedAt
      !hasThread(threadId) && setThreadName(threadId);
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

      // set messages
      setMessages(res.data.response.messages);

      // clear form
      form.reset();

      // update thread updatedAt if thread exists
      const thread = getThread(res.data.response.threadId);
      thread && upsertThread({ ...thread, updatedAt: new Date() });

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

    // if no threadId, create thread
    onSelectThread(null);
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

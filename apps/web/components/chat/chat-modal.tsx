"use client";

import {
  BotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  PlusIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

import { cn } from "@godsreveal/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@godsreveal/ui";

import { Thread, useThreads } from "@/components/chat/useThreads";
import { getClient } from "@/lib/eden";

type ChatProps = {
  message: string;
};

export default function ChatModal() {
  // modal open or closed
  const [isOpen, setIsOpen] = useState(false);

  // current thread
  const [threadId, setThreadId] = useState<string | null>(null);

  // other threads
  const { addThread } = useThreads();

  // small screen thread list open or closed
  const [isThreadListOpen, setIsThreadListOpen] = useState(false);

  // fetching thread messages loading state
  const [isThreadLoading, setIsThreadLoading] = useState(false);

  // messages
  const [messages, setMessages] = useState<
    {
      id: string;
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  // message input form
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          className="group relative h-10 w-10 transition-all duration-300 hover:w-[160px]"
        >
          <BotIcon className="absolute left-2.5 size-5" />
          <span className="ml-7 hidden opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
            Ask EschatoloGPT
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "h-full max-h-full w-full max-w-full overflow-hidden sm:max-h-[90vh] sm:max-w-screen-xl",
          "focus:outline-none focus-visible:ring-0",
        )}
      >
        <div className="flex h-full flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BotIcon className="size-5" />
              Ask EschatoloGPT
            </DialogTitle>
          </DialogHeader>

          <div className="flex h-full border-t sm:flex-row">
            {/* large screenthread list */}
            <div className="h-full max-sm:hidden sm:w-1/4">
              <ThreadList
                currentThreadId={threadId}
                onSelectThread={onSelectThread}
              />
            </div>

            {/* small screen thread list */}
            <div className="relative h-full w-full sm:hidden">
              <div
                className={cn(
                  "absolute z-50 transition-transform duration-300",
                  isThreadListOpen ? "translate-x-0" : "-translate-x-full",
                )}
              >
                <div className="flex h-full w-full">
                  <ThreadList
                    currentThreadId={threadId}
                    onSelectThread={onSelectThread}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="mt-2 h-10 w-6"
                    onClick={() => setIsThreadListOpen(!isThreadListOpen)}
                  >
                    {isThreadListOpen ? (
                      <ChevronLeftIcon className="size-4" />
                    ) : (
                      <ChevronRightIcon className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* chat messages */}
            <div className="h-full w-full sm:w-3/4">
              <div className="flex h-full flex-col">
                <div className="relative flex-1">
                  <div className="absolute inset-0 space-y-4 overflow-y-auto scroll-smooth px-4 py-6">
                    {isThreadLoading ? (
                      <div className="flex h-32 items-center justify-center">
                        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === "assistant"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <article
                            className={cn(
                              "relative max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
                              message.role === "assistant"
                                ? "prose dark:prose-invert max-w-none bg-secondary/80 text-secondary-foreground"
                                : "bg-primary text-primary-foreground",
                              message.role === "assistant"
                                ? "rounded-bl-none"
                                : "rounded-br-none",
                            )}
                          >
                            {message.role === "assistant" ? (
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            ) : (
                              message.content
                            )}
                          </article>
                        </div>
                      ))
                    )}
                    {isAssistantSubmitting && (
                      <div className="flex justify-start">
                        <div className="relative flex max-w-[80%] items-center gap-2 rounded-2xl rounded-bl-none bg-secondary/80 px-4 py-2.5 shadow-sm">
                          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <form
                  className="flex flex-col gap-2 border-t bg-background p-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex w-full items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Message EschatoloGPT..."
                      className="rounded-full bg-secondary/50 transition-all duration-200 focus-visible:ring-primary"
                      {...form.register("message", {
                        disabled:
                          isUserSubmitting ||
                          isAssistantSubmitting ||
                          isThreadLoading,
                      })}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="shrink-0 rounded-full"
                      disabled={
                        isUserSubmitting ||
                        isAssistantSubmitting ||
                        isThreadLoading
                      }
                    >
                      {isUserSubmitting ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <SendIcon className="size-4" />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.message && (
                    <span className="text-sm text-destructive">
                      {form.formState.errors.message.message}
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ThreadListProps = {
  currentThreadId: string | null;
  onSelectThread: (threadId: string | null) => void;
};

function ThreadList({ currentThreadId, onSelectThread }: ThreadListProps) {
  // threads
  const { threads, removeThread } = useThreads();

  return (
    <div className="flex h-full flex-col border-r p-3">
      <div className="mb-3 flex items-center justify-between border-b p-3">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Conversations</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            onSelectThread(null);
          }}
        >
          <PlusIcon className="size-4" />
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1.5">
          {threads.map((thread) => (
            <li
              key={thread.id}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-secondary/80",
                "flex items-center justify-between text-sm font-medium",
                currentThreadId === thread.id
                  ? "bg-secondary text-secondary-foreground"
                  : "text-foreground/80",
              )}
            >
              <span onClick={() => onSelectThread(thread.id)}>
                {thread.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  removeThread(thread.id);
                  if (currentThreadId === thread.id) {
                    onSelectThread(null);
                  }
                }}
              >
                <TrashIcon className="size-4" />
              </Button>
            </li>
          ))}
          {threads.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              No conversations yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

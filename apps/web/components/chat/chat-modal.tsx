"use client";

import { BotIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  const [isOpen, setIsOpen] = useState(false);

  const { threads, addThread } = useThreads();
  const [threadId, setThreadId] = useState<string | null>(null);

  const [isThreadLoading, setIsThreadLoading] = useState(false);

  // add thread to threads when threadId updates
  useEffect(() => {
    if (threadId) {
      addThread({
        id: threadId,
        title: `Thread: ${threadId}`,
      });
    }
  }, [threadId]);

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

  function onSelectThread(threadId: string) {
    // unset messages
    setMessages([]);

    // set thread
    setThreadId(threadId);

    // reset form
    form.reset();

    // fetch thread messages
    fetchThreadMessages(threadId);
  }

  const [messages, setMessages] = useState<
    {
      id: string;
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  const form = useForm<ChatProps>({
    defaultValues: {
      message: "",
    },
  });

  const isUserSubmitting = form.formState.isSubmitting;
  const [isAssistantSubmitting, setIsAssistantSubmitting] = useState(false);

  const client = getClient();

  async function runThread(threadId: string) {
    try {
      // set submitting
      setIsAssistantSubmitting(true);

      // run thread
      const res = await client.thread.run.post({
        threadId,
      });

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
      setIsAssistantSubmitting(false);
    }
  }

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

      // set thread
      setThreadId(res.data.threadId);

      // run post submit
      runThread(res.data.threadId);

      // clear form
      form.reset();
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
          className="group transition-all duration-200 hover:w-[160px]"
        >
          <span className="hidden group-hover:block">Ask EschatoloGPT</span>
          <BotIcon className="size-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-full w-full max-w-full sm:max-h-[90vh] sm:max-w-screen-xl">
        <div className="flex h-full flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Ask EschatoloGPT</DialogTitle>
          </DialogHeader>

          <div className="flex h-full flex-row border-t">
            <div className="w-1/4 border-r">
              <ThreadList
                currentThreadId={threadId}
                threads={threads}
                onSelectThread={onSelectThread}
              />
            </div>

            <div className="w-3/4">
              <div className="flex h-full flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "assistant"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant"
                            ? "bg-secondary"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  className="flex flex-col gap-2 border-t p-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex w-full items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Type your message..."
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
                      disabled={
                        isUserSubmitting ||
                        isAssistantSubmitting ||
                        isThreadLoading
                      }
                    >
                      <SendIcon className="size-4" />
                    </Button>
                  </div>
                  {form.formState.errors.message && (
                    <span className="text-sm text-red-500">
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
  threads: Thread[];
  onSelectThread: (threadId: string) => void;
};

function ThreadList({
  currentThreadId,
  threads,
  onSelectThread,
}: ThreadListProps) {
  return (
    <ul className="space-y-2">
      {threads.map((thread) => (
        <li
          key={thread.id}
          onClick={() => onSelectThread(thread.id)}
          className={cn(
            "cursor-pointer rounded-md p-2",
            currentThreadId === thread.id && "bg-secondary",
          )}
        >
          {thread.title}
        </li>
      ))}
    </ul>
  );
}

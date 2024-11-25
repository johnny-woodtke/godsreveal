"use client";

import { BotIcon, SendIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
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

import { getClient } from "@/lib/eden";

type FormProps = {
  message: string;
};

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [otherThreads, setOtherThreads] = useState<
    {
      threadId: string;
      title: string;
    }[]
  >([]);

  const client = getClient();

  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    {
      id: string;
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  const form = useForm<FormProps>();

  async function onSubmit(data: FormProps) {
    // send message to openai
    const res = await client.chat.index.post({
      message: data.message,
      ...(threadId ? { threadId } : {}),
    });

    // if error, set error
    if (res.error) {
      console.error(res.error);
      form.setError("message", { message: res.error.value });
      return;
    }

    // set messages
    setMessages(res.data.messages);

    // set thread id
    setThreadId(res.data.threadId);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask EschatoloGPT</DialogTitle>
        </DialogHeader>

        <div className="flex flex-row border-t">
          <div className="w-1/4 border-r">
            <ThreadList
              currentThreadId={threadId}
              threads={otherThreads}
              setThreadId={setThreadId}
            />
          </div>

          <div className="w-3/4">
            <div className="flex h-[500px] flex-col">
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
                className="flex items-center gap-2 border-t p-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  placeholder="Type your message..."
                  {...form.register("message")}
                />
                <Button type="submit" size="icon">
                  <SendIcon className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ThreadListProps = {
  currentThreadId: string | null;
  threads: {
    threadId: string;
    title: string;
  }[];
  setThreadId: Dispatch<SetStateAction<string | null>>;
};

function ThreadList({
  currentThreadId,
  threads,
  setThreadId,
}: ThreadListProps) {
  return (
    <ul className="space-y-2">
      {threads.map((thread) => (
        <li
          key={thread.threadId}
          onClick={() => setThreadId(thread.threadId)}
          className={cn(
            "cursor-pointer rounded-md p-2",
            currentThreadId === thread.threadId && "bg-secondary",
          )}
        >
          {thread.title}
        </li>
      ))}
    </ul>
  );
}

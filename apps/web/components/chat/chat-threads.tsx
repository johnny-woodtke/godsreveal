import { MessageCircleIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@godsreveal/lib";
import { Button } from "@godsreveal/ui";

import { useChat } from "./chat-provider";

type ChatThreadsProps = {
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChatThreads({ setIsThreadListOpen }: ChatThreadsProps) {
  const { threads, removeThread, onSelectThread, threadId } = useChat();

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex items-center gap-2 border-b p-3">
        <MessageCircleIcon className="size-5" />
        <h2 className="font-semibold">Previous Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {threads.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No conversations yet
          </p>
        ) : (
          <div className="space-y-2">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={cn(
                  "group flex items-center justify-between rounded-lg p-2",
                  "hover:bg-muted/50",
                  threadId === thread.id && "bg-muted",
                )}
              >
                <button
                  className="flex-1 truncate text-left text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectThread(thread.id);
                    setIsThreadListOpen(false);
                  }}
                >
                  {thread.title}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-8",
                    // small screen classes
                    "max-sm:opacity-100",
                    // large screen classes
                    "opacity-0 group-hover:opacity-100",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeThread(thread.id);
                  }}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

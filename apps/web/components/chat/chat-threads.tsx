import {
  endOfWeek,
  format,
  isThisWeek,
  isToday,
  isYesterday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { Loader2Icon, MessageCircleIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@godsreveal/lib";
import { Button } from "@godsreveal/ui";

import { useChat } from "./chat-provider";
import { ChatThread } from "./use-chat-threads";

type ChatThreadsProps = {
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChatThreads({ setIsThreadListOpen }: ChatThreadsProps) {
  const { onSelectThread, threadId, isThreadNaming, threads, removeThread } =
    useChat();

  const threadGroups = groupThreadsByDate(threads);
  const hasTodayThreads = threadGroups.some((group) => group.label === "Today");

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex items-center gap-2 border-b p-3">
        <MessageCircleIcon className="size-5" />
        <h2 className="font-semibold">Previous Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {!hasTodayThreads && isThreadNaming && (
          <div className="flex w-full items-center justify-center py-2">
            <Loader2Icon className="size-5 animate-spin" />
          </div>
        )}

        {threads.length === 0 && !isThreadNaming ? (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No conversations yet
          </p>
        ) : (
          <div className="space-y-4">
            {threadGroups.map((group) => (
              <div key={group.label} className="space-y-2">
                <h3 className="mr-2 border-b px-2 pb-2 text-sm font-medium text-muted-foreground">
                  {group.label}
                </h3>

                <div className="space-y-1">
                  {group.label === "Today" && isThreadNaming && (
                    <div className="flex w-full items-center justify-center pt-1">
                      <Loader2Icon className="size-5 animate-spin" />
                    </div>
                  )}
                  {group.threads.map((thread) => (
                    <ThreadItem
                      key={thread.id}
                      thread={thread}
                      threadId={threadId}
                      onSelectThread={onSelectThread}
                      setIsThreadListOpen={setIsThreadListOpen}
                      removeThread={removeThread}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function isLastWeek(date: Date): boolean {
  const lastWeekStart = startOfWeek(subWeeks(new Date(), 1));
  const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1));
  return date >= lastWeekStart && date <= lastWeekEnd;
}

type ThreadGroup = {
  label: "Today" | "Yesterday" | "This Week" | "Last Week" | string;
  threads: ChatThread[];
};

function groupThreadsByDate(threads: ChatThread[]) {
  const groups: ThreadGroup[] = [];

  // Helper function to add threads to a group
  const addToGroup = (label: string, threadsToAdd: ChatThread[]) => {
    if (threadsToAdd.length > 0) {
      groups.push({ label, threads: threadsToAdd });
    }
  };

  // Sort threads into different time periods
  const today = threads.filter((thread) => isToday(thread.updatedAt));
  const yesterday = threads.filter((thread) => isYesterday(thread.updatedAt));
  const thisWeek = threads.filter(
    (thread) =>
      isThisWeek(thread.updatedAt) &&
      !isToday(thread.updatedAt) &&
      !isYesterday(thread.updatedAt),
  );
  const lastWeek = threads.filter(
    (thread) => isLastWeek(thread.updatedAt) && !isThisWeek(thread.updatedAt),
  );

  // Remaining threads grouped by month and year
  const older = threads.filter(
    (thread) =>
      !isToday(thread.updatedAt) &&
      !isYesterday(thread.updatedAt) &&
      !isThisWeek(thread.updatedAt) &&
      !isLastWeek(thread.updatedAt),
  );

  // Add groups in chronological order
  addToGroup("Today", today);
  addToGroup("Yesterday", yesterday);
  addToGroup("This Week", thisWeek);
  addToGroup("Last Week", lastWeek);

  // Group remaining threads by month and year
  const monthGroups = older.reduce(
    (acc, thread) => {
      const date = thread.updatedAt;
      const monthYear = format(date, "MMMM yyyy");
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(thread);
      return acc;
    },
    {} as Record<string, typeof threads>,
  );

  // Add month groups
  Object.entries(monthGroups).forEach(([label, threads]) => {
    addToGroup(label, threads);
  });

  return groups;
}

type ThreadItemProps = {
  thread: ChatThread;
  threadId: string | null;
  onSelectThread: (threadId: string | null) => void;
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
  removeThread: (threadId: string) => void;
};

function ThreadItem({
  thread,
  threadId,
  onSelectThread,
  setIsThreadListOpen,
  removeThread,
}: ThreadItemProps) {
  return (
    <div
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
        asChild
        variant="ghost"
        size="icon"
        className={cn(
          "size-8 cursor-pointer",
          "max-sm:opacity-100",
          "opacity-0 group-hover:opacity-100",
        )}
        onClick={(e) => {
          e.stopPropagation();
          removeThread(thread.id);
        }}
      >
        <Trash2Icon className="p-2" />
      </Button>
    </div>
  );
}

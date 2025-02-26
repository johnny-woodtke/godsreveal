import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@godsreveal/lib";

import { useChat } from "./chat-provider";

export default function ChatMessages() {
  const {
    messages,
    threadId,
    isThreadLoading,
    isAssistantSubmitting,
    lastMessageRef,
  } = useChat();

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Loading state for thread messages */}
      {(isThreadLoading || !threadId) && (
        <div className="flex justify-center p-4">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Messages */}
      {messages.map((message, i) => (
        <div
          key={message.id}
          className={cn(
            "flex w-full",
            message.role === "assistant" && "justify-start",
            message.role === "user" && "justify-end",
          )}
          ref={i === messages.length - 1 ? lastMessageRef : undefined}
        >
          <div
            className={cn(
              "rounded-lg px-4 py-2",
              // small screen classes
              "max-sm:max-w-[90%]",
              // large screen classes
              "sm:max-w-[80%]",
              // assistant message classes
              message.role === "assistant" &&
                "prose bg-muted dark:prose-invert max-sm:prose-sm",
              // user message classes
              message.role === "user" && "bg-primary text-primary-foreground",
            )}
          >
            {message.role === "assistant" ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              <>{message.content}</>
            )}
          </div>
        </div>
      ))}

      {/* Loading state for assistant response */}
      {isAssistantSubmitting && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2 rounded-lg bg-muted px-4 py-2">
            <Loader2 className="size-4 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

import { Loader2 } from "lucide-react";

import { cn } from "@godsreveal/lib";

import { useChat } from "./chat-provider";

export default function ChatMessages() {
  const { messages, isThreadLoading, isAssistantSubmitting } = useChat();

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Loading state for thread messages */}
      {isThreadLoading && (
        <div className="flex justify-center p-4">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex w-full",
            message.role === "user" && "justify-end",
            message.role === "assistant" && "justify-start",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              message.role === "user" && "bg-primary text-primary-foreground",
              message.role === "assistant" && "bg-muted",
            )}
          >
            {message.content}
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

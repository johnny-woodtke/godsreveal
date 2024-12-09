"use client";

import { BotIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@godsreveal/lib";
import { Button, Dialog, DialogContent, DialogTrigger } from "@godsreveal/ui";

import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import ChatProvider from "./chat-provider";
import ChatThreads from "./chat-threads";
import { useChatParams } from "./use-chat-params";

export default function ChatModal() {
  // modal open or closed
  const { chatModalOpen, setChatModalOpen } = useChatParams();

  // thread list open or closed
  const [isThreadListOpen, setIsThreadListOpen] = useState(false);

  return (
    <Dialog open={chatModalOpen} onOpenChange={setChatModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={cn(
            "animate-slow-pulse group relative size-12 rounded-full bg-primary/90",
            "shadow-lg shadow-primary/20 transition-all duration-300 hover:w-[180px]",
            "hover:scale-105 hover:animate-none hover:shadow-xl hover:shadow-primary/30",
            "active:scale-95 active:shadow-md",
          )}
        >
          <BotIcon
            className={cn(
              "absolute left-1/2 !size-5 -translate-x-1/2 transition-all duration-300",
              "group-hover:left-3 group-hover:translate-x-0 group-hover:animate-bounce",
            )}
          />
          <span className="ml-8 hidden opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100">
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
        <ChatProvider>
          <div className="flex h-full w-full flex-col overflow-hidden pt-2">
            {/* header */}
            <ChatHeader setIsThreadListOpen={setIsThreadListOpen} />

            <div className="relative flex h-full w-full overflow-hidden">
              {/* thread list */}
              <div
                className={cn(
                  "h-full",
                  // small screen classes
                  "max-sm:absolute max-sm:inset-0 max-sm:z-10 max-sm:w-full",
                  "max-sm:transition-transform max-sm:duration-300",
                  isThreadListOpen
                    ? "max-sm:translate-x-0"
                    : "max-sm:-translate-x-full",
                  // large screen classes
                  "sm:w-1/4 sm:border-r",
                )}
              >
                <ChatThreads setIsThreadListOpen={setIsThreadListOpen} />
              </div>

              {/* messages and input */}
              <div
                className={cn(
                  "flex h-full flex-col",
                  // small screen classes
                  "w-full",
                  // large screen classes
                  "sm:w-3/4",
                )}
              >
                <div className="flex-1 overflow-y-auto">
                  <ChatMessages />
                </div>
                <ChatInput isThreadListOpen={isThreadListOpen} />
              </div>
            </div>
          </div>
        </ChatProvider>
      </DialogContent>
    </Dialog>
  );
}

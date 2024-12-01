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

export default function ChatModal() {
  // modal open or closed
  const [isOpen, setIsOpen] = useState(false);

  // thread list open or closed
  const [isThreadListOpen, setIsThreadListOpen] = useState(false);

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
        <ChatProvider>
          <div className="flex h-full w-full flex-col overflow-hidden pt-2">
            {/* header */}
            <ChatHeader setIsThreadListOpen={setIsThreadListOpen} />

            <div className="relative flex h-full w-full">
              {/* thread list */}
              <div
                className={cn(
                  "h-full",
                  // small screen classes
                  "w-full",
                  // large screen classes
                  "sm:w-1/4 sm:border-r",
                )}
              >
                <ChatThreads isThreadListOpen={isThreadListOpen} />
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

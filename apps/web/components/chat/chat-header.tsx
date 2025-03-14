"use client";

import * as Sentry from "@sentry/nextjs";
import { BotIcon, MenuIcon, ShareIcon, SquarePenIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@godsreveal/lib";
import { Button, DialogHeader, DialogTitle, useToast } from "@godsreveal/ui";

import { useChat } from "./chat-provider";

type ChatHeaderProps = {
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChatHeader({ setIsThreadListOpen }: ChatHeaderProps) {
  const { onSelectThread } = useChat();
  const { toast } = useToast();

  function handleShare() {
    navigator?.clipboard?.writeText(window.location.href).catch((e) => {
      Sentry.captureException(e, {
        tags: {
          component: "ChatHeader",
          action: "handleShare",
        },
      });
    });
    toast({
      title: "Link copied",
      description: "The chat link has been copied to your clipboard.",
    });
  }

  return (
    <DialogHeader>
      <div
        className={cn(
          "relative flex items-center border-b px-1 pb-1",
          // small screen classes
          "max-sm:justify-between",
          // large screen classes
          "sm:justify-end sm:px-3",
        )}
      >
        <Button
          className="size-9 sm:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsThreadListOpen((open) => !open)}
        >
          <MenuIcon className="!size-5" />
        </Button>

        <DialogTitle className="absolute z-[-10] flex w-full items-center justify-center gap-2">
          <BotIcon className="size-5" />
          EschatoloGPT
        </DialogTitle>

        <div className="flex gap-1">
          <Button
            className="size-9"
            variant="ghost"
            size="icon"
            onClick={handleShare}
          >
            <ShareIcon className="!size-5" />
          </Button>

          <Button
            className="size-9"
            variant="ghost"
            size="icon"
            onClick={() => {
              onSelectThread(null);
              setIsThreadListOpen(false);
            }}
          >
            <SquarePenIcon className="!size-5" />
          </Button>
        </div>
      </div>
    </DialogHeader>
  );
}

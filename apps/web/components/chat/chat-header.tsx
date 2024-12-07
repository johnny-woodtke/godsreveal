import { BotIcon, SquarePenIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@godsreveal/lib";
import { Button, DialogHeader, DialogTitle } from "@godsreveal/ui";

import { useChat } from "./chat-provider";

type ChatHeaderProps = {
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChatHeader({ setIsThreadListOpen }: ChatHeaderProps) {
  const { onSelectThread } = useChat();

  return (
    <DialogHeader>
      <DialogTitle
        className={cn(
          "flex items-center justify-between border-b px-1 pb-1",
          // large screen classes
          "sm:px-3",
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

        <span className="flex flex-1 items-center justify-center gap-2">
          <BotIcon className="size-5" />
          EschatoloGPT
        </span>

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
      </DialogTitle>
    </DialogHeader>
  );
}

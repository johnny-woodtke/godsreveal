import { BotIcon, SquarePenIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button, DialogHeader, DialogTitle } from "@godsreveal/ui";

import { useChat } from "./chat-provider";

type ChatHeaderProps = {
  setIsThreadListOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChatHeader({ setIsThreadListOpen }: ChatHeaderProps) {
  const { onSelectThread } = useChat();

  return (
    <DialogHeader>
      <DialogTitle className="flex justify-between border-b pb-1">
        <Button
          className="sm:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsThreadListOpen((open) => !open)}
        >
          <MenuIcon className="size-4" />
        </Button>
        <span className="flex items-center gap-2">
          <BotIcon className="size-5" />
          EschatoloGPT
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSelectThread(null)}
        >
          <SquarePenIcon className="size-4" />
        </Button>
      </DialogTitle>
    </DialogHeader>
  );
}

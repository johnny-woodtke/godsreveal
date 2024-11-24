import { BotIcon } from "lucide-react";

import { Button } from "@godsreveal/ui";

export default function ChatButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="group transition-all duration-200 hover:w-[160px]"
    >
      <span className="hidden group-hover:block">Ask EschatoloGPT</span>
      <BotIcon className="size-full" />
    </Button>
  );
}

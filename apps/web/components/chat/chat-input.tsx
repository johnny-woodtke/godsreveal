import { SendIcon } from "lucide-react";

import { cn } from "@godsreveal/lib";
import { Button, Input } from "@godsreveal/ui";

import { useChat } from "./chat-provider";

type ChatInputProps = {
  isThreadListOpen: boolean;
};

export default function ChatInput({ isThreadListOpen }: ChatInputProps) {
  const {
    form,
    onSubmit,
    isUserSubmitting,
    isAssistantSubmitting,
    isThreadLoading,
  } = useChat();

  const isLoading =
    isUserSubmitting || isAssistantSubmitting || isThreadLoading;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        "flex w-full items-center gap-2 border-t",
        // small screen classes
        "max-sm:px-1 max-sm:pt-4",
        // large screen classes
        "sm:p-4",
      )}
    >
      <Input
        className="w-full"
        placeholder="Your message..."
        {...form.register("message", {
          required: true,
          disabled: isLoading || isThreadListOpen,
        })}
      />
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        disabled={!form.formState.isValid || isLoading || isThreadListOpen}
      >
        <SendIcon className="size-4" />
      </Button>
    </form>
  );
}

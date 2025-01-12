import { SendIcon } from "lucide-react";

import { cn } from "@godsreveal/lib";
import { Button, Textarea } from "@godsreveal/ui";

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
    threadId,
  } = useChat();

  const isLoading =
    isUserSubmitting || isAssistantSubmitting || isThreadLoading;

  function submitForm() {
    form.handleSubmit(onSubmit)();
  }

  return (
    <form
      onSubmit={submitForm}
      className={cn(
        "flex w-full items-center gap-2 border-t",
        "max-sm:px-1 max-sm:pt-4",
        "sm:p-4",
      )}
    >
      <div className="mb-2 flex w-full flex-col gap-2">
        <div className="flex w-full items-start gap-2">
          <Textarea
            className="resize-none overflow-hidden"
            placeholder="Your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitForm();
              }
            }}
            {...form.register("message", {
              required: true,
              disabled: isLoading || isThreadListOpen || !threadId,
            })}
          />
          <Button
            type="submit"
            size="icon"
            className="size-10"
            variant="secondary"
            disabled={
              !form.formState.isValid ||
              isLoading ||
              isThreadListOpen ||
              !threadId
            }
          >
            <SendIcon className="size-4" />
          </Button>
        </div>
        <p
          className={cn(
            "text-sm text-destructive",
            !form.formState.errors.message?.message && "hidden",
          )}
        >
          {form.formState.errors.message?.message}
        </p>
      </div>
    </form>
  );
}

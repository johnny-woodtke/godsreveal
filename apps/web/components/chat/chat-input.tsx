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

  return (
    <form
      onSubmit={(e) => {
        // Prevent default form submission
        e.preventDefault();

        // Reset the textarea rows back to 1 on form submission
        const textArea = e.currentTarget.querySelector("textarea");
        if (textArea) {
          textArea.rows = 1;
        }

        // Submit the form
        return form.handleSubmit(onSubmit)(e);
      }}
      className={cn(
        "flex w-full items-center gap-2 border-t",
        // small screen classes
        "max-sm:px-1 max-sm:pt-4",
        // large screen classes
        "sm:p-4",
      )}
    >
      <div className="mb-2 flex w-full flex-col gap-2">
        <div className="flex w-full items-end gap-2">
          <Textarea
            className="min-h-0 w-full resize-none"
            placeholder="Your message..."
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              // Reset to minimum rows
              target.rows = 1;
              // Increase rows while scrollHeight is larger than offsetHeight
              while (target.scrollHeight > target.offsetHeight) {
                target.rows += 1;
              }
            }}
            onKeyDown={(e) => {
              // Submit on Enter if Shift is not pressed
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // Only submit if not disabled
                if (
                  form.formState.isValid &&
                  !isLoading &&
                  !isThreadListOpen &&
                  threadId
                ) {
                  form.handleSubmit(onSubmit)();
                }
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

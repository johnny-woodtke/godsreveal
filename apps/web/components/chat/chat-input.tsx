"use client";

import { SendIcon } from "lucide-react";
import { BaseSyntheticEvent, useRef } from "react";

import { cn } from "@godsreveal/lib";
import { Button, Textarea, useAutosizeTextArea } from "@godsreveal/ui";

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

  const submitDisabled =
    !form.formState.isValid || isLoading || isThreadListOpen || !threadId;

  function submitForm(e: BaseSyntheticEvent) {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { ref, ...textAreaRegister } = form.register("message", {
    required: true,
    disabled: isLoading || isThreadListOpen || !threadId,
  });

  const textAreaValue = form.watch("message");
  useAutosizeTextArea({
    textAreaRef: textAreaRef.current,
    value: textAreaValue,
    maxHeightPx: 100,
  });

  return (
    <form
      onSubmit={submitForm}
      className={cn(
        "flex w-full items-center gap-2 border-t",
        "max-sm:px-1 max-sm:pt-4",
        "sm:p-4",
      )}
    >
      <div className="flex w-full flex-col gap-2 max-sm:mb-[1px]">
        <div className="flex w-full items-end gap-2">
          <Textarea
            className="resize-none overflow-y-scroll py-2"
            placeholder="Your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!submitDisabled) {
                  submitForm(e);
                }
              }
            }}
            rows={1}
            {...textAreaRegister}
            ref={(el) => {
              ref(el);
              // @ts-expect-error - current is readonly
              // https://www.react-hook-form.com/faqs/#Howtosharerefusage
              textAreaRef.current = el;
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="size-9"
            variant="secondary"
            disabled={submitDisabled}
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

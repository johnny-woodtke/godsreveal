"use client";

import { useEffect } from "react";

type UseAutosizeTextAreaProps = {
  textAreaRef: HTMLTextAreaElement | null;
  value: string;
  maxHeightPx?: number;
};

// Updates the height of a <textarea> when the value changes.
export function useAutosizeTextArea({
  textAreaRef,
  value,
  maxHeightPx,
}: UseAutosizeTextAreaProps) {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height =
        maxHeightPx && scrollHeight > maxHeightPx
          ? maxHeightPx + "px"
          : scrollHeight + "px";
    }
  }, [textAreaRef, value]);
}

"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { useUrlFragment } from "@/components/use-url-fragment";

/**
 * Clicking this button will randomly select a study and redirect to it.
 */
export default function Remix() {
  function handleClick() {
    console.log("Remix coming soon...");
  }

  return (
    <Image
      src="/favicon-192x192.png"
      alt="God's Reveal"
      width={100}
      height={100}
      className="size-9 cursor-pointer rounded-lg sm:size-9"
      onClick={handleClick}
    />
  );
}

function getRandomStudy() {}

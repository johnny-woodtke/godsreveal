"use client";

import Image from "next/image";

import { cn } from "@godsreveal/lib";

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
      className={cn(
        "size-9 cursor-pointer rounded-md",
        "hover:animate-pulse transition-all duration-300",
        "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        "dark:shadow-[0_0_15px_rgba(96,165,250,0.5)]",
        "hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
        "dark:hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]"
      )}
      onClick={handleClick}
    />
  );
}

function getRandomStudy() {}

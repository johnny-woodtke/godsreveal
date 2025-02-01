import Link from "next/link";

import { cn } from "@godsreveal/lib";

import Reveal from "@/components/reveal";
import { ModeToggle } from "@/components/theme-provider";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-screen border-b backdrop-blur-md">
      <div
        className={cn(
          "mx-auto flex h-full max-w-screen-lg items-center justify-between",
          "border-b border-border p-4 py-3 sm:py-4",
        )}
      >
        <Reveal />

        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            God's Reveal
          </h1>
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
}

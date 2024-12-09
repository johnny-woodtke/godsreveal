import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/theme-provider";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-screen border-b backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between p-4 py-3 sm:py-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon-192x192.png"
              alt="God's Reveal"
              width={100}
              height={100}
              className="size-8 rounded-lg sm:size-9"
            />

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              God's Reveal
            </h1>
          </div>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}

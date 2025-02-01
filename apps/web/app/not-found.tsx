"use client";

import Link from "next/link";

import { Button } from "@godsreveal/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@godsreveal/lib/src/utils";

export default function TableOfContents() {
  const [headers, setHeaders] = useState<Element[]>([]);

  useEffect(() => {
    const headers = document.querySelectorAll("h2[id]");
    setHeaders(Array.from(headers));
  }, []);

  return (
    <nav className="sticky top-[125px] ml-4 w-full">
      <ul className="space-y-3">
        {headers.map((header) => (
          <li key={header.id} className="max-w-[500px]">
            <Link
              href={`#${header.id}`}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                "block overflow-hidden text-ellipsis whitespace-nowrap",
              )}
            >
              {header.textContent}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

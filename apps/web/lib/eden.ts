import { treaty } from "@elysiajs/eden";

import type { App } from "@godsreveal/server";

export function getClient() {
  return treaty<App>(`${getUrlOrThrow()}/api`);
}

function getUrlOrThrow() {
  const url = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_URL and NEXT_PUBLIC_VERCEL_URL are not set");
  }
  return url;
}

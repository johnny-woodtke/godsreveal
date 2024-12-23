import { treaty } from "@elysiajs/eden";

import type { App } from "@godsreveal/server";

export function getClient() {
  return treaty<App>(getServerUrlOrThrow(), {});
}

function getServerUrlOrThrow() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not set");
  }
  return serverUrl;
}

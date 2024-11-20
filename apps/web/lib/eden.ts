import { treaty } from "@elysiajs/eden";

import type { App } from "@godsreveal/server";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
if (!serverUrl) {
  throw new Error("NEXT_PUBLIC_SERVER_URL is not set");
}

export const client = treaty<App>(serverUrl);

import { treaty } from "@elysiajs/eden";

import type { App } from "@godsreveal/server";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
if (!serverUrl) {
  throw new Error("NEXT_PUBLIC_SERVER_URL is not set");
}

const clientToken = process.env.NEXT_PUBLIC_SERVER_CLIENT_TOKEN;
if (!clientToken) {
  throw new Error("NEXT_PUBLIC_SERVER_CLIENT_TOKEN is not set");
}

const serverToken = process.env.NEXT_PUBLIC_SERVER_SERVER_TOKEN;
if (!serverToken) {
  throw new Error("NEXT_PUBLIC_SERVER_SERVER_TOKEN is not set");
}

export const eden = {
  client: treaty<App>(serverUrl, {
    headers: {
      Authorization: `Bearer ${clientToken}`,
    },
  }),
  server: treaty<App>(serverUrl, {
    headers: {
      Authorization: `Bearer ${serverToken}`,
    },
  }),
};

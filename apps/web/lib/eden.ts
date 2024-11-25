import { treaty } from "@elysiajs/eden";

import type { App } from "@godsreveal/server";

export function getClient() {
  return treaty<App>(getServerUrlOrThrow(), {
    headers: {
      Authorization: `Bearer ${
        typeof window === "undefined"
          ? getServerTokenOrThrow()
          : getClientTokenOrThrow()
      }`,
    },
  });
}

function getServerUrlOrThrow() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not set");
  }
  return serverUrl;
}

function getClientTokenOrThrow() {
  const clientToken = process.env.NEXT_PUBLIC_SERVER_CLIENT_TOKEN;
  if (!clientToken) {
    throw new Error("NEXT_PUBLIC_SERVER_CLIENT_TOKEN is not set");
  }
  return clientToken;
}

function getServerTokenOrThrow() {
  const serverToken = process.env.NEXT_PUBLIC_SERVER_SERVER_TOKEN;
  if (!serverToken) {
    throw new Error("NEXT_PUBLIC_SERVER_SERVER_TOKEN is not set");
  }
  return serverToken;
}

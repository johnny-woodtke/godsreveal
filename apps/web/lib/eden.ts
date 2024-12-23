import { treaty } from "@elysiajs/eden";
import { deleteCookie, setCookie } from "cookies-next/client";

import type { App } from "@godsreveal/server";

export function getClient() {
  return treaty<App>(getServerUrlOrThrow(), {
    fetch: {
      credentials: "include",
    },
    onRequest: () => {
      setCookie(getAuthCookieNameOrThrow(), getAuthCookieSecretOrThrow(), {
        domain: getDomainOrThrow(),
      });
    },
    onResponse: () => {
      // deleteCookie(getAuthCookieNameOrThrow());
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

function getDomainOrThrow() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  if (!domain) {
    throw new Error("NEXT_PUBLIC_DOMAIN is not set");
  }
  return domain;
}

function getAuthCookieNameOrThrow() {
  const authCookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME;
  if (!authCookieName) {
    throw new Error("NEXT_PUBLIC_AUTH_COOKIE_NAME is not set");
  }
  return authCookieName;
}

function getAuthCookieSecretOrThrow() {
  const authCookieSecret = process.env.NEXT_PUBLIC_AUTH_COOKIE_SECRET;
  if (!authCookieSecret) {
    throw new Error("NEXT_PUBLIC_AUTH_COOKIE_SECRET is not set");
  }
  return authCookieSecret;
}

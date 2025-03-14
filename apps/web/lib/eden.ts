import { treaty } from "@elysiajs/eden";
import * as Sentry from "@sentry/nextjs";

import type { App } from "@godsreveal/server";

export function getClient() {
  return treaty<App>(`${getUrlOrThrow()}/api`, {
    fetcher: (input, options) => {
      let url: URL;
      let method: string;

      if (input instanceof URL) {
        url = input;
        method = options?.method ?? "GET";
      } else if (input instanceof Request) {
        url = new URL(input.url);
        method = input.method;
      } else {
        url = new URL(input);
        method = options?.method ?? "GET";
      }

      const pathname = scrubPathname(url.pathname);

      return Sentry.startNewTrace(() =>
        Sentry.startSpan(
          {
            name: `${method} ${pathname}`,
            attributes: {
              "http.request.method": method,
              "http.request.url": url.toString(),
              "http.request.pathname": pathname,
            },
          },
          async (span) => {
            const response = await fetch(input, options);
            span.setAttributes({
              "http.response.status": response.status,
              "http.response.statusText": response.statusText,
            });
            return response;
          },
        ),
      );
    },
  });
}

export function getUrlOrThrow() {
  const url =
    process.env.NEXT_PUBLIC_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : undefined);
  if (!url) {
    throw new Error("NEXT_PUBLIC_URL and NEXT_PUBLIC_VERCEL_URL are not set");
  }
  return url;
}

function scrubPathname(pathname: string): string {
  // replace thread_xxx until the next '/' with *
  return pathname.replace(/thread_\w+/g, "*");
}

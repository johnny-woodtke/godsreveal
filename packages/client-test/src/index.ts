import { Endpoint, Init, Method, Response } from "@/types/client";

type CreateClientProps = {
  domain: `https://${string}`;
  apiKey: string;
};

/**
 * Just a fetch wrapper that adds typing and auto-inserts the domain and API key
 * into the request.
 */
export function createClient({ domain, apiKey }: CreateClientProps) {
  return async <T extends Endpoint, U extends Method>(
    pathname: T,
    init: Init<T, U>
  ) => {
    // Create the URL
    const url = new URL(pathname, domain);

    // Create the request
    const request = new Request(url, {
      ...(init ?? {}),
      body: init?.body ? JSON.stringify(init.body) : undefined,
      headers: {
        ...(init?.headers ?? {}),
        "x-api-key": apiKey,
      },
    });

    // Send the request
    return fetch(request).then((res) => res.json() as Promise<Response<T, U>>);
  };
}

export type { Endpoint, Method, Response, Init, CreateClientProps };

async function main() {
  const client = createClient({
    domain: "https://localhost:3000",
    apiKey: "123",
  });

  const res = await client("/api", {
    method: "GET",
    body: undefined,
  });
}

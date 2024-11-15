import { Endpoint, Init, Method, Pathname, Response } from "./types";

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
    pathname: Pathname<T, U>,
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

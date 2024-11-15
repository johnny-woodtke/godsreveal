import { EndpointSchemas } from "./map";

export type Endpoint = "/api";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Init<
  T extends Endpoint,
  U extends Method,
> = U extends keyof EndpointSchemas[T]["request"]
  ? Omit<RequestInit, "method" | "body"> & {
      method: U;
      body: EndpointSchemas[T]["request"][U];
    }
  : never;

export type Response<
  T extends Endpoint,
  U extends Method,
> = U extends keyof EndpointSchemas[T]["response"]
  ? EndpointSchemas[T]["response"][U]
  : never;

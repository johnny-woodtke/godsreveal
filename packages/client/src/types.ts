import z from "zod";
import {
  requestSchemas as apiRequestSchemas,
  responseSchemas as apiResponseSchemas,
} from "./api";
import { errorSchema } from "./utils";

type RequestSchemasToType<T extends Record<string, z.ZodTypeAny | undefined>> =
  {
    [K in keyof T]: T[K] extends z.ZodTypeAny ? z.infer<T[K]> : undefined;
  };

type ResponseSchemasToType<T extends Record<string, z.ZodTypeAny | undefined>> =
  {
    [K in keyof T]: T[K] extends z.ZodTypeAny
      ? z.infer<T[K] | typeof errorSchema>
      : undefined;
  };

export type Endpoint = "/api";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type EndpointToSchemasMap<T extends Endpoint> = {
  "/api": {
    request: RequestSchemasToType<typeof apiRequestSchemas>;
    response: ResponseSchemasToType<typeof apiResponseSchemas>;
  };
}[T];

type EndpointSchemas = {
  [K in Endpoint]: EndpointToSchemasMap<K>;
};

export type Pathname<
  T extends Endpoint,
  U extends Method,
> = U extends keyof EndpointSchemas[T]["request"] ? T : never;

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

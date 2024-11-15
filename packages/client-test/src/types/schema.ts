import z from "zod";

import { errorSchema } from "@/utils";
import { Method } from "@/types/client";

export type BaseRequestSchema<T extends Method> = {
  [K in T]: K extends "GET" ? undefined : z.ZodSchema | undefined;
};

export type BaseResponseSchema<T extends Method> = {
  [K in T]: z.ZodUnion<[z.ZodTypeAny, typeof errorSchema]>;
};

type GenericSchema = Record<string, z.ZodTypeAny | undefined>;

type SchemaToType<T extends GenericSchema> = {
  [K in keyof T]: T[K] extends z.ZodTypeAny ? z.infer<T[K]> : undefined;
};

export type EndpointSchema<
  RequestSchema extends GenericSchema,
  ResponseSchema extends GenericSchema,
> = {
  request: SchemaToType<RequestSchema>;
  response: SchemaToType<ResponseSchema>;
};

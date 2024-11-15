import {
  BaseRequestSchema,
  BaseResponseSchema,
  EndpointSchema,
} from "@/types/schema";
import { errorSchema } from "@/utils";
import { z } from "zod";

type Methods = "GET" | "POST";

export const requestSchema = {
  GET: undefined,
  POST: z.object({
    text: z.string(),
  }),
} satisfies BaseRequestSchema<Methods>;

export const responseSchema = {
  GET: z
    .object({
      message: z.string(),
    })
    .or(errorSchema),
  POST: z
    .object({
      text: z.string(),
    })
    .or(errorSchema),
} satisfies BaseResponseSchema<Methods>;

type Schema = EndpointSchema<typeof requestSchema, typeof responseSchema>;

export default Schema;

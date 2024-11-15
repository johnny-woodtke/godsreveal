import { z } from "zod";

export const requestSchemas = {
  GET: undefined,
  POST: z.object({
    text: z.string(),
  }),
};

export const responseSchemas = {
  GET: z.object({
    message: z.string(),
  }),
  POST: z.object({
    text: z.string(),
  }),
};

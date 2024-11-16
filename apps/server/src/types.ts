import { z } from "@hono/zod-openapi";

export type RouteHandler<
  RequestSchema extends z.ZodTypeAny,
  ResponseSchema extends z.ZodTypeAny,
  > = (
  // eslint-disable-next-line no-unused-vars
  data: z.infer<RequestSchema>
) => z.infer<ResponseSchema> | Promise<z.infer<ResponseSchema>>;

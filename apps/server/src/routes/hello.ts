import { RouteHandler } from "@/types";
import { createRoute, z } from "@hono/zod-openapi";

const helloPostParamsSchema = z.object({
  name: z.string().openapi({
    example: "John Doe",
  }),
});

const helloPostResponseSchema = z.object({
  message: z.string().openapi({
    example: "Hello John Doe",
  }),
});

const route = createRoute({
  method: "post",
  path: "/hello",
  request: {
    body: {
      content: {
        "application/json": {
          schema: helloPostParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: helloPostResponseSchema,
        },
      },
      description: "Returns a greeting message",
    },
  },
});

const handler: RouteHandler<
  typeof helloPostParamsSchema,
  typeof helloPostResponseSchema
> = (data) => ({
  message: `Hello ${data.name}`,
});

export default {
  route,
  handler,
};

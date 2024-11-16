import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import hello from "@/routes/hello";

const app = new OpenAPIHono()
  .openapi(hello.route, async (c) => {
    const data = c.req.valid("json");
    return c.json(await hello.handler(data), 200);
  })
  .doc("/openapi.json", {
    openapi: "3.1.0",
    info: {
      title: "God's Reveal API",
      version: "1.0.0",
    },
  })
  .get(
    "/docs",
    swaggerUI({
      url: "/openapi.json",
    })
  );

app.use("*", cors());

export type App = typeof app;
export default app;

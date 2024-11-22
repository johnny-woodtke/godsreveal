import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

const port = Bun.env.PORT;
if (!port) {
  throw new Error("PORT is not set");
}

const app = new Elysia()
  .use(swagger())
  .use(
    cors(),
    // cors({
    //   origin:
    //     Bun.env.NODE_ENV === "production"
    //       ? [
    //           // regex to match godsreveal.com domain
    //           /^(https?:\/\/)?(www\.)?godsreveal\.com$/,
    //           // regex to match server.godsreveal.com domain
    //           /^(https?:\/\/)?server\.godsreveal\.com$/,
    //         ]
    //       : // allow any origin in development
    //         "*",
    // }),
  )
  .onBeforeHandle(({ request }) => {
    console.log("headers", request.headers);
  })
  .get("/", () => "Hello Elysia", {
    detail: {
      summary: "Hello Elysia",
      description: "This is a simple hello world endpoint",
    },
    response: {
      200: t.String(),
    },
  })
  .get("/id/:id", ({ params }) => params.id, {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      summary: "Get ID",
      description: "This is a simple get id endpoint",
    },
    response: {
      200: t.Number(),
    },
  })
  .post("/mirror", ({ body }) => body, {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
    }),
    detail: {
      summary: "Mirror",
      description: "This is a simple mirror endpoint",
    },
    response: {
      200: t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    },
  })
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;

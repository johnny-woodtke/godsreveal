import { publicProcedure, router } from "@/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import z from "zod";
import cors from "cors";

const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    console.log("healthCheck");
    return { status: "OK" };
  }),

  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.name}`;
    }),
});

export type AppRouter = typeof appRouter;

/**
 * Create and start the server
 */
const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});
server.listen(3001);
console.log("🚀 Server listening on http://localhost:3001");

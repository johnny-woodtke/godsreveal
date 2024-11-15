import { publicProcedure, router } from "@/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import z from "zod";

const appRouter = router({
  healthCheck: publicProcedure.query(() => "OK"),

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
});
server.listen(3000);

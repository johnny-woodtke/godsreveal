import cron from "@elysiajs/cron";
import Elysia from "elysia";

import { Cron, Patterns } from "./constants";

export default new Elysia().use(
  cron({
    name: Cron.GodsRevealKeepAlive,
    pattern: Patterns[Cron.GodsRevealKeepAlive],
    run: async () => {
      // get host from env
      const url = Bun.env.GODSREVEAL_HOST;
      if (!url) {
        throw new Error("GODSREVEAL_HOST is not set");
      }

      // if dev, just log
      if (Bun.env.NODE_ENV === "development") {
        console.log(`${Cron.GodsRevealKeepAlive}:`, url);
        return;
      }

      // get and log response
      const response = await fetch(url);
      console.log(
        `${Cron.GodsRevealKeepAlive}:`,
        response.status,
        response.statusText,
      );
    },
  }),
);

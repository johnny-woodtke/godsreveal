import { treaty } from "@elysiajs/eden";
import type { App } from "@godsreveal/server";

export const client = treaty<App>("localhost:3000");

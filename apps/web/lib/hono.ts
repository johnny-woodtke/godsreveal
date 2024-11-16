import type { App } from "@godsreveal/server";
import { hc } from "hono/client";

export const hono = hc<App>("http://localhost:8787");

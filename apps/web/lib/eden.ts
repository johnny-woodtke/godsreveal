import { treaty } from "@elysiajs/eden";
import type { App } from "@godsreveal/server";

const envVarName = "NEXT_PUBLIC_SERVER_URL";

const serverUrl = process.env[envVarName];
if (!serverUrl) {
  throw new Error(`${envVarName} is not set`);
}

export const client = treaty<App>(serverUrl);

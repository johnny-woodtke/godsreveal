import jwt from "jsonwebtoken";
import z from "zod";

import { getJwtSecretKeyOrThrow } from "./utils";
import { jwtPayloadSchema } from "./utils";

// generate a JWT token for a given payload
export function generateJwt(payload: z.infer<typeof jwtPayloadSchema>) {
  const secretKey = getJwtSecretKeyOrThrow();
  return jwt.sign(payload, secretKey);
}

// get origin from CLI
const origin = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--origin="))
  ?.split("=")[1];

// parse payload
const parsedPayload = jwtPayloadSchema.safeParse({ origin });
if (!parsedPayload.success) {
  console.error(
    "Please provide a valid origin with the following command:\n\n bun generate:jwt -- --origin=<origin-here>\n\n",
  );
  process.exit(1);
}

// generate token
console.log("Generating token for data:");
console.log(parsedPayload.data, "\n");
const token = generateJwt(parsedPayload.data);

// log token
console.log("Token:", token, "\n");

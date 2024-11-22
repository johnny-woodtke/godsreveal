import jwt from "jsonwebtoken";
import z from "zod";

export const jwtPayloadSchema = z.object({
  // origin domain
  // e.g. https://www.godsreveal.com
  origin: z
    .string()
    .nullable()
    .transform((value) => (value === "null" ? null : value)),
});

export function getJwtSecretKeyOrThrow() {
  const secretKey = Bun.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not set");
  }
  return secretKey;
}

const noAuthRoutes = [
  // regex for any route starting with /swagger: like /swagger, /swagger#header, etc.
  /^\/swagger/,
];

function isNoAuthRoute(request: Request): boolean {
  const pathname = new URL(request.url).pathname;
  return noAuthRoutes.some((route) => route.test(pathname));
}

function verifyJwt(request: Request): boolean {
  // get bearer token
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }

  // verify JWT
  let payload: unknown;
  try {
    payload = jwt.verify(token, getJwtSecretKeyOrThrow());
  } catch (error) {
    return false;
  }

  // parse payload
  const parsedPayload = jwtPayloadSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return false;
  }

  // check origin
  const { origin } = parsedPayload.data;
  return origin === request.headers.get("origin");
}

export function verifyAuth(request: Request): boolean {
  // check if route is in noAuthRoutes, else verify JWT
  return isNoAuthRoute(request) || verifyJwt(request);
}

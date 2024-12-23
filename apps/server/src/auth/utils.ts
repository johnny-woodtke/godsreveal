export function getAuthCookieNameOrThrow() {
  const authCookieName = Bun.env.AUTH_COOKIE_NAME;
  if (!authCookieName) {
    throw new Error("AUTH_COOKIE_NAME is not set");
  }
  return authCookieName;
}

export function getAuthCookieSecretOrThrow() {
  const authCookieSecret = Bun.env.AUTH_COOKIE_SECRET;
  if (!authCookieSecret) {
    throw new Error("AUTH_COOKIE_SECRET is not set");
  }
  return authCookieSecret;
}

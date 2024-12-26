export function getAuthHeaderSecretOrThrow() {
  const authHeaderSecret = Bun.env.AUTH_HEADER_SECRET;
  if (!authHeaderSecret) {
    throw new Error("AUTH_HEADER_SECRET is not set");
  }
  return authHeaderSecret;
}

export function getValidReferersOrThrow() {
  const validReferers = Bun.env.VALID_REFERERS;
  if (!validReferers) {
    throw new Error("VALID_REFERERS is not set");
  }
  return validReferers.split(",");
}

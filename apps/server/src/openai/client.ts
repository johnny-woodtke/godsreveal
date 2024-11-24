/**
 * OpenAI fetch client
 *
 * Auto-inserts the OpenAI secret key, org ID, and project ID into the request headers
 */
export function openai(pathname: `/${string}`, init?: RequestInit) {
  // insert headers
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${getOpenAiSecretKeyOrThrow()}`);
  headers.set("OpenAI-Organization", getOpenAiOrgIdOrThrow());
  headers.set("OpenAI-Beta", "assistants=v2");

  // update fetch args
  const updatedInit = {
    ...init,
    headers,
  };

  // return fetch with updated headers
  return fetch(`${baseUrl}${pathname}`, updatedInit);
}

const baseUrl = "https://api.openai.com";

function getOpenAiSecretKeyOrThrow() {
  const secretKey = Bun.env.OPENAI_SECRET_KEY;
  if (!secretKey) {
    throw new Error("OPENAI_SECRET_KEY is not set");
  }
  return secretKey;
}

function getOpenAiOrgIdOrThrow() {
  const orgId = Bun.env.OPENAI_ORG_ID;
  if (!orgId) {
    throw new Error("OPENAI_ORG_ID is not set");
  }
  return orgId;
}

function getOpenAiProjectIdOrThrow() {
  const projectId = Bun.env.OPENAI_PROJECT_ID;
  if (!projectId) {
    throw new Error("OPENAI_PROJECT_ID is not set");
  }
  return projectId;
}

import Elysia, { t } from "elysia";

import { Tag } from "@/constants";

import { getAuthHeaderSecretOrThrow, getValidReferersOrThrow } from "./utils";

export default new Elysia()
  .guard({
    as: "scoped",
    beforeHandle: ({ error, headers }) => {
      // get valid referers
      const validReferers = getValidReferersOrThrow();

      // check if referer is valid
      if (!headers.referer || !validReferers.includes(headers.referer)) {
        return error(401, "Unauthorized");
      }

      // get auth header secret
      const authHeaderSecret = getAuthHeaderSecretOrThrow();

      // compare auth header secret with secret
      if (headers["x-godsreveal-auth"] !== authHeaderSecret) {
        return error(401, "Unauthorized");
      }
    },
  })
  .get("/auth", () => "OK", {
    params: t.Undefined(),
    response: t.String(),
    detail: {
      summary: "Auth check",
      description: "Check if the request is authenticated",
      tags: [Tag.DEFAULT],
    },
  });

import Elysia, { t } from "elysia";

import { Tag } from "@/constants";

import { getAuthHeaderSecretOrThrow, getValidReferersOrThrow } from "./utils";

export default new Elysia()
  .guard({
    as: "scoped",
    beforeHandle: ({ error, headers }) => {
      // log headers
      console.log("headers", headers);

      // get valid referers
      let validReferers: string[];
      try {
        validReferers = getValidReferersOrThrow();
      } catch (e) {
        console.error("Error getting valid referers:", e);
        return error(500, "Internal server error");
      }

      // check if referer is valid
      if (!headers.referer || !validReferers.includes(headers.referer)) {
        return error(401, "Unauthorized");
      }

      // get auth header secret
      let authHeaderSecret: string;
      try {
        authHeaderSecret = getAuthHeaderSecretOrThrow();
      } catch (e) {
        console.error("Error getting auth header secret:", e);
        return error(500, "Internal server error");
      }

      // compare auth header secret with secret
      if (headers["x-godsreveal-auth"] !== authHeaderSecret) {
        return error(401, "Unauthorized");
      }
    },
  })
  .guard({
    as: "global",
    afterHandle: ({ headers }) => {
      // remove referer header
      headers.referer = undefined;
      // remove auth header
      headers["x-godsreveal-auth"] = undefined;
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

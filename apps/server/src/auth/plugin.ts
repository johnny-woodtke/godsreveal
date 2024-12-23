import Elysia, { t } from "elysia";

import { Tag } from "@/constants";

import { getAuthCookieNameOrThrow, getAuthCookieSecretOrThrow } from "./utils";

export default new Elysia()
  .guard({
    as: "scoped",
    beforeHandle: ({ cookie, error }) => {
      // get auth cookie name
      let authCookieName: string;
      try {
        authCookieName = getAuthCookieNameOrThrow();
      } catch (e) {
        console.error("Error getting auth cookie name:", e);
        return error(500, "Internal server error");
      }

      // get auth cookie secret
      let authCookieSecret: string;
      try {
        authCookieSecret = getAuthCookieSecretOrThrow();
      } catch (e) {
        console.error("Error getting auth cookie secret:", e);
        return error(500, "Internal server error");
      }

      // get client auth cookie value and compare with secret
      const clientAuthCookie = cookie[authCookieName]?.value;
      if (clientAuthCookie !== authCookieSecret) {
        return error(401, "Unauthorized");
      }
    },
  })
  .guard({
    as: "global",
    afterHandle: ({ cookie }) => {
      // get auth cookie name
      let authCookieName: string;
      try {
        authCookieName = getAuthCookieNameOrThrow();
      } catch (e) {
        console.error("Error getting auth cookie name:", e);
        return;
      }

      // unset auth cookie
      cookie[authCookieName]?.set({
        value: "",
      });
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

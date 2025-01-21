import type { Static } from "elysia";
import { t } from "elysia/type-system";
import { getSyncConfig } from "elysiajs-sync/client";

export const thread = t.Object({
  id: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  name: t.Optional(t.String()),
});

export type Thread = Static<typeof thread>;

export const message = t.Object({
  id: t.String(),
  createdAt: t.Date(),
  role: t.Union([t.Literal("user"), t.Literal("assistant")]),
  content: t.String(),
  threadId: t.String(),
});

export type Message = Static<typeof message>;

export const config = getSyncConfig({
  name: "godsreveal-sync",
  schema: {
    thread,
    message,
  },
  keys: {
    thread: ["id", "createdAt", "updatedAt"],
    message: ["id", "createdAt", "role", "threadId"],
  },
  latestVerno: 1,
  previousVersions: [],
});

export type Config = typeof config;

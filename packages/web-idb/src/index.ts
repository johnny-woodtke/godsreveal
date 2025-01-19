import type { Static } from "elysia";
import { t } from "elysia/type-system";
import type { SyncDexieKeys, SyncDexieSchema } from "elysiajs-sync/types";

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

export const schema = {
  thread,
  message,
} satisfies SyncDexieSchema;

export type Schema = typeof schema;

export const keys = {
  thread: ["id", "createdAt", "updatedAt"],
  message: ["id", "createdAt", "role", "threadId"],
} satisfies SyncDexieKeys<Schema>;

export type Keys = typeof keys;

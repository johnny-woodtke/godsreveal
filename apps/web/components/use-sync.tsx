import { Sync } from "elysiajs-sync/client";
import { useMemo } from "react";

import { keys, schema } from "@godsreveal/web-idb";

export function useSync() {
  return useMemo(() => new Sync(schema, keys), []);
}

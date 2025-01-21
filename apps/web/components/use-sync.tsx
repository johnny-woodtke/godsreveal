import { Sync } from "elysiajs-sync/client";
import { useMemo } from "react";

import { config } from "@godsreveal/web-idb";

export function useSync() {
  const sync = useMemo(() => new Sync(config), []);
  const db = sync.getDb();
  return { sync, db };
}

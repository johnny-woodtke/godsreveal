"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getClient } from "@/lib/eden";

export default function ClientMessage() {
  const client = getClient();
  const { data: message, isFetching } = useQuery({
    queryKey: ["message", "client"],
    queryFn: () => client.index.get().then((res) => res.data),
  });

  return (
    <div className="flex items-center gap-2">
      Client message:{" "}
      {isFetching ? <Loader2 className="animate-spin" /> : message}
    </div>
  );
}

"use client";

import { client } from "@/lib/eden";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ClientMessage() {
  const { data: message, isFetching } = useQuery({
    queryKey: ["message", "client"],
    queryFn: () => client.index.get().then((res) => res.data),
  });

  return (
    <div className="flex items-center gap-2">
      Client: {isFetching ? <Loader2 className="animate-spin" /> : message}
    </div>
  );
}

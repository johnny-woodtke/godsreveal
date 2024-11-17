"use client";

import { useEffect, useState } from "react";

import { client } from "@/lib/eden";

export default function ClientMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    client.mirror
      .post({
        id: 1,
        name: "test",
      })
      .then((res) => setMessage(res.data?.name ?? ""));
  }, []);

  return <>Client: {message}</>;
}

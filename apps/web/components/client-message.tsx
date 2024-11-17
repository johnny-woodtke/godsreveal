"use client";

import { useEffect, useState } from "react";

import { client } from "@/lib/eden";

export default function ClientMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    client
      .id({ id: 1 })
      .get()
      .then((res) => setMessage(res.data ?? ""));
  }, []);

  return <li>Client: {message}</li>;
}

"use client";

import { Button } from "@godsreveal/ui";

export default function ClientButton() {
  return (
    <Button variant="secondary" onClick={() => alert("Hello!")}>
      Open alert
    </Button>
  );
}

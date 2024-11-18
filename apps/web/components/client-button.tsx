"use client";

import { Button } from "@godsreveal/ui";

export default function ClientButton() {
  return (
    <Button variant="default" size="default" onClick={() => alert("Hello!")}>
      Open alert
    </Button>
  );
}

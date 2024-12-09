import Link from "next/link";

import { cn } from "@godsreveal/lib";

export default function ExternalLink({
  href,
  children,
  muted = false,
}: {
  href: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(muted && "text-muted-foreground")}
    >
      {children}
    </Link>
  );
}

import Link from "next/link";

export default function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  );
}

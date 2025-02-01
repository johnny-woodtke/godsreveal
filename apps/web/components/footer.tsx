import { BotIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@godsreveal/lib";

import { Study } from "@/lib/constants/url-params";

import Reveal from "./reveal";

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

const footerLinks: Record<string, FooterLink[]> = {
  About: [
    { name: "Contact", href: "/contact" },
    { name: "Salvation", href: "/salvation" },
  ],
  Resources: [
    {
      name: "Extra-Biblical Studies",
      href: `/${Study.ExtraBiblicalStudies}`,
    },
    { name: "Bible Studies", href: `/${Study.BibleStudies}` },
  ],
  EschatoloGPT: [
    {
      name: "API Documentation",
      href: "https://server.godsreveal.com/docs",
      external: true,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto max-w-screen-lg space-y-8 px-4 py-12 sm:px-6 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Reveal />
              <span className="text-xl font-bold">God's Reveal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exploring Bible prophecy through AI-assisted research.
            </p>
            <div className="flex items-center gap-2">
              <BotIcon className="size-4" />
              <span className="text-sm text-muted-foreground">
                Powered by EschatoloGPT
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-base font-medium">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground transition-colors",
                        "hover:text-foreground",
                      )}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-start gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} God's Reveal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

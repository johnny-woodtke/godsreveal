import "globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@godsreveal/lib";
import "@godsreveal/ui/globals.css";

import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "God's Reveal",
  description:
    '"And when these things begin to come to pass, then look up, and lift up your heads; for your redemption draweth nigh."\n    Luke 21:28',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <Providers>
          <Header />
          <div className="mx-auto max-w-screen-lg p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

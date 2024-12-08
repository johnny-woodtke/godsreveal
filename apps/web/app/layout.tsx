import { Analytics } from "@vercel/analytics/next";
import "globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { cn } from "@godsreveal/lib";
import "@godsreveal/ui/globals.css";

import ChatModal from "@/components/chat/chat-modal";
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

export const fetchCache = "force-no-store";

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
          <Suspense>
            <div className="fixed bottom-0 w-full">
              <div className="mx-auto flex max-w-screen-lg justify-end p-4">
                <ChatModal />
              </div>
            </div>
          </Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

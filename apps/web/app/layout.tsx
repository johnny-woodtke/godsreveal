import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { cn } from "@godsreveal/lib";
import "@godsreveal/ui/globals.css";

import ChatModal from "@/components/chat/chat-modal";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { getUrlOrThrow } from "@/lib/eden";

const url = getUrlOrThrow();

const title = {
  default: "God's Reveal",
  template: "%s | God's Reveal",
};
const description =
  "Explore Bible prophecy, end-times studies, and Biblical revelations.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    "Bible prophecy",
    "end times",
    "Biblical studies",
    "Christian prophecy",
    "Bible study",
    "Biblical revelation",
    "Christian eschatology",
    "Biblical interpretation",
    "prophecy studies",
  ],
  manifest: "/manifest.ts",
  icons: [
    { rel: "apple-touch-icon", url: "/favicon-192x192.png" },
    { rel: "icon", url: "/favicon-192x192.png" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrlOrThrow(),
    title,
    description,
    siteName: "God's Reveal",
    images: [
      {
        url: "/second-coming.jpg",
        width: 1200,
        height: 630,
        alt: title.default,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/second-coming.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const fetchCache = "force-no-store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <Providers>
          <Header />

          <div className="mx-auto p-4">{children}</div>

          <div className="fixed bottom-0 w-full">
            <div className="mx-auto flex max-w-screen-lg justify-end p-4">
              <Suspense>
                <ChatModal />
              </Suspense>
            </div>
          </div>
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

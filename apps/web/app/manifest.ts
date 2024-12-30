import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "God's Reveal",
    short_name: "God's Reveal",
    description:
      '"And when these things begin to come to pass, then look up, and lift up your heads; for your redemption draweth nigh."\n    Luke 21:28',
    start_url: "/",
    display: "minimal-ui",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

import type { MetadataRoute } from "next";

import { Study } from "@/lib/constants/url-params";
import { getUrlOrThrow } from "@/lib/eden";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getUrlOrThrow(),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${getUrlOrThrow()}/${Study.ExtraBiblicalStudies}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${getUrlOrThrow()}/${Study.BibleStudies}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

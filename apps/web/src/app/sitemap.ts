import { MetadataRoute } from "next";
import { env } from "~env.mjs";

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: NEXT_PUBLIC_PRODUCTION_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

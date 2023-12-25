import { MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mijikai.space",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

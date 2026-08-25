import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/games/capitalization-repair`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/games/capitalization-sort`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/games/capitalization-rush`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

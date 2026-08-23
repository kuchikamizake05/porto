import type { MetadataRoute } from "next";

const siteUrl = "https://kuchikamizake.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/projects` },
  ];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://outage-visualizer.vercel.app";

  const outages = [
    "cloudflare-nov-2025",
    "aws-oct-2025",
    "google-jun-2025",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...outages.map((slug) => ({
      url: `${baseUrl}/outages/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}


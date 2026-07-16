import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parilatafoundation.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "about", "blog", "stories", "gallery", "videos", "contact", "volunteer", "donate",
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // TODO: extend this with dynamic blog/story slugs fetched from Supabase
  return staticRoutes;
}

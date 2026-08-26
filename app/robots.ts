import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/social-metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getPublicSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

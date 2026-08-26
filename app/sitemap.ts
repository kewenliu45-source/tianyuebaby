import type { MetadataRoute } from "next";
import {
  fetchAllNewsForSitemap,
  fetchAllSuccessCasesForSitemap,
  fetchAllVideosForSitemap,
} from "@/sanity/lib/fetchers";
import { getPublicSiteUrl } from "@/lib/social-metadata";

const STATIC_PATHS = [
  "/",
  "/about-tianyue",
  "/egg-sperm-freezing",
  "/faq",
  "/intended-parents",
  "/ivf-services",
  "/journey",
  "/medical-services",
  "/news",
  "/overseas-fertility",
  "/privacy",
  "/private-customization",
  "/success-cases",
  "/start-your-journey",
  "/third-generation-ivf",
  "/third-party-assisted-reproduction",
  "/videos",
  "/why-us",
] as const;

function toLastModified(...values: Array<string | undefined>): Date | undefined {
  const value = values.find(Boolean);
  if (!value) return undefined;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getPublicSiteUrl();
  const [newsArticles, videos, successCases] = await Promise.all([
    fetchAllNewsForSitemap(),
    fetchAllVideosForSitemap(),
    fetchAllSuccessCasesForSitemap(),
  ]);

  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.map((pathname) => ({
    url: pathname === "/" ? baseUrl : `${baseUrl}${pathname}`,
    changeFrequency:
      pathname === "/news" || pathname === "/videos" ? "weekly" : "monthly",
    priority: pathname === "/" ? 1 : 0.7,
  }));

  const newsPages: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: toLastModified(article._updatedAt, article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: toLastModified(video._updatedAt, video.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const successCasePages: MetadataRoute.Sitemap = successCases.map((item) => ({
    url: `${baseUrl}/success-cases/${item.slug}`,
    lastModified: toLastModified(item._updatedAt, item.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages, ...videoPages, ...successCasePages];
}

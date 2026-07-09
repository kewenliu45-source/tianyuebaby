import type { MetadataRoute } from "next";
import {
  fetchAllNewsForSitemap,
  fetchAllVideosForSitemap,
} from "@/sanity/lib/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zhuyunbaby.com";

  // 固定页面
  const fixedPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    {
      url: `${baseUrl}/intended-parents`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journey`,
      lastModified: new Date(),
      priority: 0.8,
    },
    { url: `${baseUrl}/news`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), priority: 0.8 },
    {
      url: `${baseUrl}/why-us`,
      lastModified: new Date(),
      priority: 0.8,
    },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.7 },
    {
      url: `${baseUrl}/start-your-journey`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      priority: 0.3,
    },
  ];

  // 新闻文章
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const newsArticles = await fetchAllNewsForSitemap();
    newsPages = newsArticles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article._updatedAt || article.publishedAt),
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  // 科普视频
  let videoPages: MetadataRoute.Sitemap = [];
  try {
    const videos = await fetchAllVideosForSitemap();
    videoPages = videos.map((video) => ({
      url: `${baseUrl}/videos/${video.slug}`,
      lastModified: new Date(video._updatedAt || video.publishedAt),
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  return [...fixedPages, ...newsPages, ...videoPages];
}

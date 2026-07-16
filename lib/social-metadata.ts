import type { Metadata } from "next";
import type { Image } from "sanity";

import { urlForImage } from "@/sanity/lib/image";
import type {
  BannerSlide,
  SanityImage,
  Seo,
  SiteSettings,
} from "@/types/sanity";

const PRODUCTION_SITE_URL = "https://zhuyunbaby.com";
const STATIC_SHARE_IMAGE = "/images/share.jpg";

type PageType = "website" | "article";

interface BuildPageMetadataOptions {
  title: string;
  description?: string;
  pathname: string;
  seo?: Seo | null;
  siteSettings?: SiteSettings | null;
  image?: SanityImage | null;
  imageAlt?: string;
  type?: PageType;
  publishedTime?: string;
  modifiedTime?: string;
}

interface SocialImage {
  url: string;
  width: number;
  height: number;
  type: "image/jpeg";
  alt: string;
}

export function getPublicSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (
    !configuredUrl ||
    configuredUrl.includes("localhost") ||
    configuredUrl.includes("127.0.0.1")
  ) {
    return PRODUCTION_SITE_URL;
  }

  return configuredUrl.replace(/\/$/, "");
}

export function getBannerShareImage(
  banners?: BannerSlide[] | null
): SanityImage | undefined {
  return banners?.find((banner) => banner.isActive !== false)?.desktopImage;
}

function toAbsoluteUrl(urlOrPath: string, siteUrl: string): string {
  try {
    return new URL(urlOrPath, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
  }
}

function buildSanityImage(
  source: SanityImage,
  width: number,
  height: number,
  alt: string
): SocialImage {
  const url = urlForImage(source as unknown as Image)
    .width(width)
    .height(height)
    .fit("crop")
    .format("jpg")
    .url();

  return { url, width, height, type: "image/jpeg", alt };
}

function resolveSocialImages({
  pageImage,
  defaultImage,
  alt,
  siteUrl,
}: {
  pageImage?: SanityImage | null;
  defaultImage?: SanityImage | null;
  alt: string;
  siteUrl: string;
}): { openGraph: SocialImage; twitter: SocialImage } {
  const image = pageImage || defaultImage;

  if (image) {
    return {
      openGraph: buildSanityImage(image, 800, 800, alt),
      twitter: buildSanityImage(image, 1200, 630, alt),
    };
  }

  const fallbackUrl = toAbsoluteUrl(STATIC_SHARE_IMAGE, siteUrl);
  const fallback = {
    url: fallbackUrl,
    width: 600,
    height: 600,
    type: "image/jpeg" as const,
    alt,
  };

  return { openGraph: fallback, twitter: fallback };
}

/**
 * Builds complete per-page metadata with one preferred Open Graph image.
 * Image priority: page SEO -> page cover/hero -> site default -> static image.
 */
export function buildPageMetadata({
  title,
  description = "",
  pathname,
  seo,
  siteSettings,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildPageMetadataOptions): Metadata {
  const siteUrl = getPublicSiteUrl();
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description;
  const socialTitle = seo?.ogTitle || metaTitle;
  const socialDescription = seo?.ogDescription || metaDescription;
  const canonical = seo?.canonicalUrl || toAbsoluteUrl(pathname, siteUrl);
  const alt = imageAlt || socialTitle;
  const images = resolveSocialImages({
    pageImage: seo?.ogImage || image,
    defaultImage: siteSettings?.defaultShareImage,
    alt,
    siteUrl,
  });

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          locale: "zh_CN",
          url: canonical,
          siteName: siteSettings?.siteName,
          title: socialTitle,
          description: socialDescription,
          publishedTime,
          modifiedTime,
          images: [images.openGraph],
        }
      : {
          type: "website",
          locale: "zh_CN",
          url: canonical,
          siteName: siteSettings?.siteName,
          title: socialTitle,
          description: socialDescription,
          images: [images.openGraph],
        };

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords || siteSettings?.defaultSeo?.keywords,
    alternates: { canonical },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: images.twitter.url, alt: images.twitter.alt }],
    },
  };
}

import type { Metadata } from "next";
import type { Image } from "sanity";

import { urlForImage } from "@/sanity/lib/image";
import type {
  BannerSlide,
  SanityImage,
  Seo,
  SiteSettings,
} from "@/types/sanity";

export const PRODUCTION_SITE_URL = "https://zhuyunbaby.com";
const STATIC_SHARE_IMAGE = "/images/share.jpg";

type PageType = "website" | "article";

interface BuildPageMetadataOptions {
  title: string;
  description?: string;
  pathname: string;
  seo?: Seo | null;
  siteSettings?: SiteSettings | null;
  image?: SanityImage | null;
  staticImage?: Partial<SocialImage> & { url: string };
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

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must be set to ${PRODUCTION_SITE_URL} in production`
      );
    }
    return PRODUCTION_SITE_URL;
  }

  try {
    const parsed = new URL(configuredUrl);
    const isCanonicalOrigin = parsed.origin === PRODUCTION_SITE_URL;
    const hasUnexpectedParts =
      parsed.pathname !== "/" || Boolean(parsed.search) || Boolean(parsed.hash);

    if (!isCanonicalOrigin || hasUnexpectedParts) {
      throw new Error("site URL must match the canonical production origin");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Invalid NEXT_PUBLIC_SITE_URL. Expected ${PRODUCTION_SITE_URL}`,
        { cause: error }
      );
    }
    console.warn(
      `[SEO] Invalid NEXT_PUBLIC_SITE_URL; using ${PRODUCTION_SITE_URL}`
    );
    return PRODUCTION_SITE_URL;
  }

  return PRODUCTION_SITE_URL;
}

function resolveCanonicalUrl(
  configuredCanonical: string | undefined,
  pathname: string,
  siteUrl: string
): string {
  const fallback = toAbsoluteUrl(pathname, siteUrl);
  if (!configuredCanonical) return fallback;

  try {
    const candidate = new URL(configuredCanonical, `${siteUrl}/`);
    const expected = new URL(fallback);
    const normalizedPath = (value: string) => (value === "/" ? "" : value);
    const isSelfReferencing =
      candidate.origin === expected.origin &&
      normalizedPath(candidate.pathname) === normalizedPath(expected.pathname) &&
      candidate.search === expected.search &&
      candidate.hash === expected.hash;

    if (!isSelfReferencing) {
      console.warn(
        `[SEO] Ignoring non-self canonical ${candidate.toString()} for ${pathname}`
      );
      return fallback;
    }
    return candidate.toString();
  } catch {
    console.warn(`[SEO] Ignoring invalid canonical for ${pathname}`);
    return fallback;
  }
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
  staticImage,
  pageImage,
  defaultImage,
  alt,
  siteUrl,
}: {
  staticImage?: Partial<SocialImage> & { url: string };
  pageImage?: SanityImage | null;
  defaultImage?: SanityImage | null;
  alt: string;
  siteUrl: string;
}): { openGraph: SocialImage; twitter: SocialImage } {
  if (staticImage) {
    const image = {
      url: toAbsoluteUrl(staticImage.url, siteUrl),
      width: staticImage.width || 600,
      height: staticImage.height || 600,
      type: staticImage.type || ("image/jpeg" as const),
      alt: staticImage.alt || alt,
    };

    return { openGraph: image, twitter: image };
  }

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
  staticImage,
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
  const canonical = resolveCanonicalUrl(seo?.canonicalUrl, pathname, siteUrl);
  const alt = imageAlt || socialTitle;
  const images = resolveSocialImages({
    staticImage,
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

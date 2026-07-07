import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { DesktopWechatFloat } from "@/components/layout/desktop-wechat-float";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { WechatShareImageMeta } from "@/components/seo/wechat-share-meta";
import { fetchLayoutData } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const PRODUCTION_SITE_URL = "https://zhuyunbaby.com";

function getPublicSiteUrl() {
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

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await fetchLayoutData();
  const seo = siteSettings?.defaultSeo;

  // 生成 favicon URL
  const faviconUrl = siteSettings?.favicon
    ? urlForImage(siteSettings.favicon as unknown as Parameters<typeof urlForImage>[0]).url()
    : undefined;

  // 网站 URL（必须是公网可访问的 URL，微信爬虫不执行 JS）
  const siteUrl = getPublicSiteUrl();

  // 分享图片 URL（微信要求 JPG/PNG，至少 200x200，推荐 800x800）
  // 优先使用 Sanity 上传的图片，否则使用静态图片
  const shareImageUrl = siteSettings?.defaultShareImage
    ? urlForImage(siteSettings.defaultShareImage as unknown as Parameters<typeof urlForImage>[0])
        .width(800)
        .height(800)
        .format("jpg")
        .url()
    : `${siteUrl}/images/share.png`;

  // 网站名称和描述
  const siteName = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const siteDescription = siteSettings?.description || "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteSettings?.siteName || "天悦宝贝"}`,
    },
    description: seo?.metaDescription || siteDescription,
    keywords: seo?.keywords,
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: siteUrl,
      siteName: siteName,
      title: seo?.ogTitle || siteName,
      description: seo?.ogDescription || siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || siteName,
      description: seo?.ogDescription || siteDescription,
      images: [shareImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteSettings } = await fetchLayoutData();

  const brandName = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const phone = siteSettings?.phone || "400-123-4567";
  const siteUrl = getPublicSiteUrl();

  // 分享图片 URL（优先使用 Sanity 上传的图片，否则使用静态图片）
  const shareImageUrl = siteSettings?.defaultShareImage
    ? urlForImage(siteSettings.defaultShareImage as unknown as Parameters<typeof urlForImage>[0])
        .width(800)
        .height(800)
        .format("jpg")
        .url()
    : `${siteUrl}/images/share.png`;
  const shareImageType = siteSettings?.defaultShareImage
    ? "image/jpeg"
    : "image/png";

  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
      <head>
        {/* 子页面会覆盖父级 Open Graph 对象，因此在根布局统一输出分享图。 */}
        <WechatShareImageMeta
          image={shareImageUrl}
          type={shareImageType}
          alt={brandName}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <OrganizationJsonLd
          name={brandName}
          description={
            siteSettings?.description ||
            "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。"
          }
          phone={phone}
        />
        <SiteHeader siteSettings={siteSettings} />
        <div className="flex-1">{children}</div>
        <Footer siteSettings={siteSettings} />
        <DesktopWechatFloat siteSettings={siteSettings} />
        <MobileContactBar siteSettings={siteSettings} />
        {/* 移动端底部安全区 padding */}
        <div className="lg:hidden h-[72px]" />
      </body>
    </html>
  );
}

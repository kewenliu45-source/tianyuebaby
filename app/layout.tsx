import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { DesktopWechatFloat } from "@/components/layout/desktop-wechat-float";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { fetchLayoutData } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";
import { buildPageMetadata, getPublicSiteUrl } from "@/lib/social-metadata";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await fetchLayoutData();
  const seo = siteSettings?.defaultSeo;

  // 生成 favicon URL
  const faviconUrl = siteSettings?.favicon
    ? urlForImage(siteSettings.favicon as unknown as Parameters<typeof urlForImage>[0]).url()
    : undefined;

  // 网站名称和描述
  const siteName = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const siteDescription = siteSettings?.description || "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。";

  const siteUrl = getPublicSiteUrl();
  const metadata = buildPageMetadata({
    title: siteName,
    description: siteDescription,
    pathname: "/",
    seo,
    siteSettings,
  });

  return {
    ...metadata,
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteSettings?.siteName || "天悦宝贝"}`,
    },
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
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

  return (
    <html lang="zh-CN" className={cn("font-sans", geist.variable)}>
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

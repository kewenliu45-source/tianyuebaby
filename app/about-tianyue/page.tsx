import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, MessageCircle } from "lucide-react";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { PageBanner } from "@/components/shared/page-banner";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchAboutTianyuePageData } from "@/sanity/lib/fetchers";
import { iconImageUrl, contentImageUrl } from "@/sanity/lib/image";

// ── 最小化 SEO Fallback ──

const FALLBACK_SEO = {
  title: "走进天悦宝贝",
  description:
    "了解天悦宝贝（国际）助孕中心的品牌理念、团队实力和服务宗旨，选择值得信赖的助孕咨询服务伙伴。",
};

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { aboutTianyuePage: p, siteSettings } =
    await fetchAboutTianyuePageData();
  const seo = p?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || p?.pageTitle || FALLBACK_SEO.title,
    description:
      seo?.metaDescription || p?.pageDescription || FALLBACK_SEO.description,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || p?.pageTitle,
      description:
        seo?.ogDescription || seo?.metaDescription || p?.pageDescription,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

// ── Page Component ──

export const dynamic = "force-dynamic";

export default async function AboutTianyuePage() {
  const { siteSettings, aboutTianyuePage: p } =
    await fetchAboutTianyuePageData();

  // 使用 Sanity 数据，仅保留最小化 fallback
  const phone =
    p?.phone || siteSettings?.phone || "400-123-4567";
  const serviceHours =
    p?.serviceHours || siteSettings?.serviceHours || "周一至周日 9:00-18:00";
  const wechatQrCode = p?.wechatQrCode || siteSettings?.wechatQrCode;
  const consultationNote =
    p?.consultationNote ||
    "我们的专业顾问将为您提供一对一的咨询服务，帮助您了解助孕流程、评估个人情况、制定个性化方案。请放心，所有咨询内容将严格保密。";

  // 品牌介绍
  const brandTitle = p?.brandTitle || "走进天悦宝贝";
  const brandDescription = p?.brandDescription;
  const brandImageUrl = p?.brandImage?.image
    ? contentImageUrl(
        p.brandImage.image as unknown as Parameters<typeof contentImageUrl>[0]
      )
    : null;

  // 联系模块
  const contactTitle = p?.contactTitle || "联系我们";

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={p?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 品牌介绍 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {brandTitle}
              </h1>
              {brandDescription ? (
                brandDescription.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    天悦宝贝（国际）助孕中心是一家专注于助孕咨询服务的机构。我们秉承&ldquo;专业、贴心、科学、安全&rdquo;的服务理念，致力于为有需要的家庭提供高质量的助孕方案咨询与全程陪伴服务。
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    凭借多年的行业经验和广泛的资源网络，天悦宝贝已成为众多家庭信赖的选择。
                  </p>
                </>
              )}
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              {brandImageUrl ? (
                <Image
                  src={brandImageUrl}
                  alt={p?.brandImage?.alt || "天悦宝贝顾问团队"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  loading="lazy"
                />
              ) : (
                <Image
                  src="/images/site/care-team.png"
                  alt="天悦宝贝顾问团队"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 咨询联系 */}
      <section id="consultation" className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {contactTitle}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 左栏：联系信息 + 咨询说明 */}
              <div className="space-y-8">
                {/* 咨询说明 */}
                <div className="bg-white rounded-xl p-6 lg:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    咨询说明
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {consultationNote}
                  </p>
                </div>

                {/* 联系电话 */}
                <div className="bg-white rounded-xl p-6 lg:p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <PhoneConsultButton
                      phone={phone}
                      className="w-14 h-14 rounded-full bg-transparent text-primary"
                      iconClassName="w-7 h-7"
                      label=""
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    电话咨询
                  </h3>
                  <PhoneConsultButton
                    phone={phone}
                    className="text-xl font-bold text-primary hover:text-primary-hover transition-colors bg-transparent"
                    label={phone}
                  />
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{serviceHours}</span>
                  </div>
                </div>

                {/* 微信二维码 */}
                <div className="bg-white rounded-xl p-6 lg:p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    微信咨询
                  </h3>
                  {wechatQrCode ? (
                    <div className="w-44 h-44 mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={iconImageUrl(
                          wechatQrCode as unknown as Parameters<
                            typeof iconImageUrl
                          >[0]
                        )}
                        alt="微信二维码"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-44 h-44 mx-auto rounded-lg bg-white border border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        二维码占位
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-3">
                    扫码添加微信咨询
                  </p>
                </div>
              </div>

              {/* 右栏：咨询表单 */}
              <div id="consultation-form" className="scroll-mt-24 lg:scroll-mt-28">
                <ConsultationForm source="about-tianyue" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

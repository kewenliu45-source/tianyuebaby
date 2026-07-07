import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Award,
  Baby,
} from "lucide-react";
import { PageBanner } from "@/components/shared/page-banner";
import { ProfessionalHomeHero } from "@/components/home/professional-home-hero";
import { ProfessionalHomeSections } from "@/components/home/professional-home-sections";
import { HomeNewsSection } from "@/components/home/home-news-section";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { fetchHomePageData } from "@/sanity/lib/fetchers";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { contentImageUrl } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

// ── 最小化 SEO Fallback ──

const FALLBACK_SEO = {
  title: "天悦宝贝（国际）助孕中心",
  description:
    "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。",
};

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { homePage, siteSettings } = await fetchHomePageData();
  const seo = homePage?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || siteSettings?.siteName || FALLBACK_SEO.title,
    description:
      seo?.metaDescription ||
      siteSettings?.description ||
      FALLBACK_SEO.description,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || siteSettings?.siteName,
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        siteSettings?.description,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

// ── Icon 映射 ──

function getIcon(iconName?: string) {
  switch (iconName) {
    case "users":
      return <Users className="w-6 h-6" />;
    case "heart":
      return <Heart className="w-6 h-6" />;
    case "shield":
      return <Shield className="w-6 h-6" />;
    case "award":
      return <Award className="w-6 h-6" />;
    case "baby":
      return <Baby className="w-6 h-6" />;
    default:
      return <Heart className="w-6 h-6" />;
  }
}

function getColorClass(color?: string) {
  switch (color) {
    case "pink":
      return "bg-accent-pink text-pink-600";
    case "purple":
      return "bg-accent-purple text-purple-600";
    case "yellow":
      return "bg-accent-yellow text-yellow-600";
    case "green":
      return "bg-accent-green text-green-600";
    default:
      return "bg-primary/10 text-primary";
  }
}

// ── Page Component ──

export default async function HomePage() {
  const { siteSettings, homePage, newsArticles, faqItems } =
    await fetchHomePageData();

  const phone = siteSettings?.phone || "400-123-4567";

  // 数据：有则用，无则为空数组（不显示模块）
  const advantages = homePage?.advantages?.filter((a) => a.isEnabled !== false) || [];
  const journeySteps = homePage?.journeySteps?.filter((s) => s.isEnabled !== false) || [];
  const stats = homePage?.stats || [];

  // 模块可见性
  const visibility = homePage?.sectionVisibility;

  return (
    <>
      {faqItems.length > 0 && (
        <FaqJsonLd
          items={faqItems.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      )}

      {/* 专业首屏；仅在明确关闭新首屏时回退旧 Banner */}
      {homePage?.hero?.isEnabled === false ? (
        <PageBanner
          banners={homePage?.banners}
          defaultBanner={siteSettings?.defaultBanner}
        />
      ) : (
        <ProfessionalHomeHero
          hero={homePage?.hero}
          heroImage={homePage?.heroImage}
        />
      )}

      <ProfessionalHomeSections homePage={homePage} />

      {/* 品牌简介 — 左右分区 + 信息卡片 */}
      <section className="hidden relative py-16 lg:py-24 bg-[linear-gradient(135deg,#f8fbff_0%,#eef4fb_50%,#f6f9fe_100%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
            {/* ── 左侧：视觉 + 信息叠加卡（60%） ── */}
            <div className="lg:col-span-3 relative min-h-[420px] lg:min-h-[520px] rounded-2xl overflow-hidden">
              {/* 主图 */}
              {homePage?.brandIntroImage?.image ? (
                <Image
                  src={contentImageUrl(
                    homePage.brandIntroImage.image as unknown as Parameters<
                      typeof contentImageUrl
                    >[0]
                  )}
                  alt={homePage.brandIntroImage.alt || "品牌简介"}
                  fill
                  className="object-cover brightness-[0.88] contrast-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <Image
                  src="/images/site/clinic-reception.png"
                  alt="天悦宝贝品牌环境"
                  fill
                  className="object-cover brightness-[0.88] contrast-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
              )}
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,.95)_0%,rgba(255,255,255,.72)_40%,rgba(255,255,255,.18)_70%,transparent_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.6)_0%,transparent_50%)]" />

              {/* 信息卡片层 */}
              <div className="relative h-full flex items-end pb-6 px-5 lg:px-8">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-7 shadow-[0_8px_32px_rgba(40,95,160,.10)] ring-1 ring-blue-100/60">
                  <h3 className="text-[15px] lg:text-base font-bold text-[#173b68] leading-snug mb-5">
                    专业助孕咨询与家庭生育规划支持机构
                  </h3>
                  <div className="space-y-3.5">
                    {[
                      {
                        title: "个性化方案设计",
                        desc: "基于家庭情况提供定制化路径建议",
                      },
                      {
                        title: "全流程顾问支持",
                        desc: "从咨询到执行阶段持续跟进",
                      },
                      {
                        title: "隐私与安全保障",
                        desc: "信息加密管理与严格保密机制",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3475ed] text-white">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6.5L5 9L9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#173b68]">
                            {item.title}
                          </p>
                          <p className="text-xs text-[#5a6d8a]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 右侧：品牌故事 + 联系（40%） ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* 品牌故事卡片 */}
              <div className="flex-1 bg-white rounded-2xl p-6 lg:p-7 shadow-[0_4px_24px_rgba(40,95,160,.06)] ring-1 ring-blue-100/60">
                {homePage?.brandIntroTitle && (
                  <h2 className="text-xl lg:text-2xl font-bold text-[#173b68] mb-4">
                    {homePage.brandIntroTitle}
                  </h2>
                )}
                {homePage?.brandIntroContent ? (
                  homePage.brandIntroContent
                    .split("\n")
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-[#5a6d8a] leading-relaxed mb-3"
                      >
                        {para}
                      </p>
                    ))
                ) : (
                  <p className="text-sm text-[#5a6d8a] leading-relaxed">
                    天悦宝贝（国际）助孕中心是一家专注于助孕咨询服务的机构，致力于为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。
                  </p>
                )}
              </div>

              {/* 联系卡片 */}
              <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] rounded-2xl p-6 lg:p-7 text-white">
                <h3 className="text-lg font-bold mb-2">联系我们</h3>
                <p className="text-blue-200 text-sm mb-4">
                  专业顾问为您提供一对一咨询
                </p>
                <PhoneConsultButton
                  phone={phone}
                  className="text-2xl font-bold hover:text-blue-200 transition-colors bg-transparent"
                  iconClassName="w-5 h-5"
                  label={phone}
                />
                {siteSettings?.serviceHours && (
                  <p className="text-blue-200 text-sm mt-2">
                    {siteSettings.serviceHours}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心优势 — 有数据才显示 */}
      {visibility?.advantages !== false && advantages.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {homePage?.advantagesTitle && (
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                  {homePage.advantagesTitle}
                </h2>
              )}
              {homePage?.advantagesDescription && (
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {homePage.advantagesDescription}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advantages.map((advantage, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-6 ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        getColorClass(advantage.color)
                      )}
                    >
                      {getIcon(advantage.icon)}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {advantage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 助孕流程 — 有数据才显示 */}
      {visibility?.journey !== false && journeySteps.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {homePage?.journeyTitle && (
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
                  {homePage.journeyTitle}
                </h2>
              )}
              {homePage?.journeyDescription && (
                <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                  {homePage.journeyDescription}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {journeySteps.map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {step.stepNumber || i + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 服务数据 — 有数据才显示 */}
      {visibility?.stats !== false && stats.length > 0 && (
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] overflow-hidden">
          {homePage?.statsBackgroundImage?.image && (
            <Image
              src={contentImageUrl(
                homePage.statsBackgroundImage.image as unknown as Parameters<
                  typeof contentImageUrl
                >[0]
              )}
              alt={homePage.statsBackgroundImage.alt || ""}
              fill
              className="object-cover opacity-10"
              loading="lazy"
            />
          )}
          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {homePage?.statsTitle && (
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                  {homePage.statsTitle}
                </h2>
              )}
              {homePage?.statsDescription && (
                <p className="text-blue-200 text-center mb-12 max-w-2xl mx-auto">
                  {homePage.statsDescription}
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </p>
                    <p className="text-lg font-semibold text-blue-200 mb-1">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="text-sm text-blue-300">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {homePage?.statsButtonText && (
                <div className="text-center mt-10">
                  <Link
                    href={homePage.statsButtonLink || "#consultation"}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    {homePage.statsButtonText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 新闻资讯 — 有数据才显示 */}
      {visibility?.news !== false && newsArticles.length > 0 && (
        <HomeNewsSection
          featuredNews={homePage?.featuredNews}
          fallbackNews={newsArticles}
          newsTitle={homePage?.newsTitle}
        />
      )}

      {/* 常见问题 — 有数据才显示 */}
      {visibility?.faq !== false && faqItems.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {homePage?.faqTitle && (
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
                  {homePage.faqTitle}
                </h2>
              )}
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <details
                    key={i}
                    className="bg-white rounded-xl overflow-hidden group ring-1 ring-blue-100/60"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-foreground pr-4">
                        {item.question}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 咨询行动区 — 有数据才显示 */}
      {visibility?.cta !== false && homePage?.cta && (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {homePage.cta.title}
            </h2>
            {homePage.cta.description && (
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                {homePage.cta.description}
              </p>
            )}
            {homePage.cta.buttonText && (
              <Link
                href={homePage.cta.buttonLink || "#consultation"}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-primary shadow-lg hover:bg-blue-50 transition-colors"
              >
                {homePage.cta.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}

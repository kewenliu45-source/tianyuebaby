import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Award,
  Baby,
} from "lucide-react";
import { PageBanner } from "@/components/shared/page-banner";
import { CrispHomeHero } from "@/components/home/crisp-home-hero";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { fetchHomePageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, cardImageUrl } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { homePage, siteSettings } = await fetchHomePageData();
  const seo = homePage?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || undefined,
    description:
      seo?.metaDescription ||
      siteSettings?.description ||
      "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。",
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

export default async function HomePage() {
  const { siteSettings, homePage, newsArticles, faqItems } =
    await fetchHomePageData();

  const phone = siteSettings?.phone || "400-123-4567";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  // 默认数据
  const defaultAdvantages = [
    {
      title: "专业团队",
      description: "资深医疗顾问团队，提供一对一专业咨询",
      icon: "users",
      color: "pink" as const,
    },
    {
      title: "全程陪伴",
      description: "从咨询到完成，全程贴心陪伴服务",
      icon: "heart",
      color: "purple" as const,
    },
    {
      title: "安全保障",
      description: "严格筛选合作机构，确保服务安全可靠",
      icon: "shield",
      color: "yellow" as const,
    },
    {
      title: "高成功率",
      description: "丰富的成功经验，助力实现父母梦想",
      icon: "award",
      color: "green" as const,
    },
  ];

  const defaultJourneySteps = [
    { title: "初步咨询", description: "了解需求，解答疑问", stepNumber: 1 },
    { title: "方案制定", description: "个性化方案设计", stepNumber: 2 },
    { title: "资源匹配", description: "精准匹配优质资源", stepNumber: 3 },
    { title: "全程服务", description: "专业团队全程陪伴", stepNumber: 4 },
    { title: "后续支持", description: "持续关怀与支持", stepNumber: 5 },
  ];

  const defaultStats = [
    { value: "10+", label: "年行业经验" },
    { value: "1000+", label: "成功案例" },
    { value: "98%", label: "客户满意度" },
    { value: "24h", label: "全程服务" },
  ];

  const advantages = homePage?.advantages || defaultAdvantages;
  const journeySteps = homePage?.journeySteps || defaultJourneySteps;
  const stats = homePage?.stats || defaultStats;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-6 h-6" />;
      case "heart":
        return <Heart className="w-6 h-6" />;
      case "shield":
        return <Shield className="w-6 h-6" />;
      case "award":
        return <Award className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  const getColorClass = (color?: string) => {
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
  };

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

      {/* 首屏 Hero — 优先 Sanity heroImage，无则走 banner 轮播 */}
      {homePage?.heroImage?.image ? (
        <CrispHomeHero heroImage={homePage.heroImage} />
      ) : (
        <PageBanner
          banners={homePage?.banners}
          defaultBanner={siteSettings?.defaultBanner}
        />
      )}

      {/* 品牌简介 — 左右分区 + 信息卡片 */}
      <section className="relative py-16 lg:py-24 bg-[linear-gradient(135deg,#f8fbff_0%,#eef4fb_50%,#f6f9fe_100%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">

            {/* ── 左侧：视觉 + 信息叠加卡（60%） ── */}
            <div className="lg:col-span-3 relative min-h-[420px] lg:min-h-[520px] rounded-2xl overflow-hidden">
              {/* 主图 — 弱化存在感 */}
              {homePage?.brandIntroImage?.image ? (
                <Image
                  src={contentImageUrl(homePage.brandIntroImage.image as unknown as Parameters<typeof contentImageUrl>[0])}
                  alt={homePage.brandIntroImage.alt || "品牌简介"}
                  fill
                  className="object-cover brightness-[0.88] contrast-[0.92]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100" />
              )}
              {/* 渐变遮罩：白 → 透明，从底部向上 */}
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
                      { title: "个性化方案设计", desc: "基于家庭情况提供定制化路径建议" },
                      { title: "全流程顾问支持", desc: "从咨询到执行阶段持续跟进" },
                      { title: "隐私与安全保障", desc: "信息加密管理与严格保密机制" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3475ed] text-white">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-[#1a2e52]">{item.title}</p>
                          <p className="text-[12px] text-[#5a6d8a] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] text-[#8a9bb5] leading-relaxed">
                    服务覆盖多类家庭生育规划咨询支持
                  </p>
                  <Link
                    href="/journey"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3475ed] hover:text-[#2365dc] transition-colors"
                  >
                    了解完整服务流程
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── 右侧：品牌说明区（40%） ── */}
            <div className="lg:col-span-2 flex flex-col justify-center py-2">
              <h2 className="text-2xl lg:text-[1.75rem] font-bold text-[#173b68] mb-8 leading-tight">
                {homePage?.brandIntroTitle || "天悦宝贝（国际）助孕中心"}
              </h2>
              <div className="space-y-5">
                <div className="pl-4 border-l-[3px] border-[#3475ed]">
                  <p className="text-[15px] text-[#2c3e5a] leading-[1.8]">
                    我们专注于为有生育规划需求的家庭提供专业咨询与路径支持服务。
                  </p>
                </div>
                <div className="pl-4 border-l-[3px] border-[#a3c4f3]">
                  <p className="text-[15px] text-[#2c3e5a] leading-[1.8]">
                    通过系统化评估与个性化方案设计，帮助家庭明确可行路径与阶段规划。
                  </p>
                </div>
                <div className="pl-4 border-l-[3px] border-[#d4e4f7]">
                  <p className="text-[15px] text-[#5a6d8a] leading-[1.8]">
                    所有服务以咨询与规划支持为核心，不替代医疗行为，强调合规与隐私保护。
                  </p>
                </div>
              </div>
              {/* 底部信任标签 */}
              <div className="mt-8 flex flex-wrap gap-2">
                {["合规运营", "隐私保护", "个性化服务", "全程陪伴"].map((tag) => (
                  <span key={tag} className="inline-block rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#4b6fa8] shadow-sm ring-1 ring-blue-100/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 第三代试管服务介绍 */}
      {(homePage?.ivfTitle || homePage?.ivfDescription) && (
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {homePage?.ivfTitle || "第三代试管婴儿技术"}
              </h2>
              {homePage?.ivfDescription && (
                <p className="text-muted-foreground leading-relaxed">
                  {homePage.ivfDescription}
                </p>
              )}
            </div>
            {homePage?.ivfFeatures && homePage.ivfFeatures.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {homePage.ivfFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Baby className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 核心优势 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {homePage?.advantagesTitle || "为什么选择我们"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4",
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
      </section>

      {/* 助孕流程 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {homePage?.journeyTitle || "助孕流程"}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {journeySteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                    {step.stepNumber || index + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
              >
                了解完整流程
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 服务数据 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {homePage?.statsTitle || "我们的成绩"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 新闻推荐 */}
      {newsArticles.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {homePage?.newsTitle || "新闻资讯"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/news/${article.slug.current}`}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.coverImage?.image ? (
                    <div className="relative aspect-video">
                      <Image
                        src={cardImageUrl(article.coverImage.image as unknown as Parameters<typeof cardImageUrl>[0])}
                        alt={article.coverImage.alt || article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
              >
                查看更多新闻
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 常见问题精选 */}
      {faqItems.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {homePage?.faqTitle || "常见问题"}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-muted rounded-xl p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
              >
                查看更多问题
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 咨询行动区 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {homePage?.cta?.title || "准备好开始了吗？"}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {homePage?.cta?.description ||
              "联系我们，获取专业的助孕咨询服务，让我们帮助您实现拥有宝宝的梦想。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              电话咨询
            </a>
            <Link
              href={homePage?.cta?.buttonLink || "/start-your-journey"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {homePage?.cta?.buttonText || "开始咨询"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

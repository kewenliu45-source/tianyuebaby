import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Globe,
  ClipboardCheck,
  Users,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { NewsList } from "@/components/shared/news-list";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchNewsListPageData } from "@/sanity/lib/fetchers";
import { bannerImageUrl, contentImageUrl } from "@/sanity/lib/image";
import type { ImageWithAlt } from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_TITLE = "新闻资讯 | 天悦宝贝";
const DEFAULT_DESC =
  "了解最新的辅助生殖资讯、行业动态与专业知识，帮助您做出知情决策。";

// ── 默认品牌历程 ──

const DEFAULT_TIMELINE = [
  {
    year: "品牌服务体系建立",
    title: "专注辅助生殖咨询",
    description: "建立标准化咨询流程，涵盖前期评估、方案分析与资源匹配",
    icon: "award",
    image: undefined,
  },
  {
    year: "海外资源拓展",
    title: "全球合作网络",
    description: "与多个国家和地区的合作医疗机构建立长期合作关系",
    icon: "globe",
    image: undefined,
  },
  {
    year: "咨询流程标准化",
    title: "专业流程规范",
    description: "制定咨询流程规范，确保每位客户获得专业、一致的服务体验",
    icon: "clipboard",
    image: undefined,
  },
  {
    year: "多学科顾问服务完善",
    title: "顾问团队升级",
    description: "引入多学科背景顾问，提供更全面的方案评估与支持",
    icon: "users",
    image: undefined,
  },
  {
    year: "数字化咨询体验升级",
    title: "线上服务优化",
    description: "优化线上咨询工具与沟通渠道，提升远程服务体验",
    icon: "smartphone",
    image: undefined,
  },
];

// ── 默认品牌沉淀 ──

const DEFAULT_BRAND = {
  title: "多年辅助生殖咨询服务积累",
  subtitle: "专业、合规、隐私保护",
  description:
    "天悦宝贝深耕辅助生殖咨询领域，积累了丰富的服务经验。我们致力于为每个家庭提供专业、合规、保密的咨询服务，陪伴家庭在充分了解信息的基础上做出知情选择。",
};

// ── 默认咨询区 ──

const DEFAULT_CONSULTATION = {
  title: "天悦宝贝顾问在线答疑",
  description:
    "专业顾问为您提供一对一咨询服务，帮助您了解方案、评估适用性。咨询过程完全保密。",
};

// ── 辅助函数 ──

function getImageUrl(
  img: ImageWithAlt | undefined,
  type: "banner" | "content" = "banner"
): string | null {
  if (!img?.image) return null;
  const src = img.image as unknown as Parameters<typeof bannerImageUrl>[0];
  return type === "banner" ? bannerImageUrl(src) : contentImageUrl(src);
}

function getTimelineIcon(iconName?: string) {
  switch (iconName) {
    case "award":
      return <Award className="w-5 h-5" />;
    case "globe":
      return <Globe className="w-5 h-5" />;
    case "clipboard":
      return <ClipboardCheck className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "smartphone":
      return <Smartphone className="w-5 h-5" />;
    default:
      return <Award className="w-5 h-5" />;
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings, newsPage } = await fetchNewsListPageData();
  const seo = newsPage?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || newsPage?.pageTitle || DEFAULT_TITLE,
    description:
      seo?.metaDescription || newsPage?.pageDescription || DEFAULT_DESC,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || newsPage?.pageTitle,
      description:
        seo?.ogDescription || seo?.metaDescription || newsPage?.pageDescription,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

// ── Page Component ──

export default async function NewsPage() {
  const { siteSettings, newsPage, newsArticles, categories, pinnedArticles } =
    await fetchNewsListPageData();

  // 合并 CMS 与默认值
  const hero = {
    title: newsPage?.heroTitle || "新闻资讯",
    subtitle:
      newsPage?.heroSubtitle ||
      "辅助生殖资讯、行业动态与专业科普",
    description:
      newsPage?.heroDescription ||
      "了解最新的辅助生殖行业动态、政策变化与专业知识，帮助您在咨询过程中做出更充分的知情决策。",
    primaryButtonText: newsPage?.heroPrimaryButtonText || "浏览最新资讯",
    primaryButtonLink: newsPage?.heroPrimaryButtonLink || "#news-list",
  };

  const heroImageUrl = getImageUrl(newsPage?.heroImage, "banner");
  const breadcrumbLabel = newsPage?.breadcrumbCurrentLabel || "新闻资讯";

  const timelineTitle =
    newsPage?.timelineTitle || "天悦宝贝发展历程";
  const timelineDescription =
    newsPage?.timelineDescription ||
    "持续深耕辅助生殖咨询领域，不断优化服务体系与客户体验";
  const timelineItems = newsPage?.timelineItems?.length
    ? newsPage.timelineItems.map((item) => ({
        ...item,
        icon: undefined as string | undefined,
      }))
    : DEFAULT_TIMELINE;

  const brand = {
    title: newsPage?.brandSectionTitle || DEFAULT_BRAND.title,
    subtitle: newsPage?.brandSectionSubtitle || DEFAULT_BRAND.subtitle,
    description: newsPage?.brandSectionDescription || DEFAULT_BRAND.description,
  };
  const brandBgUrl = getImageUrl(
    newsPage?.brandSectionBackgroundImage,
    "banner"
  );

  const consultation = {
    title: newsPage?.consultationTitle || DEFAULT_CONSULTATION.title,
    description:
      newsPage?.consultationDescription || DEFAULT_CONSULTATION.description,
  };
  const consultationBgUrl = getImageUrl(
    newsPage?.consultationBackgroundImage,
    "banner"
  );

  return (
    <>
      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={newsPage?.heroImage?.alt || hero.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fe] via-white to-[#f0f6ff]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548]/85 via-[#1a3a6b]/75 to-[#1a3a6b]/60" />

        <div
          className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 py-12 lg:py-16 flex flex-col justify-center"
          style={{ minHeight: 420 }}
        >
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/90 font-medium">{breadcrumbLabel}</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight mb-3">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 mb-2">{hero.subtitle}</p>
            <p className="text-[15px] text-white/70 leading-relaxed mb-6">
              {hero.description}
            </p>
            <Link
              href={hero.primaryButtonLink}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
            >
              {hero.primaryButtonText}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 品牌历程 / 时间轴
      ════════════════════════════════════════ */}
      <section className="bg-white py-12 lg:py-16 border-b border-blue-100/60">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#173b68] mb-2">
              {timelineTitle}
            </h2>
            <p className="text-sm text-[#5a6d8a] max-w-xl mx-auto">
              {timelineDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {timelineItems.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3 text-[#2563eb]">
                  {item.image?.image ? (
                    <div className="relative w-8 h-8">
                      <Image
                        src={contentImageUrl(
                          item.image.image as unknown as Parameters<
                            typeof contentImageUrl
                          >[0]
                        )}
                        alt={item.image.alt || item.year || ""}
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    getTimelineIcon(item.icon)
                  )}
                </div>
                {item.year && (
                  <p className="text-sm font-bold text-[#2563eb] mb-1">
                    {item.year}
                  </p>
                )}
                {item.title && (
                  <p className="text-sm font-semibold text-[#173b68] mb-1">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs text-[#8a9bb5] leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 新闻列表
      ════════════════════════════════════════ */}
      <div id="news-list">
        <NewsList
          articles={newsArticles}
          pinnedArticles={pinnedArticles}
          categories={categories}
          newsPage={newsPage}
        />
      </div>

      {/* ════════════════════════════════════════
          4. 品牌沉淀区
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        {brandBgUrl ? (
          <Image
            src={brandBgUrl}
            alt={newsPage?.brandSectionBackgroundImage?.alt || ""}
            fill
            className="object-cover"
            loading="lazy"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f6ff] via-[#e8f0fe] to-[#dbeafe]" />
        )}
        <div className="absolute inset-0 bg-white/70" />

        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-2">
            {brand.title}
          </h2>
          <p className="text-lg text-[#2563eb] font-medium mb-4">
            {brand.subtitle}
          </p>
          <p className="text-[15px] text-[#5a6d8a] leading-relaxed max-w-2xl mx-auto">
            {brand.description}
          </p>

          {/* 数据亮点 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {[
              { value: "多年", label: "行业服务经验" },
              { value: "多地", label: "合作医疗资源" },
              { value: "一对一", label: "专属顾问陪伴" },
              { value: "24h", label: "咨询响应时效" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/80 rounded-xl p-5 ring-1 ring-blue-100/60"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#2563eb] mb-1">
                  {item.value}
                </p>
                <p className="text-sm text-[#5a6d8a]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. 在线咨询 CTA
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        {consultationBgUrl ? (
          <Image
            src={consultationBgUrl}
            alt={newsPage?.consultationBackgroundImage?.alt || ""}
            fill
            className="object-cover"
            loading="lazy"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2548] via-[#1a3a6b] to-[#2563eb]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,.08),transparent_60%)]" />

        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {consultation.title}
              </h2>
              <p className="text-blue-200 leading-relaxed">
                {consultation.description}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-xl">
              <ConsultationForm source="news" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Calendar,
  MessageCircle,
  ExternalLink,
  MapPin,
  Award,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchSuccessCasesPageData } from "@/sanity/lib/fetchers";
import { cardImageUrl, bannerImageUrl, contentImageUrl } from "@/sanity/lib/image";
import type { SuccessCasesPage, SuccessCase, ImageWithAlt } from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "成功案例与家庭故事 | 天悦宝贝",
  description:
    "天悦宝贝去隐私化案例参考，分享专业咨询服务经验与家庭故事。了解真实的方案评估与流程陪伴案例，结果因人而异，仅供参考。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "成功案例与家庭故事",
  subtitle:
    "去隐私化案例参考 · 专业咨询陪伴 · 结果因人而异",
  description:
    "以下案例仅供参考，已做去隐私化处理，不构成任何医疗承诺。每个家庭的情况不同，实际效果需由专业医生根据个人状况进行评估。天悦宝贝提供的是咨询服务、方案评估与流程陪伴，帮助您在充分了解信息的基础上做出知情决策。",
  primaryButtonText: "咨询详情",
  primaryButtonLink: "#consultation",
};

// ── 默认时间线 ──

const DEFAULT_TIMELINE = [
  {
    year: "品牌成立",
    title: "专注辅助生殖咨询",
    description: "天悦宝贝正式成立，为有需求的家庭提供专业、保密的咨询服务",
  },
  {
    year: "体系完善",
    title: "咨询服务体系建立",
    description: "建立标准化咨询流程，涵盖前期评估、方案分析与资源匹配",
  },
  {
    year: "资源拓展",
    title: "海外合作资源拓展",
    description: "与多个国家和地区的合作医疗机构建立长期合作关系",
  },
  {
    year: "团队升级",
    title: "顾问团队专业升级",
    description: "顾问团队持续培训与专业能力提升，提供更精准的方案评估",
  },
  {
    year: "案例沉淀",
    title: "案例体系持续积累",
    description: "形成系统化的案例管理与经验总结，为后续客户提供参考",
  },
  {
    year: "服务深化",
    title: "全流程陪伴服务",
    description: "从咨询到流程跟进，提供更完善的全程陪伴与支持服务",
  },
];

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  title: "成功案例咨询",
  description:
    "专业顾问为您提供助孕咨询服务、方案评估与流程陪伴，帮助您了解方案、评估适用性。以下案例仅供参考，结果因人而异。",
  primaryButtonText: "在线咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#consultation",
  phone: "400-xxx-xxxx",
};

// ── 默认热门案例 ──

const DEFAULT_HOT_CASES = [
  { title: "高龄备孕家庭的方案评估与咨询", slug: "" },
  { title: "多次试管失败后的方案重新评估", slug: "" },
  { title: "有遗传病风险家庭的胚胎检测咨询", slug: "" },
  { title: "职业女性的冻卵方案咨询", slug: "" },
  { title: "海外辅助生殖方案咨询", slug: "" },
];

// ── 默认 CTA ──

const DEFAULT_CTA = {
  title: "开始了解适合您的方案",
  description:
    "每一个家庭的情况都是独特的。专业的咨询顾问随时为您服务，帮助您更清晰地了解方案选择，做出适合自己的知情决策。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#consultation",
};

// ── 辅助函数 ──

function getImageUrl(
  img: ImageWithAlt | undefined,
  type: "card" | "banner" | "content" = "card"
): string | null {
  if (!img?.image) return null;
  const src = img.image as unknown as Parameters<typeof cardImageUrl>[0];
  if (type === "banner") return bannerImageUrl(src);
  if (type === "content") return contentImageUrl(src);
  return cardImageUrl(src);
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("zh-CN");
  } catch {
    return "";
  }
}

// ── 默认案例 ──

const DEFAULT_CASES: Partial<SuccessCase>[] = [
  {
    title: "高龄备孕家庭的方案评估与咨询",
    excerpt:
      "一对 40 岁出头的夫妻，经过多次自然受孕未果，通过咨询了解了三代试管的适用性与流程。顾问帮助整理了既往检查资料，并匹配了适合的医疗资源进行进一步评估。案例仅供参考，结果因人而异。",
    clientProfile: "高龄备孕家庭",
    serviceType: "三代试管",
    publishedAt: "2025-01-15",
    tags: ["高龄", "方案评估", "案例参考"],
  },
  {
    title: "多次试管失败后的方案重新评估",
    excerpt:
      "家庭曾有辅助生殖经历但未达预期，希望重新评估方案选择。通过系统梳理既往资料，顾问提供了不同角度的方案分析与建议，帮助家庭了解新的可能性。案例仅供参考，结果因人而异。",
    clientProfile: "多次尝试后寻求新方案",
    serviceType: "方案评估",
    publishedAt: "2025-01-10",
    tags: ["方案评估", "重新规划", "案例参考"],
  },
  {
    title: "初次了解辅助生殖的家庭咨询",
    excerpt:
      "对辅助生殖技术不了解的家庭，通过咨询系统学习了相关知识。顾问详细讲解了技术原理、适用范围与注意事项，帮助家庭做出知情决策。案例仅供参考，结果因人而异。",
    clientProfile: "初次咨询家庭",
    serviceType: "咨询服务",
    publishedAt: "2025-01-05",
    tags: ["初次咨询", "知识了解", "案例参考"],
  },
  {
    title: "有遗传病风险家庭的胚胎检测咨询",
    excerpt:
      "夫妻双方携带已知遗传病基因，希望通过辅助生殖技术避免遗传给下一代。顾问帮助了解了 PGT 胚胎植入前遗传学检测的适用范围、合法合规地区与流程。案例仅供参考，结果因人而异。",
    clientProfile: "有遗传病风险家庭",
    serviceType: "遗传咨询",
    publishedAt: "2024-12-20",
    tags: ["遗传病", "PGT检测", "案例参考"],
  },
  {
    title: "卵巢功能下降家庭的生育力评估",
    excerpt:
      "女方 AMH 值偏低，卵巢储备功能下降，希望了解可行的方案选择。顾问协助整理检查资料，匹配适合的医疗资源进行进一步评估。案例仅供参考，结果因人而异。",
    clientProfile: "卵巢功能下降",
    serviceType: "生育力评估",
    publishedAt: "2024-12-15",
    tags: ["卵巢功能", "生育力评估", "案例参考"],
  },
  {
    title: "职业女性的冻卵方案咨询",
    excerpt:
      "目前暂无生育计划的职业女性，希望了解冻卵保存生育力的可能性。顾问详细介绍了冻卵流程、适用条件、费用构成及海外方案对比。案例仅供参考，结果因人而异。",
    clientProfile: "职业规划期女性",
    serviceType: "冻卵咨询",
    publishedAt: "2024-12-10",
    tags: ["冻卵", "生育力保存", "案例参考"],
  },
  {
    title: "希望了解海外辅助生殖方案的家庭",
    excerpt:
      "家庭希望了解海外合法合规地区的辅助生殖方案。顾问梳理了不同国家和地区的法律政策、医疗资源与费用对比，帮助家庭做出知情选择。案例仅供参考，结果因人而异。",
    clientProfile: "海外方案咨询",
    serviceType: "海外咨询",
    publishedAt: "2024-12-05",
    tags: ["海外方案", "合法合规", "案例参考"],
  },
  {
    title: "双胎方案的风险评估与咨询",
    excerpt:
      "家庭希望通过一次移植实现双胎，顾问详细介绍了双胎妊娠的医学风险与各国医疗团队的不同策略，帮助家庭客观了解利弊后做出决定。案例仅供参考，结果因人而异。",
    clientProfile: "双胎需求家庭",
    serviceType: "方案评估",
    publishedAt: "2024-11-28",
    tags: ["双胎方案", "风险评估", "案例参考"],
  },
  {
    title: "高龄夫妻的个性化生育规划",
    excerpt:
      "一对 38 岁的夫妻，希望在有限时间内制定合理的生育规划。顾问根据双方身体状况、年龄和需求，提供了个性化的方案评估与时间规划建议。案例仅供参考，结果因人而异。",
    clientProfile: "高龄备孕夫妻",
    serviceType: "个性化规划",
    publishedAt: "2024-11-20",
    tags: ["高龄", "个性化规划", "案例参考"],
  },
  {
    title: "化疗前的生育力保存咨询",
    excerpt:
      "即将接受化疗治疗的患者，希望在治疗前了解生育力保存的可能性。顾问协助安排紧急评估，帮助了解冻卵或冻精的适用性与时间安排。案例仅供参考，结果因人而异。",
    clientProfile: "化疗前生育力保存",
    serviceType: "生育力保存",
    publishedAt: "2024-11-15",
    tags: ["生育力保存", "紧急评估", "案例参考"],
  },
];

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { successCasesPage: p, siteSettings } =
    await fetchSuccessCasesPageData();
  const seo = p?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || p?.pageTitle || DEFAULT_SEO.title,
    description:
      seo?.metaDescription || p?.pageDescription || DEFAULT_SEO.description,
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

export default async function SuccessCasesPage() {
  const {
    siteSettings,
    successCasesPage: p,
    successCases,
    featuredSuccessCases,
  } = await fetchSuccessCasesPageData();

  // 合并 CMS 数据与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText:
      p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink:
      p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
  };

  const timelineItems = p?.timelineItems?.length
    ? p.timelineItems
    : DEFAULT_TIMELINE;
  const timelineTitle = p?.timelineTitle || "天悦宝贝发展历程";

  const sidebar = {
    title: p?.sidebarTitle || DEFAULT_SIDEBAR.title,
    description: p?.sidebarDescription || DEFAULT_SIDEBAR.description,
    primaryButtonText:
      p?.sidebarPrimaryButtonText || DEFAULT_SIDEBAR.primaryButtonText,
    primaryButtonLink:
      p?.sidebarPrimaryButtonLink || DEFAULT_SIDEBAR.primaryButtonLink,
    secondaryButtonText: DEFAULT_SIDEBAR.secondaryButtonText,
    secondaryButtonLink: DEFAULT_SIDEBAR.secondaryButtonLink,
    phone: p?.sidebarPhone || DEFAULT_SIDEBAR.phone,
  };

  const finalCta = {
    title: p?.finalCtaTitle || DEFAULT_CTA.title,
    description: p?.finalCtaDescription || DEFAULT_CTA.description,
    primaryButtonText:
      p?.finalCtaPrimaryButtonText || DEFAULT_CTA.primaryButtonText,
    primaryButtonLink:
      p?.finalCtaPrimaryButtonLink || DEFAULT_CTA.primaryButtonLink,
    secondaryButtonText: DEFAULT_CTA.secondaryButtonText,
    secondaryButtonLink: DEFAULT_CTA.secondaryButtonLink,
  };

  const heroImageUrl = getImageUrl(p?.heroImage, "banner");
  const ctaBgUrl = getImageUrl(p?.finalCtaBackgroundImage, "banner");

  // 案例数据：CMS 有数据用 CMS，否则用默认
  const cases = successCases.length > 0 ? successCases : DEFAULT_CASES;
  const featured =
    featuredSuccessCases.length > 0 ? featuredSuccessCases : [];

  const hotLinks = p?.sidebarHotLinks?.length
    ? p.sidebarHotLinks
    : [
        { title: "三代试管婴儿", href: "/third-generation-ivf" },
        { title: "冻卵/冻精", href: "/egg-sperm-freezing" },
        { title: "私人订制", href: "/private-customization" },
      ];

  const relatedLinks = p?.sidebarRelatedLinks?.length
    ? p.sidebarRelatedLinks
    : [
        { title: "助孕流程", href: "/journey" },
        { title: "关于准父母", href: "/intended-parents" },
        { title: "为什么选择我们", href: "/why-us" },
      ];

  return (
    <>
      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={p?.heroImage?.alt || hero.title}
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
          className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 py-16 lg:py-20 flex flex-col justify-center"
          style={{ minHeight: 500 }}
        >
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium">成功案例</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 mb-3">{hero.subtitle}</p>
            <p className="text-[15px] text-white/70 leading-relaxed mb-8">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {hero.primaryButtonText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 品牌历程 / 时间轴模块
      ════════════════════════════════════════ */}
      <section className="bg-white py-12 lg:py-16 border-b border-blue-100/60">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173b68] mb-8 text-center">
            {timelineTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {timelineItems.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  {i === 0 && <Award className="w-6 h-6 text-[#2563eb]" />}
                  {i === 1 && <CheckCircle2 className="w-6 h-6 text-[#2563eb]" />}
                  {i === 2 && <MapPin className="w-6 h-6 text-[#2563eb]" />}
                  {i === 3 && <Users className="w-6 h-6 text-[#2563eb]" />}
                  {i === 4 && <Award className="w-6 h-6 text-[#2563eb]" />}
                  {i === 5 && <Clock className="w-6 h-6 text-[#2563eb]" />}
                  {i > 5 && (
                    <CheckCircle2 className="w-6 h-6 text-[#2563eb]" />
                  )}
                </div>
                <p className="text-xl font-bold text-[#2563eb] mb-1">
                  {item.year}
                </p>
                <p className="text-sm font-semibold text-[#173b68] mb-1">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 主体：左侧案例列表 + 右侧 Sidebar
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-12 lg:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
              {p?.listTitle || "成功案例"}
            </h2>
            <p className="text-[#5a6d8a] pl-4">
              {p?.listDescription ||
                "以下案例仅供参考，已做去隐私化处理，不构成任何承诺。每个人的情况不同，实际效果需由医生根据个人状况评估。"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* 左侧案例列表 */}
            <main>
              {cases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#8a9bb5]">暂无案例数据</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cases.map((item, i) => {
                    const isCmsCase = "slug" in item && item.slug;
                    const coverUrl = "coverImage" in item ? getImageUrl(item.coverImage, "card") : null;
                    const title = item.title || "咨询案例";
                    const excerpt = item.excerpt || "";
                    const date = formatDate(item.publishedAt);
                    const serviceType =
                      "serviceType" in item ? item.serviceType : undefined;
                    const clientProfile =
                      "clientProfile" in item ? item.clientProfile : undefined;
                    const tags = "tags" in item ? item.tags : undefined;

                    const cardContent = (
                      <div className="bg-white rounded-xl overflow-hidden ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow flex flex-col md:flex-row">
                        {/* 封面图 */}
                        {coverUrl ? (
                          <div className="relative w-full md:w-64 shrink-0 aspect-[4/3] md:aspect-auto">
                            <Image
                              src={coverUrl}
                              alt={
                                ("coverImage" in item && item.coverImage?.alt) ||
                                title
                              }
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 256px"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-full md:w-64 shrink-0 aspect-[4/3] md:aspect-auto bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                            <Award className="w-12 h-12 text-[#2563eb]/30" />
                          </div>
                        )}

                        {/* 内容 */}
                        <div className="p-5 flex-1 flex flex-col">
                          {/* 标签 */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {serviceType && (
                              <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#2563eb] font-medium">
                                {serviceType}
                              </span>
                            )}
                            {clientProfile && (
                              <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-50 text-[#8a9bb5] font-medium">
                                {clientProfile}
                              </span>
                            )}
                            {tags &&
                              tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block text-xs px-2.5 py-1 rounded-full bg-gray-50 text-[#8a9bb5]"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>

                          <h3 className="text-lg font-semibold text-[#173b68] mb-2 line-clamp-2">
                            {title}
                          </h3>
                          {excerpt && (
                            <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3 line-clamp-3">
                              {excerpt}
                            </p>
                          )}

                          <div className="mt-auto flex items-center justify-between">
                            {date && (
                              <span className="text-xs text-[#8a9bb5] flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {date}
                              </span>
                            )}
                            {isCmsCase && (
                              <span className="text-xs font-semibold text-[#2563eb] flex items-center gap-1">
                                查看详情
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );

                    if (isCmsCase) {
                      return (
                        <Link
                          key={i}
                          href={`/success-cases/${(item as SuccessCase).slug.current}`}
                        >
                          {cardContent}
                        </Link>
                      );
                    }

                    return <div key={i}>{cardContent}</div>;
                  })}
                </div>
              )}
            </main>

            {/* 右侧 Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* 咨询表单 */}
                <div id="consultation">
                  <ConsultationForm source="success-cases" />
                </div>

                {/* 快速联系 */}
                <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-3">
                    {sidebar.title}
                  </h3>
                  <p className="text-sm text-[#5a6d8a] mb-4">
                    {sidebar.description}
                  </p>
                  <div className="space-y-3">
                    <Link
                      href={sidebar.primaryButtonLink}
                      className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {sidebar.primaryButtonText}
                    </Link>
                    <Link
                      href={sidebar.secondaryButtonLink}
                      className="flex items-center gap-2 w-full justify-center rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {sidebar.secondaryButtonText}
                    </Link>
                  </div>
                  {sidebar.phone && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6d8a]">
                      <Phone className="w-4 h-4 text-[#2563eb]" />
                      <span>咨询热线：{sidebar.phone}</span>
                    </div>
                  )}
                </div>

                {/* 热门案例 */}
                <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-3">
                    热门案例
                  </h3>
                  <ul className="space-y-3">
                    {featured.length > 0
                      ? featured.slice(0, 5).map((item) => (
                          <li key={item._id}>
                            <Link
                              href={`/success-cases/${item.slug.current}`}
                              className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                            >
                              <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0" />
                              <span className="line-clamp-2">{item.title}</span>
                            </Link>
                          </li>
                        ))
                      : DEFAULT_HOT_CASES.map((item, i) => (
                          <li key={i}>
                            <span className="flex items-start gap-2 text-sm text-[#5a6d8a]">
                              <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0" />
                              <span className="line-clamp-2">{item.title}</span>
                            </span>
                          </li>
                        ))}
                  </ul>
                </div>

                {/* 热门服务 */}
                <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-3">
                    热门服务
                  </h3>
                  <ul className="space-y-2.5">
                    {hotLinks.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 mt-1 shrink-0" />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 相关推荐 */}
                <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-3">
                    相关推荐
                  </h3>
                  <ul className="space-y-2.5">
                    {relatedLinks.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0" />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端 Sidebar */}
      <section className="lg:hidden bg-white py-12">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="space-y-6">
            <div id="consultation-mobile">
              <ConsultationForm source="success-cases" />
            </div>

            <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
              <h3 className="text-base font-semibold text-[#173b68] mb-3">
                {sidebar.title}
              </h3>
              <p className="text-sm text-[#5a6d8a] mb-4">
                {sidebar.description}
              </p>
              <div className="space-y-3">
                <Link
                  href={sidebar.primaryButtonLink}
                  className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {sidebar.primaryButtonText}
                </Link>
                <Link
                  href={sidebar.secondaryButtonLink}
                  className="flex items-center gap-2 w-full justify-center rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  {sidebar.secondaryButtonText}
                </Link>
              </div>
              {sidebar.phone && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6d8a]">
                  <Phone className="w-4 h-4 text-[#2563eb]" />
                  <span>咨询热线：{sidebar.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 底部咨询 CTA
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        {ctaBgUrl && (
          <Image
            src={ctaBgUrl}
            alt={p?.finalCtaBackgroundImage?.alt || ""}
            fill
            className="object-cover opacity-10"
            loading="lazy"
          />
        )}
        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {finalCta.title}
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            {finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={finalCta.primaryButtonLink}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {finalCta.primaryButtonText}
            </Link>
            <Link
              href={finalCta.secondaryButtonLink}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {finalCta.secondaryButtonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

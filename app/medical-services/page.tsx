import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  Shield,
  Award,
  Heart,
  Stethoscope,
  ClipboardList,
  HelpCircle,
  CheckCircle2,
  Building2,
  Clock,
  Snowflake,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchMedicalServicesPageData } from "@/sanity/lib/fetchers";
import { bannerImageUrl, contentImageUrl } from "@/sanity/lib/image";
import type {
  MedicalServicesPage,
  ImageWithAlt,
} from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "医疗服务与海外生殖医疗资源对接 | 天悦宝贝",
  description:
    "天悦宝贝提供医疗服务、辅助生殖咨询、医学评估、海外医疗资源对接与试管流程陪伴，帮助家庭在充分了解信息的基础上做出知情决策。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "医疗服务与海外生殖医疗资源对接",
  subtitle: "专业评估 · 资源匹配 · 流程陪伴",
  description:
    "天悦宝贝为有需求的家庭提供辅助生殖相关的专业咨询服务，包括前期医学资料评估、方案分析、海外生殖医疗资源对接与试管流程全程陪伴。我们不直接提供医疗服务，而是帮助您在充分了解信息的基础上，做出适合自身情况的知情决策。",
  primaryButtonText: "立即咨询",
  primaryButtonLink: "#consultation",
  secondaryButtonText: "预约方案评估",
  secondaryButtonLink: "#service-sections",
};

// ── 默认时间轴 ──

const DEFAULT_TIMELINE = [
  {
    year: "服务体系建立",
    title: "标准化咨询流程",
    description: "建立涵盖前期评估、方案分析与资源匹配的标准化服务流程",
    image: undefined,
  },
  {
    year: "海外资源拓展",
    title: "全球合作网络",
    description: "与多个国家和地区的合作医疗机构建立长期合作关系",
    image: undefined,
  },
  {
    year: "医学评估完善",
    title: "评估流程规范",
    description: "完善医学资料评估流程，确保每位客户获得专业、准确的方案分析",
    image: undefined,
  },
  {
    year: "多学科协作",
    title: "顾问团队升级",
    description: "引入多学科背景顾问，提供更全面的方案评估与支持",
    image: undefined,
  },
  {
    year: "数字化升级",
    title: "咨询体验优化",
    description: "优化线上咨询工具与远程沟通渠道，提升服务效率与体验",
    image: undefined,
  },
];

// ── 默认核心服务 ──

const DEFAULT_SERVICE_SECTIONS = [
  {
    sectionNumber: "01",
    title: "生殖医学资料评估",
    subtitle: "专业顾问协助梳理医学资料",
    body: "天悦宝贝的顾问团队协助您整理和梳理既往检查报告、病史资料等医学信息，并协调合作医疗机构的生殖医学专家进行资料评估。评估内容涵盖卵巢功能、子宫条件、精子质量等关键指标，帮助您了解自身的生育力状况和可行的方案选择。需要说明的是，资料评估不替代医生面对面诊断，具体方案需由医生根据个人情况确定。",
    image: undefined,
    imagePosition: "right" as const,
    buttonText: "了解评估详情",
    buttonLink: "#consultation",
    items: [
      { title: "检查报告整理", description: "协助梳理激素、超声、精液等检查资料", icon: "clipboard" },
      { title: "医学资料评估", description: "协调专家对资料进行综合分析与评估", icon: "stethoscope" },
      { title: "方案可行性分析", description: "根据评估结果提供个性化方案建议", icon: "check" },
      { title: "知情决策支持", description: "帮助您充分了解信息后做出适合的选择", icon: "shield" },
    ],
  },
  {
    sectionNumber: "02",
    title: "多对一专业服务",
    subtitle: "专属团队全程陪伴",
    body: "每位客户配备由咨询顾问、医疗协调员、翻译（如需）组成的专属服务团队，从初次咨询到流程结束，提供全程一对一的沟通与支持。团队成员持续跟进您的咨询进展，确保信息传递准确、流程衔接顺畅。我们的角色是咨询、协调与陪伴，不直接实施医疗操作。",
    image: undefined,
    imagePosition: "left" as const,
    buttonText: "了解服务团队",
    buttonLink: "#consultation",
    items: [
      { title: "专属顾问", description: "一对一咨询顾问，全程跟进沟通", icon: "users" },
      { title: "医疗协调员", description: "协调医疗资源，安排就诊与检查", icon: "building" },
      { title: "翻译支持", description: "海外就医时提供专业医疗翻译", icon: "globe" },
      { title: "隐私保护", description: "严格的信息保密机制，保护客户隐私", icon: "shield" },
    ],
  },
  {
    sectionNumber: "03",
    title: "一站式试管医疗咨询",
    subtitle: "覆盖全流程的咨询服务",
    body: "从前期检查、促排卵、取卵取精、胚胎培养、遗传学检测到胚胎移植，覆盖试管婴儿周期各个环节的咨询与协调。顾问团队协助您了解每个阶段的流程安排、注意事项和预期时间，帮助您做好充分准备。所有医疗操作由合作医疗机构的专业医生团队执行。",
    image: undefined,
    imagePosition: "right" as const,
    buttonText: "了解试管流程",
    buttonLink: "#consultation",
    items: [
      { title: "前期检查协调", description: "协助安排全面的生育力检查与评估", icon: "clipboard" },
      { title: "促排方案了解", description: "帮助了解促排卵方案与监测流程", icon: "clock" },
      { title: "胚胎培养说明", description: "介绍实验室胚胎培养与质量评估流程", icon: "heart" },
      { title: "遗传学检测咨询", description: "PGT 胚胎植入前遗传学检测信息咨询", icon: "shield" },
    ],
  },
  {
    sectionNumber: "04",
    title: "线上线下全流程跟踪",
    subtitle: "灵活便捷的服务模式",
    body: "支持线上远程咨询与线下到院沟通相结合的服务模式。无论您身在何处，都可以通过视频、电话或微信与顾问团队保持沟通。关键环节安排线下到院，确保与医疗团队的充分沟通。全程有专属顾问跟进，及时解答疑问、协调安排。",
    image: undefined,
    imagePosition: "left" as const,
    buttonText: "了解服务模式",
    buttonLink: "#consultation",
    items: [
      { title: "远程咨询", description: "视频、电话、微信多渠道沟通", icon: "phone" },
      { title: "线下到院", description: "关键环节安排线下就诊与检查", icon: "building" },
      { title: "进度跟踪", description: "实时了解咨询进展与流程状态", icon: "clock" },
      { title: "后续支持", description: "流程结束后的持续沟通与关怀", icon: "heart" },
    ],
  },
];

// ── 默认优势 ──

const DEFAULT_ADVANTAGES = {
  title: "五项服务保障",
  description: "天悦宝贝致力于为每个家庭提供专业、安全、贴心的服务体验",
  items: [
    { title: "医学资料评估", description: "协助梳理医学资料，协调专家进行综合评估与分析", icon: "stethoscope" },
    { title: "资源匹配", description: "根据个人情况匹配适合的海外生殖医疗资源与机构", icon: "building" },
    { title: "流程协调", description: "全程协调各项流程安排，确保信息准确、衔接顺畅", icon: "clipboard" },
    { title: "隐私保护", description: "严格的信息保密机制，所有资料加密管理，未经授权不对外披露", icon: "shield" },
    { title: "持续陪伴", description: "专属顾问从咨询到流程结束全程跟进，提供持续沟通与支持", icon: "users" },
  ],
};

// ── 默认相关推荐 ──

const DEFAULT_RELATED = {
  title: "相关推荐",
  items: [
    { title: "三代试管前需要准备哪些资料", description: "了解 PGT 技术的适用范围、前期检查与资料准备", href: "/third-generation-ivf" },
    { title: "高龄备孕如何做医学评估", description: "卵巢功能评估、生育力检查与方案分析指南", href: "/third-generation-ivf" },
    { title: "海外辅助生殖国家如何选择", description: "不同国家和地区的法律政策与医疗资源对比", href: "/overseas-fertility" },
    { title: "冻卵冻精适合哪些人", description: "生育力保存的技术原理、适用人群与海外方案", href: "/egg-sperm-freezing" },
    { title: "第三方辅助生殖方案如何了解", description: "合法合规地区的方案、流程与法律框架", href: "/third-party-assisted-reproduction" },
    { title: "私人订制方案如何评估", description: "根据个人需求量身定制的个性化生育规划", href: "/private-customization" },
  ],
};

// ── 默认服务流程 ──

const DEFAULT_PROCESS = {
  title: "服务流程",
  description: "从咨询到完成的完整服务流程，每一步都有专属顾问陪伴",
  steps: [
    { title: "初步咨询", description: "了解基本情况与需求，介绍服务内容与流程，解答初步疑问", icon: "message" },
    { title: "资料收集", description: "协助收集和整理既往检查报告、病史资料等医学信息", icon: "clipboard" },
    { title: "医学评估", description: "协调合作医疗机构专家对资料进行评估，分析方案可行性", icon: "stethoscope" },
    { title: "资源匹配", description: "根据评估结果和个人需求，匹配适合的海外医疗资源与机构", icon: "building" },
    { title: "流程陪伴", description: "全程跟进咨询进展，协调各项安排，提供持续沟通与支持", icon: "heart" },
  ],
};

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  consultTitle: "需要了解医疗服务？",
  consultDescription: "留下联系方式，顾问会尽快联系您，帮助您了解方案与流程。",
  consultButtonText: "立即咨询",
  consultButtonLink: "#consultation",
  resourceTitle: "整合国际医疗资源",
  resourceDescription: "覆盖多个国家和地区的合作医疗机构，为您提供多元化的方案选择。",
  expertsTitle: "多学科专家服务",
  expertsDescription: "多学科顾问团队，为不同需求的家庭提供专业支持。",
  expertsItems: [
    { title: "生殖医学顾问", description: "方案评估与流程指导", icon: "stethoscope" },
    { title: "资料评估顾问", description: "检查报告整理与分析", icon: "clipboard" },
    { title: "妇科医生咨询", description: "生育力评估与建议", icon: "heart" },
    { title: "心理咨询支持", description: "情绪疏导与心理陪伴", icon: "users" },
  ],
  featuredCaseTitle: "精选案例",
  featuredCaseDescription: "了解真实的咨询服务案例，仅供参考。",
  serviceTitle: "服务通道",
  serviceItems: [
    { title: "三代试管婴儿", href: "/third-generation-ivf", icon: "heart" },
    { title: "冻卵/冻精", href: "/egg-sperm-freezing", icon: "snowflake" },
    { title: "海外生殖方案", href: "/overseas-fertility", icon: "globe" },
    { title: "私人订制方案", href: "/private-customization", icon: "award" },
    { title: "成功案例", href: "/success-cases", icon: "check" },
  ],
};

// ── 默认品牌沉淀 ──

const DEFAULT_BRAND = {
  title: "多年辅助生殖咨询服务积累",
  subtitle: "专业评估 · 合规咨询 · 隐私保护",
  description:
    "天悦宝贝深耕辅助生殖咨询领域，积累了丰富的服务经验。我们致力于为每个家庭提供专业、合规、保密的咨询服务，帮助家庭了解海外生殖医疗资源、评估方案可行性，陪伴家庭在充分了解信息的基础上做出知情选择。我们的角色是咨询、评估、资源对接与流程陪伴，不替代医生诊断或治疗。",
};

// ── 默认咨询区 ──

const DEFAULT_CONSULTATION = {
  title: "天悦宝贝顾问在线答疑",
  description:
    "如需了解辅助生殖相关医疗服务和海外医疗资源对接，可留下联系方式，顾问会尽快与您联系。我们提供一对一咨询服务，帮助您了解方案、评估适用性。咨询过程完全保密。",
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

function getIcon(name?: string) {
  switch (name) {
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    case "clipboard":
      return <ClipboardList className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "check":
      return <CheckCircle2 className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "building":
      return <Building2 className="w-5 h-5" />;
    case "heart":
      return <Heart className="w-5 h-5" />;
    case "clock":
      return <Clock className="w-5 h-5" />;
    case "phone":
      return <Phone className="w-5 h-5" />;
    case "message":
      return <MessageCircle className="w-5 h-5" />;
    case "award":
      return <Award className="w-5 h-5" />;
    case "map":
      return <MapPin className="w-5 h-5" />;
    case "globe":
      return <MapPin className="w-5 h-5" />;
    case "snowflake":
      return <Snowflake className="w-5 h-5" />;
    default:
      return <HelpCircle className="w-5 h-5" />;
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { medicalServicesPage: p, siteSettings } =
    await fetchMedicalServicesPageData();
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

export default async function MedicalServicesPage() {
  const { medicalServicesPage: p, siteSettings } =
    await fetchMedicalServicesPageData();

  // 合并 CMS 与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText: p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink: p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
    secondaryButtonText: DEFAULT_HERO.secondaryButtonText,
    secondaryButtonLink: DEFAULT_HERO.secondaryButtonLink,
  };
  const heroImageUrl = getImageUrl(p?.heroImage, "banner");
  const breadcrumbLabel = p?.breadcrumbCurrentLabel || "医疗服务";

  const timelineTitle = p?.timelineTitle || "天悦宝贝发展历程";
  const timelineDescription =
    p?.timelineDescription ||
    "持续深耕辅助生殖咨询领域，不断优化服务体系与客户体验";
  const timelineItems = p?.timelineItems?.length
    ? p.timelineItems
    : DEFAULT_TIMELINE;

  const serviceSections = p?.serviceSections?.length
    ? p.serviceSections
    : DEFAULT_SERVICE_SECTIONS;

  const advantages = {
    title: p?.advantagesTitle || DEFAULT_ADVANTAGES.title,
    description: p?.advantagesDescription || DEFAULT_ADVANTAGES.description,
    items: p?.advantageItems?.length
      ? p.advantageItems
      : DEFAULT_ADVANTAGES.items,
  };
  const advantagesImageUrl = getImageUrl(p?.advantagesImage, "banner");

  const related = {
    title: p?.relatedTitle || DEFAULT_RELATED.title,
    items: p?.relatedItems?.length ? p.relatedItems : DEFAULT_RELATED.items,
  };

  const process = {
    title: p?.processTitle || DEFAULT_PROCESS.title,
    description: p?.processDescription || DEFAULT_PROCESS.description,
    steps: p?.processSteps?.length ? p.processSteps : DEFAULT_PROCESS.steps,
  };

  // Sidebar
  const sidebar = {
    consultTitle: p?.sidebarConsultTitle || DEFAULT_SIDEBAR.consultTitle,
    consultDescription: p?.sidebarConsultDescription || DEFAULT_SIDEBAR.consultDescription,
    consultButtonText: p?.sidebarConsultButtonText || DEFAULT_SIDEBAR.consultButtonText,
    consultButtonLink: p?.sidebarConsultButtonLink || DEFAULT_SIDEBAR.consultButtonLink,
    resourceTitle: p?.sidebarResourceTitle || DEFAULT_SIDEBAR.resourceTitle,
    resourceDescription: p?.sidebarResourceDescription || DEFAULT_SIDEBAR.resourceDescription,
    expertsTitle: p?.sidebarExpertsTitle || DEFAULT_SIDEBAR.expertsTitle,
    expertsDescription: p?.sidebarExpertsDescription || DEFAULT_SIDEBAR.expertsDescription,
    expertsItems: p?.sidebarExpertItems?.length
      ? p.sidebarExpertItems
      : DEFAULT_SIDEBAR.expertsItems,
    featuredCaseTitle: p?.sidebarFeaturedCaseTitle || DEFAULT_SIDEBAR.featuredCaseTitle,
    featuredCaseDescription: p?.sidebarFeaturedCaseDescription || DEFAULT_SIDEBAR.featuredCaseDescription,
    serviceTitle: p?.sidebarServiceTitle || DEFAULT_SIDEBAR.serviceTitle,
    serviceItems: p?.sidebarServiceItems?.length
      ? p.sidebarServiceItems
      : DEFAULT_SIDEBAR.serviceItems,
  };
  const sidebarResourceImageUrl = getImageUrl(p?.sidebarResourceImage, "content");
  const sidebarFeaturedImageUrl = getImageUrl(p?.sidebarFeaturedCaseImage, "content");

  // 品牌沉淀
  const brand = {
    title: p?.brandSectionTitle || DEFAULT_BRAND.title,
    subtitle: p?.brandSectionSubtitle || DEFAULT_BRAND.subtitle,
    description: p?.brandSectionDescription || DEFAULT_BRAND.description,
  };
  const brandBgUrl = getImageUrl(p?.brandSectionBackgroundImage, "banner");

  // 咨询区
  const consultation = {
    title: p?.consultationTitle || DEFAULT_CONSULTATION.title,
    description: p?.consultationDescription || DEFAULT_CONSULTATION.description,
  };
  const consultationBgUrl = getImageUrl(p?.consultationBackgroundImage, "banner");

  return (
    <>
      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
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
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              >
                {hero.primaryButtonText}
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {hero.secondaryButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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
                    <Calendar className="w-5 h-5" />
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
          3. 主体：左侧正文 + 右侧 Sidebar
      ════════════════════════════════════════ */}
      <section id="service-sections" className="py-12 lg:py-16 bg-[#f8fbff]">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,800px)_320px] gap-8 justify-center">
            {/* 左侧正文 */}
            <main className="min-w-0">
              {/* 页面导语 */}
              {(() => {
                const introTitle = p?.introTitle || "高标准医疗服务";
                const introDescription =
                  p?.introDescription ||
                  "天悦宝贝为有需求的家庭提供辅助生殖相关的专业咨询服务，包括医学资料评估、海外生殖医疗资源对接、方案分析与流程陪伴。需要说明的是，我们提供的是咨询、评估、资源对接和流程陪伴服务，不直接替代医生诊疗或治疗。所有医疗操作由合作医疗机构的专业医生团队执行。";
                const introImageUrl = getImageUrl(p?.introImage, "content");

                return (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[#173b68] mb-3">
                      {introTitle}
                    </h2>
                    <p className="text-[15px] text-[#5a6d8a] leading-relaxed">
                      {introDescription}
                    </p>
                    {introImageUrl && (
                      <div className="relative aspect-[16/7] rounded-xl overflow-hidden mt-6">
                        <Image
                          src={introImageUrl}
                          alt={p?.introImage?.alt || introTitle}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 820px"
                        />
                      </div>
                    )}
                    {!introImageUrl && (
                      <div className="relative aspect-[16/7] rounded-xl overflow-hidden mt-6 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <div className="text-center">
                          <Stethoscope className="w-12 h-12 text-[#2563eb]/30 mx-auto mb-3" />
                          <p className="text-sm text-[#2563eb]/40 font-medium">
                            高标准医疗服务
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* 核心服务模块 */}
              {serviceSections.map((section, i) => {
                const imageUrl = getImageUrl(section.image, "content");
                const isLeft = section.imagePosition === "left";

                return (
                  <div
                    key={i}
                    className={`mb-12 mx-auto w-full ${imageUrl ? "max-w-[780px]" : "max-w-[680px]"}`}
                  >
                    {/* 编号 + 标题 */}
                    <div className="flex items-start gap-3 mb-4">
                      {section.sectionNumber && (
                        <span className="text-3xl font-bold text-[#2563eb]/20 leading-none">
                          {section.sectionNumber}
                        </span>
                      )}
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-[#173b68]">
                          {section.title || `服务模块 ${i + 1}`}
                        </h2>
                        {section.subtitle && (
                          <p className="text-sm text-[#2563eb] mt-1">
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 图文布局 */}
                    <div
                      className={
                        imageUrl
                          ? "grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
                          : "block"
                      }
                    >
                      {imageUrl && (
                        <div
                          className={`relative aspect-[4/3] rounded-xl overflow-hidden ${isLeft ? "order-1" : "order-1 lg:order-2"}`}
                        >
                          <Image
                            src={imageUrl}
                            alt={section.image?.alt || section.title || ""}
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 380px"
                          />
                        </div>
                      )}
                      <div className={isLeft ? "order-2" : "order-2 lg:order-1"}>
                        {section.body && (
                          <p className="text-[15px] text-[#5a6d8a] leading-[1.8] mb-5">
                            {section.body}
                          </p>
                        )}

                        {/* 子项列表 */}
                        {section.items && section.items.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {section.items.map((item, j) => (
                              <div
                                key={j}
                                className="flex items-start gap-3 bg-[#f8fbff] rounded-lg p-3"
                              >
                                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                                  {getIcon(item.icon)}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#173b68]">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className="text-xs text-[#8a9bb5] mt-0.5">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.buttonText && (
                          <Link
                            href={section.buttonLink || "#consultation"}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                          >
                            {section.buttonText}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 优势 Banner */}
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-xl">
                  {advantagesImageUrl ? (
                    <Image
                      src={advantagesImageUrl}
                      alt={p?.advantagesImage?.alt || advantages.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 820px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548] via-[#1a3a6b] to-[#2563eb]" />
                  )}
                  <div className="absolute inset-0 bg-[#0f2548]/80" />

                  <div className="relative px-6 py-10 lg:px-10 lg:py-12">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">
                      {advantages.title}
                    </h3>
                    <p className="text-sm text-blue-200 text-center mb-8">
                      {advantages.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {advantages.items.map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-white">
                            {getIcon(item.icon)}
                          </div>
                          <p className="text-sm font-semibold text-white mb-1">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-xs text-blue-200/80 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 相关推荐 */}
              {related.items.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-[#173b68] mb-5">
                    {related.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.items.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href || "#"}
                        className="group bg-white rounded-xl p-5 ring-1 ring-[#e5e7eb] hover:ring-[#2563eb]/30 hover:shadow-lg transition-all"
                      >
                        <h3 className="text-sm font-semibold text-[#173b68] group-hover:text-[#2563eb] transition-colors mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-[#8a9bb5] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 服务流程 */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[#173b68] mb-2">
                  {process.title}
                </h2>
                <p className="text-sm text-[#5a6d8a] mb-6">
                  {process.description}
                </p>
                <div className="relative">
                  {/* 连接线 */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
                  <div className="space-y-5">
                    {process.steps.map((step, i) => (
                      <div key={i} className="relative flex gap-4">
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                          {i + 1}
                        </div>
                        <div className="bg-white rounded-xl p-4 ring-1 ring-[#e5e7eb] flex-1">
                          <h3 className="font-semibold text-[#173b68] mb-1">
                            {step.title}
                          </h3>
                          {step.description && (
                            <p className="text-sm text-[#5a6d8a] leading-relaxed">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>

            {/* 右侧 Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* A. 咨询卡 */}
                <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-2">
                    {sidebar.consultTitle}
                  </h3>
                  <p className="text-sm text-[#5a6d8a] mb-4">
                    {sidebar.consultDescription}
                  </p>
                  <div className="space-y-2.5">
                    <Link
                      href={sidebar.consultButtonLink}
                      className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {sidebar.consultButtonText}
                    </Link>
                    <a
                      href="tel:400-xxx-xxxx"
                      className="flex items-center gap-2 w-full justify-center rounded-lg border border-[#2563eb] px-4 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      电话咨询
                    </a>
                  </div>
                </div>

                {/* B. 医疗资源卡 */}
                <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] overflow-hidden">
                  {sidebarResourceImageUrl ? (
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={sidebarResourceImageUrl}
                        alt={p?.sidebarResourceImage?.alt || sidebar.resourceTitle}
                        fill
                        className="object-cover"
                        sizes="300px"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <MapPin className="w-10 h-10 text-[#2563eb]/20" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#173b68] mb-2">
                      {sidebar.resourceTitle}
                    </h3>
                    <p className="text-sm text-[#5a6d8a] leading-relaxed">
                      {sidebar.resourceDescription}
                    </p>
                  </div>
                </div>

                {/* C. 多学科专家 */}
                <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-1">
                    {sidebar.expertsTitle}
                  </h3>
                  <p className="text-xs text-[#8a9bb5] mb-4">
                    {sidebar.expertsDescription}
                  </p>
                  <ul className="space-y-3">
                    {sidebar.expertsItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-[#5a6d8a]"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                          {getIcon(item.icon)}
                        </div>
                        <div>
                          <p className="font-medium text-[#173b68] text-sm">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-xs text-[#8a9bb5]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* D. 精选案例 */}
                <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] overflow-hidden">
                  {sidebarFeaturedImageUrl ? (
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={sidebarFeaturedImageUrl}
                        alt={p?.sidebarFeaturedCaseImage?.alt || sidebar.featuredCaseTitle}
                        fill
                        className="object-cover"
                        sizes="300px"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <Award className="w-10 h-10 text-[#2563eb]/20" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#173b68] mb-2">
                      {sidebar.featuredCaseTitle}
                    </h3>
                    <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
                      {sidebar.featuredCaseDescription}
                    </p>
                    {p?.sidebarFeaturedCaseLink && (
                      <Link
                        href={p.sidebarFeaturedCaseLink}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                      >
                        查看案例
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* E. 服务通道 */}
                <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
                  <h3 className="text-base font-semibold text-[#173b68] mb-4">
                    {sidebar.serviceTitle}
                  </h3>
                  <ul className="space-y-2.5">
                    {sidebar.serviceItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href || "#"}
                          className="flex items-center gap-2.5 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                        >
                          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                            {getIcon(item.icon)}
                          </div>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* 移动端 Sidebar */}
          <div className="lg:hidden mt-10">
            <div className="space-y-6">
              {/* 咨询卡 */}
              <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
                <h3 className="text-base font-semibold text-[#173b68] mb-2">
                  {sidebar.consultTitle}
                </h3>
                <p className="text-sm text-[#5a6d8a] mb-4">
                  {sidebar.consultDescription}
                </p>
                <div className="space-y-2.5">
                  <Link
                    href={sidebar.consultButtonLink}
                    className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {sidebar.consultButtonText}
                  </Link>
                </div>
              </div>

              {/* 服务通道 */}
              <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
                <h3 className="text-base font-semibold text-[#173b68] mb-4">
                  {sidebar.serviceTitle}
                </h3>
                <ul className="space-y-2.5">
                  {sidebar.serviceItems.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href || "#"}
                        className="flex items-center gap-2.5 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                          {getIcon(item.icon)}
                        </div>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 品牌沉淀区
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        {brandBgUrl ? (
          <Image
            src={brandBgUrl}
            alt={p?.brandSectionBackgroundImage?.alt || ""}
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
            alt={p?.consultationBackgroundImage?.alt || ""}
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
              <ConsultationForm source="medical-services" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ChevronDown,
  MapPin,
  FileSearch,
  MessageCircle,
  ClipboardCheck,
  Building2,
  Clock,
  Shield,
  Users,
  Stethoscope,
  CheckCircle2,
  Sparkles,
  Send,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { fetchIvfServicesPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl } from "@/sanity/lib/image";
import type { ImageWithAlt } from "@/types/sanity";

// ── 类型 ──
type AreaItem = {
  name: string; subtitle: string; description: string;
  serviceHighlights: string[]; commonNeeds: string[];
  image?: ImageWithAlt; ctaText: string; ctaLink: string;
};
type StepItem = { title: string; description: string; icon?: string };
type ExpItem = { title: string; description: string; icon?: string };
type NeedItem = { title: string; description: string; icon?: string };
type ProcessStep = { stepNumber: number; title: string; description?: string; duration?: string };
type CaseItem = {
  title: string; city: string; profile: string; challenge: string;
  serviceSupport: string; resultDescription: string;
  image?: ImageWithAlt; buttonText?: string; buttonLink?: string;
};

// ── 默认数据 ──

const DEFAULT_HERO = {
  title: "试管服务区域覆盖",
  subtitle: "面向上海、北京、广东、深圳、江浙沪等地区家庭，提供远程咨询、资料整理与就诊协调支持",
  description: "天悦宝贝为多个城市家庭提供试管婴儿相关的专业咨询服务。无论您身在何处，都可以通过远程沟通了解方案、整理资料、对接医疗资源。我们的顾问团队熟悉不同地区客户的实际需求，提供有针对性的服务支持。",
  primaryButtonText: "查询所在地区服务",
  primaryButtonLink: "#service-areas",
  secondaryButtonText: "预约顾问",
  secondaryButtonLink: "#consultation",
  badges: ["上海", "北京", "广东", "深圳", "江浙沪", "远程咨询"],
};

const DEFAULT_TRUST = [
  { value: "多地区", label: "客户服务经验", description: "覆盖国内主要城市" },
  { value: "远程", label: "资料沟通支持", description: "线上提交与整理" },
  { value: "本地", label: "检查资料整理", description: "协助梳理本地报告" },
  { value: "全程", label: "就诊流程协调", description: "跨城沟通与陪伴" },
];

const DEFAULT_AREAS: AreaItem[] = [
  {
    name: "上海", subtitle: "长三角核心城市", description: "为上海及长三角周边家庭提供本地检查资料整理、远程方案评估与就诊路径沟通服务。",
    serviceHighlights: ["本地检查资料整理", "远程方案评估", "就诊路径沟通", "长三角客户覆盖"],
    commonNeeds: ["想了解上海本地可对接的医疗资源", "已有检查报告需要整理", "工作忙希望远程先沟通"],
    ctaText: "了解上海服务", ctaLink: "#consultation",
  },
  {
    name: "北京", subtitle: "首都及周边地区", description: "为北京及京津冀地区家庭提供高龄备孕咨询、资料评估与专家咨询需求对接。",
    serviceHighlights: ["高龄备孕咨询", "资料系统评估", "专家资源对接", "京津冀客户覆盖"],
    commonNeeds: ["高龄备孕需要方案评估", "多次失败后想重新评估", "需要对接专家资源"],
    ctaText: "了解北京服务", ctaLink: "#consultation",
  },
  {
    name: "广东", subtitle: "珠三角及周边", description: "为广州、佛山、东莞等广东地区家庭提供远程咨询与跨城就诊协调服务。",
    serviceHighlights: ["珠三角客户覆盖", "远程咨询支持", "跨城就诊协调", "粤语沟通支持"],
    commonNeeds: ["不在广州/深圳也可获得服务", "需要跨城就诊安排", "希望远程先了解方案"],
    ctaText: "了解广东服务", ctaLink: "#consultation",
  },
  {
    name: "深圳", subtitle: "一线城市快节奏", description: "为深圳家庭提供灵活预约、远程沟通与隐私保护服务，适应快节奏工作生活。",
    serviceHighlights: ["灵活预约时间", "远程高效沟通", "严格隐私保护", "深圳本地资源对接"],
    commonNeeds: ["工作忙没时间跑医院", "需要隐私保护", "想远程先了解可行性"],
    ctaText: "了解深圳服务", ctaLink: "#consultation",
  },
  {
    name: "江浙沪", subtitle: "跨城服务网络", description: "为杭州、南京、苏州等江浙沪城市家庭提供跨城资料整理与就诊行程协调。",
    serviceHighlights: ["跨城客户覆盖", "资料线上整理", "就诊行程协调", "多城市资源匹配"],
    commonNeeds: ["本地医疗资源有限", "需要跨城就诊安排", "希望线上整理资料减少往返"],
    ctaText: "了解江浙沪服务", ctaLink: "#consultation",
  },
];

const DEFAULT_REGIONAL_STEPS: StepItem[] = [
  { title: "所在城市与需求确认", description: "了解您所在的城市和具体需求，确认服务覆盖范围。", icon: "map" },
  { title: "既往检查资料收集", description: "协助收集和整理您在当地已完成的检查报告。", icon: "file" },
  { title: "顾问初步整理重点问题", description: "顾问梳理资料中的关键信息和需要补充的检查项目。", icon: "clipboard" },
  { title: "匹配适合的咨询路径", description: "根据您所在地区和需求，推荐合适的咨询和就诊方案。", icon: "building" },
  { title: "安排远程沟通或线下就诊", description: "灵活安排线上视频咨询或协调就近就诊资源。", icon: "message" },
  { title: "后续周期提醒与流程陪伴", description: "提供持续的流程跟进、时间节点提醒与陪伴支持。", icon: "clock" },
];

const DEFAULT_EXPERIENCE: ExpItem[] = [
  { title: "熟悉不同城市客户的资料准备差异", description: "了解各地区检查机构的特点和报告格式，帮助高效整理。", icon: "file" },
  { title: "支持远程沟通，减少无效往返", description: "通过线上视频、电话等方式完成初步咨询，节省时间和交通成本。", icon: "message" },
  { title: "协助整理检查报告和病史信息", description: "顾问帮助梳理既往报告中的关键信息，避免遗漏。", icon: "clipboard" },
  { title: "根据客户所在地区协调时间安排", description: "考虑不同城市的交通和时间因素，合理安排就诊计划。", icon: "clock" },
  { title: "保护隐私，适合跨城咨询客户", description: "严格的隐私保护机制，让跨城客户放心咨询。", icon: "shield" },
];

const DEFAULT_REMOTE_STEPS: ProcessStep[] = [
  { stepNumber: 1, title: "在线提交需求", description: "通过表单或电话提交您的基本信息和咨询需求。", duration: "当天" },
  { stepNumber: 2, title: "顾问确认所在地区", description: "顾问与您确认所在城市，了解当地检查和就诊情况。", duration: "1 天内" },
  { stepNumber: 3, title: "发送检查资料清单", description: "根据您的情况提供需要准备的检查资料清单。", duration: "1-2 天" },
  { stepNumber: 4, title: "整理报告与问题", description: "顾问协助整理您的既往报告，梳理关键问题。", duration: "2-3 天" },
  { stepNumber: 5, title: "远程沟通方案方向", description: "通过视频或电话沟通初步方案评估和建议。", duration: "预约安排" },
  { stepNumber: 6, title: "确认下一步就诊或服务安排", description: "根据沟通结果，确认后续就诊计划或进一步服务。", duration: "按需" },
];

const DEFAULT_NEEDS: NeedItem[] = [
  { title: "不知道本地该先做哪些检查", description: "顾问根据您的情况提供当地检查项目建议和机构参考。", icon: "stethoscope" },
  { title: "想了解所在城市服务是否可覆盖", description: "确认您所在地区的服务覆盖情况和可对接的资源。", icon: "map" },
  { title: "已有检查报告但不会整理重点", description: "顾问帮助梳理报告中的关键指标和需要关注的问题。", icon: "file" },
  { title: "多次失败后想重新评估方向", description: "系统回顾既往经历，从不同角度分析和建议新的方向。", icon: "clipboard" },
  { title: "工作忙，希望远程先沟通", description: "灵活安排线上咨询，不受地域限制，高效利用时间。", icon: "clock" },
  { title: "需要隐私保护和跨城咨询安排", description: "严格的信息保密机制，适合注重隐私的跨城客户。", icon: "shield" },
];

const DEFAULT_CASES: CaseItem[] = [
  {
    title: "上海客户的远程咨询体验", city: "上海", profile: "工作繁忙的白领家庭",
    challenge: "平时工作节奏快，难以抽出时间多次前往医院咨询。",
    serviceSupport: "顾问安排晚间视频沟通，协助整理了之前在本地做的检查报告，梳理出需要补充的项目。",
    resultDescription: "通过远程沟通完成了初步方案评估，减少了不必要的往返。",
  },
  {
    title: "北京高龄客户的方案评估", city: "北京", profile: "高龄备孕家庭",
    challenge: "年龄较大，之前的检查分散在不同医院，资料不系统。",
    serviceSupport: "顾问帮助汇总了多家医院的检查报告，整理成系统资料，并安排了针对性的方案评估沟通。",
    resultDescription: "客户对自身情况有了更清晰的了解，明确了下一步方向。",
  },
  {
    title: "江浙沪跨城客户的协调服务", city: "杭州", profile: "跨城咨询家庭",
    challenge: "所在城市相关资源有限，需要跨城就诊但不了解流程。",
    serviceSupport: "顾问根据客户情况推荐了适合的就诊路径，协助安排行程和时间，提供全程沟通支持。",
    resultDescription: "通过合理的行程安排，减少了往返次数和时间成本。",
  },
];

const DEFAULT_FAQ = [
  { question: "我在上海/北京/深圳，可以先远程咨询吗？", answer: "可以的。天悦宝贝支持远程视频或电话咨询，您可以在家中完成初步的方案沟通，无需先到现场。顾问会根据您的情况安排合适的沟通方式。" },
  { question: "不在一线城市，也可以获得服务吗？", answer: "可以的。我们的服务不限于一线城市，只要您有咨询需求，都可以通过远程方式获得顾问支持。顾问会根据您所在地区的情况提供相应的服务安排。" },
  { question: "本地检查报告可以用于初步评估吗？", answer: "可以的。您在当地医院完成的检查报告可以用于初步评估。顾问会帮助您整理报告中的关键信息，并指出可能需要补充的检查项目。" },
  { question: "江浙沪客户是否需要频繁往返？", answer: "不一定。很多环节可以通过远程沟通完成，顾问会根据您的具体情况合理安排需要到场的环节，尽量减少不必要的往返。" },
  { question: "咨询前需要准备哪些资料？", answer: "建议准备：夫妻双方的身份信息、既往体检和生育相关检查报告、病史资料等。具体清单顾问会在初次沟通时根据您的情况详细说明。" },
  { question: "如何保护跨城咨询客户的隐私？", answer: "天悦宝贝采用严格的信息管理机制，所有客户资料加密存储，仅限专属顾问访问。未经客户授权，不会向任何第三方披露个人信息。" },
  { question: "所在地区不同，服务内容会不一样吗？", answer: "核心咨询服务内容是一致的。不同地区的差异主要体现在就诊资源对接和行程安排上，顾问会根据您所在城市的实际情况提供针对性的协调支持。" },
];

// ── Icon 映射 ──

function getIcon(name?: string) {
  switch (name) {
    case "map": return <MapPin className="w-5 h-5" />;
    case "file": return <FileSearch className="w-5 h-5" />;
    case "clipboard": return <ClipboardCheck className="w-5 h-5" />;
    case "building": return <Building2 className="w-5 h-5" />;
    case "message": return <MessageCircle className="w-5 h-5" />;
    case "clock": return <Clock className="w-5 h-5" />;
    case "shield": return <Shield className="w-5 h-5" />;
    case "users": return <Users className="w-5 h-5" />;
    case "stethoscope": return <Stethoscope className="w-5 h-5" />;
    default: return <CheckCircle2 className="w-5 h-5" />;
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { ivfServicesPage: p, siteSettings } = await fetchIvfServicesPageData();
  const seo = p?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || p?.pageTitle || "试管服务区域 | 天悦宝贝",
    description: seo?.metaDescription || p?.pageDescription || "天悦宝贝为上海、北京、广东、深圳、江浙沪等地区家庭提供试管婴儿咨询、资料整理、远程方案评估与就诊协调服务。",
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || p?.pageTitle,
      description: seo?.ogDescription || seo?.metaDescription || p?.pageDescription,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

// ── Page Component ──

export default async function IvfServicesPage() {
  const { siteSettings, ivfServicesPage: p } = await fetchIvfServicesPageData();

  // 合并 CMS 与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText: p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink: p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
    secondaryButtonText: p?.heroSecondaryButtonText || DEFAULT_HERO.secondaryButtonText,
    secondaryButtonLink: p?.heroSecondaryButtonLink || DEFAULT_HERO.secondaryButtonLink,
    badges: p?.heroBadges?.length ? p.heroBadges : DEFAULT_HERO.badges,
  };

  const trustItems = p?.regionTrustItems?.length ? p.regionTrustItems : DEFAULT_TRUST;
  const areaItems: AreaItem[] = p?.serviceAreaItems?.length ? p.serviceAreaItems as AreaItem[] : DEFAULT_AREAS;
  const regionalSteps: StepItem[] = p?.regionalServiceSteps?.length ? p.regionalServiceSteps as StepItem[] : DEFAULT_REGIONAL_STEPS;
  const experienceItems: ExpItem[] = p?.experienceItems?.length ? p.experienceItems as ExpItem[] : DEFAULT_EXPERIENCE;
  const remoteSteps: ProcessStep[] = p?.remoteProcessSteps?.length ? p.remoteProcessSteps : DEFAULT_REMOTE_STEPS;
  const needsItems: NeedItem[] = p?.needsItems?.length ? p.needsItems as NeedItem[] : DEFAULT_NEEDS;
  const caseItems: CaseItem[] = p?.regionalCaseItems?.length ? p.regionalCaseItems as CaseItem[] : DEFAULT_CASES;
  const faqItems = p?.faqItems?.length ? p.faqItems : DEFAULT_FAQ;

  const conversion = {
    title: p?.conversionTitle || "查询你所在地区的服务方案",
    description: p?.conversionDescription || "告诉我们您所在的城市和需求，我们的顾问将为您提供针对性的服务方案。",
    buttonText: p?.conversionButtonText || "提交咨询",
  };
  const appointment = {
    title: p?.appointmentTitle || "预约试管服务区域咨询",
    description: p?.appointmentDescription || "填写以下信息，我们的顾问将根据您所在地区为您提供专业服务方案。",
    buttonText: p?.appointmentButtonText || "提交预约",
  };

  return (
    <>
      {/* FAQ 结构化数据 */}
      {faqItems.length > 0 && (
        <FaqJsonLd items={faqItems.map((i) => ({ question: i.question, answer: i.answer }))} />
      )}

      {/* ════════════════════════════════════════
          1. Hero
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#f0f6ff] via-white to-[#e8f0fe] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,.08),transparent_60%)]" />
        {/* 地图装饰 */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04] pointer-events-none hidden lg:block">
          <svg viewBox="0 0 600 500" fill="none" className="w-full h-full">
            <circle cx="200" cy="150" r="8" fill="#2563eb" />
            <circle cx="200" cy="150" r="20" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
            <circle cx="200" cy="150" r="35" stroke="#2563eb" strokeWidth="0.5" opacity="0.3" />
            <circle cx="350" cy="120" r="6" fill="#2563eb" />
            <circle cx="350" cy="120" r="16" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
            <circle cx="280" cy="280" r="7" fill="#2563eb" />
            <circle cx="280" cy="280" r="18" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
            <circle cx="320" cy="320" r="5" fill="#2563eb" />
            <circle cx="180" cy="350" r="6" fill="#2563eb" />
            <line x1="200" y1="150" x2="350" y2="120" stroke="#2563eb" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
            <line x1="200" y1="150" x2="280" y2="280" stroke="#2563eb" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
            <line x1="280" y1="280" x2="320" y2="320" stroke="#2563eb" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8 py-16 lg:py-24">
          {/* 面包屑 */}
          <nav className="flex items-center gap-2 text-sm text-[#8a9bb5] mb-8">
            <Link href="/" className="hover:text-[#2563eb] transition-colors">首页</Link>
            <span>/</span>
            <span className="text-[#173b68] font-medium">试管服务区域</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {hero.badges.map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#2563eb] ring-1 ring-blue-200/60">
                    <Sparkles className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#173b68] leading-tight mb-4">
                {hero.title}
              </h1>
              <p className="text-lg text-[#4b6fa8] mb-3">{hero.subtitle}</p>
              <p className="text-[15px] text-[#5a6d8a] leading-relaxed mb-8">{hero.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={hero.primaryButtonLink} className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-[#1d4ed8] transition-colors">
                  <MapPin className="w-4 h-4" />
                  {hero.primaryButtonText}
                </Link>
                <Link href={hero.secondaryButtonLink} className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-7 py-3 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  {hero.secondaryButtonText}
                </Link>
              </div>
            </div>
            {/* Hero 图片/装饰 */}
            <div className="relative">
              {p?.heroImage?.image ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image src={contentImageUrl(p.heroImage.image as unknown as Parameters<typeof contentImageUrl>[0])} alt={p.heroImage.alt || "试管服务区域"} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              ) : (
                <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-48">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#2563eb] shadow-lg shadow-blue-500/30" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-blue-300/40" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-blue-200/30" />
                      {[{ x: "30%", y: "35%", label: "上海" }, { x: "55%", y: "25%", label: "北京" }, { x: "45%", y: "65%", label: "广东" }, { x: "50%", y: "70%", label: "深圳" }, { x: "35%", y: "50%", label: "江浙沪" }].map((city) => (
                        <div key={city.label} className="absolute flex flex-col items-center" style={{ left: city.x, top: city.y }}>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shadow-sm" />
                          <span className="mt-1 text-[10px] font-medium text-[#2563eb]">{city.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-[#8a9bb5]">服务覆盖示意</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 区域信任条
      ════════════════════════════════════════ */}
      <section className="bg-white border-y border-blue-100/60">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#2563eb] mb-1">{item.value}</p>
                <p className="text-sm font-semibold text-[#173b68]">{item.label}</p>
                {item.description && <p className="text-xs text-[#8a9bb5] mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 服务覆盖地区
      ════════════════════════════════════════ */}
      <section id="service-areas" className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.serviceAreasTitle || "服务覆盖地区"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.serviceAreasDescription || "天悦宝贝的服务覆盖国内多个主要城市和地区，为不同地区的家庭提供有针对性的咨询与支持服务。"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaItems.map((area, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm ring-1 ring-blue-100/60 overflow-hidden hover:shadow-md transition-shadow">
                {area.image?.image ? (
                  <div className="relative h-40">
                    <Image src={contentImageUrl(area.image.image as unknown as Parameters<typeof contentImageUrl>[0])} alt={area.image.alt || area.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="text-xl font-bold text-white">{area.name}</h3>
                      {area.subtitle && <p className="text-xs text-white/80">{area.subtitle}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-40 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-white/80 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-white">{area.name}</h3>
                      {area.subtitle && <p className="text-xs text-white/80">{area.subtitle}</p>}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm text-[#5a6d8a] leading-relaxed mb-4">{area.description}</p>
                  {area.serviceHighlights.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#173b68] mb-2">服务亮点</p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.serviceHighlights.map((h) => (
                          <span key={h} className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#2563eb]">{h}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {area.commonNeeds.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[#173b68] mb-2">常见需求</p>
                      <ul className="space-y-1">
                        {area.commonNeeds.map((n) => (
                          <li key={n} className="flex items-start gap-1.5 text-xs text-[#5a6d8a]">
                            <CheckCircle2 className="w-3 h-3 mt-0.5 text-[#2563eb] flex-shrink-0" />
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link href={area.ctaLink || "#consultation"} className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                    {area.ctaText || "了解更多"} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 不同地区客户如何服务
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.regionalServiceTitle || "不同地区客户如何服务"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.regionalServiceDescription || "无论您身在哪个城市，天悦宝贝都提供标准化的服务流程，确保每位客户获得专业支持。"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalSteps.map((step, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#f8fbff] rounded-xl ring-1 ring-blue-100/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
                  {getIcon(step.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-[#173b68] mb-1 text-sm">{step.title}</h3>
                  <p className="text-xs text-[#5a6d8a] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. 区域服务经验
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.experienceTitle || "区域服务经验"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.experienceDescription || "多年服务不同城市家庭的经验，让我们更了解各地区客户的实际需求。"}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {experienceItems.map((item, i) => (
              <div key={i} className="flex gap-4 bg-white p-5 rounded-xl shadow-sm ring-1 ring-blue-100/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-[#173b68] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#5a6d8a] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. 本地检查与远程咨询流程
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.remoteProcessTitle || "本地检查与远程咨询流程"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.remoteProcessDescription || "本地完成检查，远程沟通方案，减少不必要的往返，让跨城咨询更高效。"}
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
            <div className="space-y-6">
              {remoteSteps.map((step) => (
                <div key={step.stepNumber} className="relative flex gap-5">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                    {step.stepNumber}
                  </div>
                  <div className="bg-[#f8fbff] rounded-xl p-5 ring-1 ring-blue-100/60 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-[#173b68]">{step.title}</h3>
                      {step.duration && <span className="text-xs text-[#8a9bb5] bg-blue-50 px-2 py-0.5 rounded-full">{step.duration}</span>}
                    </div>
                    <p className="text-sm text-[#5a6d8a] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7. 客户常见需求
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.needsTitle || "客户常见需求"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.needsDescription || "以下是不同地区客户在咨询中最常提到的需求和疑问。"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {needsItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-blue-100/60">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 text-[#2563eb]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-semibold text-[#173b68] mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-[#5a6d8a] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8. 强转化咨询模块
      ════════════════════════════════════════ */}
      <section id="consultation" className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        {p?.conversionBackgroundImage?.image && (
          <Image src={contentImageUrl(p.conversionBackgroundImage.image as unknown as Parameters<typeof contentImageUrl>[0])} alt={p.conversionBackgroundImage.alt || ""} fill className="object-cover opacity-10" />
        )}
        <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{conversion.title}</h2>
              <p className="text-blue-200 mb-6">{conversion.description}</p>
              <div className="flex flex-wrap gap-2">
                {["上海", "北京", "广东", "深圳", "江浙沪"].map((city) => (
                  <span key={city} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20">
                    <MapPin className="w-3 h-3" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <ConsultationForm source="ivf-services" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          9. 区域案例
      ════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.regionalCasesTitle || "区域咨询案例"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.regionalCasesDescription || "以下案例已做去隐私化处理，仅供参考，不构成任何承诺。"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseItems.map((item, i) => (
              <div key={i} className="bg-[#f8fbff] rounded-xl p-6 ring-1 ring-blue-100/60">
                {item.image?.image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <Image src={contentImageUrl(item.image.image as unknown as Parameters<typeof contentImageUrl>[0])} alt={item.image.alt || item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                )}
                <h3 className="font-semibold text-[#173b68] mb-2">{item.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.city && <span className="inline-block text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full">{item.city}</span>}
                  {item.profile && <span className="inline-block text-xs text-[#4b6fa8] bg-blue-50 px-2 py-0.5 rounded-full">{item.profile}</span>}
                </div>
                {item.challenge && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#173b68] mb-1">面临挑战</p>
                    <p className="text-xs text-[#5a6d8a] leading-relaxed">{item.challenge}</p>
                  </div>
                )}
                {item.serviceSupport && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#173b68] mb-1">服务支持</p>
                    <p className="text-xs text-[#5a6d8a] leading-relaxed">{item.serviceSupport}</p>
                  </div>
                )}
                {item.resultDescription && (
                  <p className="text-xs text-[#4b6fa8] border-t border-blue-100 pt-3 mt-3">{item.resultDescription}</p>
                )}
                {item.buttonText && (
                  <Link href={item.buttonLink || "#consultation"} className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                    {item.buttonText} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          10. FAQ
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-16 lg:py-24">
        <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] mb-4">
              {p?.faqTitle || "按地区咨询常见问题"}
            </h2>
            <p className="text-[#5a6d8a] max-w-2xl mx-auto">
              {p?.faqDescription || "关于不同地区咨询的常见疑问解答。"}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-white rounded-xl overflow-hidden group ring-1 ring-blue-100/60">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-[#173b68] pr-4 text-[15px]">{item.question}</h3>
                  <ChevronDown className="w-5 h-5 text-[#8a9bb5] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-[#5a6d8a] leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          11. 最终 CTA / 在线预约
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0f2548] to-[#1a3a6b] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,.15),transparent_60%)]" />
        {p?.appointmentBackgroundImage?.image && (
          <Image src={contentImageUrl(p.appointmentBackgroundImage.image as unknown as Parameters<typeof contentImageUrl>[0])} alt={p.appointmentBackgroundImage.alt || ""} fill className="object-cover opacity-10" />
        )}
        <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{appointment.title}</h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">{appointment.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#consultation" className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors">
              <Phone className="w-4 h-4" />
              {appointment.buttonText}
            </Link>
            <Link href="/about-tianyue" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              了解更多
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

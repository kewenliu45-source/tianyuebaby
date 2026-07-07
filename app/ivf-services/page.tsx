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
import { ServiceRegionsMap } from "@/components/shared/service-regions-map";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { fetchIvfServicesPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl } from "@/sanity/lib/image";
import type { ImageWithAlt } from "@/types/sanity";

// ── 类型 ──
type StepItem = { title: string; description: string; icon?: string };
type ProcessStep = {
  stepNumber: number;
  title: string;
  description?: string;
  duration?: string;
};

// ── 最小化 SEO Fallback ──

const FALLBACK_SEO = {
  title: "试管服务区域 | 天悦宝贝",
  description:
    "天悦宝贝为上海、北京、广东、深圳、江浙沪等地区家庭提供试管婴儿咨询、资料整理、远程方案评估与就诊协调服务。",
};

// ── Icon 映射 ──

function getIcon(name?: string) {
  switch (name) {
    case "map":
      return <MapPin className="w-5 h-5" />;
    case "file":
      return <FileSearch className="w-5 h-5" />;
    case "clipboard":
      return <ClipboardCheck className="w-5 h-5" />;
    case "building":
      return <Building2 className="w-5 h-5" />;
    case "message":
      return <MessageCircle className="w-5 h-5" />;
    case "clock":
      return <Clock className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    default:
      return <CheckCircle2 className="w-5 h-5" />;
  }
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { ivfServicesPage: p, siteSettings } =
    await fetchIvfServicesPageData();
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

export default async function IvfServicesPage() {
  const { siteSettings, ivfServicesPage: p } =
    await fetchIvfServicesPageData();

  const phone = siteSettings?.phone || "400-123-4567";

  // 使用 Sanity 数据，仅保留最小化 fallback
  const hero = {
    title: p?.heroTitle || FALLBACK_SEO.title.split(" | ")[0],
    subtitle:
      p?.heroSubtitle ||
      "面向上海、北京、广东、深圳、江浙沪等地区家庭，提供远程咨询、资料整理与就诊协调支持",
    description:
      p?.heroDescription ||
      "天悦宝贝为多个城市家庭提供试管婴儿相关的专业咨询服务。",
    primaryButtonText: p?.heroPrimaryButtonText || "查询所在地区服务",
    primaryButtonLink: p?.heroPrimaryButtonLink || "#service-areas",
    secondaryButtonText: p?.heroSecondaryButtonText || "预约顾问",
    secondaryButtonLink: p?.heroSecondaryButtonLink || "#consultation",
    badges: p?.heroBadges || [],
  };

  // 信任条
  const trustItems = p?.regionTrustItems || [];

  // 默认经纬度
  const DEFAULT_COORDS: Record<string, { lng: number; lat: number }> = {
    上海: { lng: 121.4737, lat: 31.2304 },
    北京: { lng: 116.4074, lat: 39.9042 },
    广东: { lng: 113.2644, lat: 23.1291 },
    深圳: { lng: 114.0579, lat: 22.5431 },
    江浙沪: { lng: 120.5853, lat: 31.2989 },
  };

  // 优先使用 serviceRegions（含经纬度），否则降级到 serviceAreaItems
  const regionItems = p?.serviceRegions?.length
    ? p.serviceRegions
    : p?.serviceAreaItems?.length
      ? p.serviceAreaItems.map((a) => ({
          ...a,
          mapLabel: a.name,
          lng: DEFAULT_COORDS[a.name]?.lng,
          lat: DEFAULT_COORDS[a.name]?.lat,
        }))
      : [];

  // 其他模块数据
  const regionalSteps: StepItem[] = (p?.regionalServiceSteps as StepItem[]) || [];
  const experienceItems = p?.experienceItems || [];
  const remoteSteps: ProcessStep[] = p?.remoteProcessSteps || [];
  const needsItems = p?.needsItems || [];
  const caseItems = p?.regionalCaseItems || [];
  const faqItems = p?.faqItems || [];

  // 转化模块
  const conversion = {
    title: p?.conversionTitle || "查询你所在地区的服务方案",
    description:
      p?.conversionDescription ||
      "告诉我们您所在的城市和需求，我们的顾问将为您提供针对性的服务方案。",
    buttonText: p?.conversionButtonText || "提交咨询",
  };

  // 预约模块
  const appointment = {
    title: p?.appointmentTitle || "预约试管服务区域咨询",
    description:
      p?.appointmentDescription ||
      "填写以下信息，我们的顾问将根据您所在地区为您提供专业服务方案。",
    buttonText: p?.appointmentButtonText || "提交预约",
  };

  return (
    <>
      {/* FAQ 结构化数据 */}
      {faqItems.length > 0 && (
        <FaqJsonLd
          items={faqItems.map((i) => ({
            question: i.question,
            answer: i.answer,
          }))}
        />
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
            <Link href="/" className="hover:text-[#2563eb] transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-[#173b68] font-medium">试管服务区域</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              {/* 标签 */}
              {hero.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {hero.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-xs font-medium"
                    >
                      <MapPin className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#173b68] leading-tight mb-4">
                {hero.title}
              </h1>
              <p className="text-lg text-[#5a6d8a] mb-3">{hero.subtitle}</p>
              <p className="text-[15px] text-[#8a9bb5] leading-relaxed mb-8">
                {hero.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <PhoneConsultButton
                  phone={phone}
                  className="rounded-lg bg-[#2563eb] px-7 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#1d4ed8] transition-colors"
                  iconClassName="w-4 h-4"
                  label={hero.primaryButtonText}
                />
                <Link
                  href={hero.secondaryButtonLink}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-7 py-3 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
                >
                  {hero.secondaryButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 右侧装饰/地图 */}
            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                {p?.heroImage?.image ? (
                  <Image
                    src={contentImageUrl(
                      p.heroImage.image as unknown as Parameters<
                        typeof contentImageUrl
                      >[0]
                    )}
                    alt={p.heroImage.alt || hero.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-[#2563eb] mx-auto mb-4" />
                      <p className="text-[#5a6d8a]">服务覆盖全国多个城市</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 信任条 - 有数据才显示
      ════════════════════════════════════════ */}
      {trustItems.length > 0 && (
        <section className="bg-white border-b border-blue-100/60">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustItems.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-[#2563eb]">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-[#173b68]">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-xs text-[#8a9bb5]">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          3. 服务覆盖地区 - 有数据才显示
      ════════════════════════════════════════ */}
      {regionItems.length > 0 && (
        <section id="service-areas" className="bg-[#f8fbff] py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.serviceAreasTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.serviceAreasTitle}
              </h2>
            )}
            {p?.serviceAreasDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.serviceAreasDescription}
              </p>
            )}

            {/* 地图 */}
            <div className="mb-10">
              <ServiceRegionsMap regions={regionItems} />
            </div>

            {/* 地区卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionItems.map((region, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                >
                  {region.image?.image && (
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={contentImageUrl(
                          region.image.image as unknown as Parameters<
                            typeof contentImageUrl
                          >[0]
                        )}
                        alt={region.image.alt || region.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#173b68] mb-1">
                    {region.name}
                  </h3>
                  {region.subtitle && (
                    <p className="text-sm text-[#2563eb] mb-2">
                      {region.subtitle}
                    </p>
                  )}
                  {region.description && (
                    <p className="text-sm text-[#5a6d8a] mb-4">
                      {region.description}
                    </p>
                  )}
                  {region.serviceHighlights &&
                    region.serviceHighlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {region.serviceHighlights.map((tag, j) => (
                          <span
                            key={j}
                            className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  {region.ctaText && (
                    <Link
                      href={region.ctaLink || "#consultation"}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
                    >
                      {region.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          4. 地区服务流程 - 有数据才显示
      ════════════════════════════════════════ */}
      {regionalSteps.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.regionalServiceTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.regionalServiceTitle}
              </h2>
            )}
            {p?.regionalServiceDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.regionalServiceDescription}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-[#f8fbff] rounded-xl p-6 ring-1 ring-blue-100/60"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    {getIcon(step.icon)}
                  </div>
                  <h3 className="font-semibold text-[#173b68] mb-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-sm text-[#5a6d8a]">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          5. 区域服务经验 - 有数据才显示
      ════════════════════════════════════════ */}
      {experienceItems.length > 0 && (
        <section className="bg-[#f8fbff] py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.experienceTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.experienceTitle}
              </h2>
            )}
            {p?.experienceDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.experienceDescription}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-blue-100/60"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#173b68] mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-[#5a6d8a]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          6. 远程咨询流程 - 有数据才显示
      ════════════════════════════════════════ */}
      {remoteSteps.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.remoteProcessTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.remoteProcessTitle}
              </h2>
            )}
            {p?.remoteProcessDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.remoteProcessDescription}
              </p>
            )}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
              <div className="space-y-6">
                {remoteSteps.map((step, i) => (
                  <div key={i} className="relative flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                      {step.stepNumber || i + 1}
                    </div>
                    <div className="bg-[#f8fbff] rounded-xl p-5 flex-1 ring-1 ring-blue-100/60">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-[#173b68]">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full">
                            {step.duration}
                          </span>
                        )}
                      </div>
                      {step.description && (
                        <p className="text-sm text-[#5a6d8a]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          7. 客户常见需求 - 有数据才显示
      ════════════════════════════════════════ */}
      {needsItems.length > 0 && (
        <section className="bg-[#f8fbff] py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.needsTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.needsTitle}
              </h2>
            )}
            {p?.needsDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.needsDescription}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {needsItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 ring-1 ring-blue-100/60"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="font-semibold text-[#173b68]">
                      {item.title}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-sm text-[#5a6d8a]">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          8. 转化模块 - 有数据才显示
      ════════════════════════════════════════ */}
      {(p?.conversionTitle || p?.conversionDescription) && (
        <section className="relative bg-gradient-to-r from-[#1a3a6b] to-[#2563eb] py-12 lg:py-16 overflow-hidden">
          {p?.conversionBackgroundImage?.image && (
            <Image
              src={contentImageUrl(
                p.conversionBackgroundImage.image as unknown as Parameters<
                  typeof contentImageUrl
                >[0]
              )}
              alt={p.conversionBackgroundImage.alt || ""}
              fill
              className="object-cover opacity-10"
              loading="lazy"
            />
          )}
          <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {conversion.title}
                </h2>
                <p className="text-blue-200 mb-6">{conversion.description}</p>
                {p?.conversionFields && p.conversionFields.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.conversionFields.map((field, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {field}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <ConsultationForm source="ivf-services" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          9. 区域案例 - 有数据才显示
      ════════════════════════════════════════ */}
      {caseItems.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.regionalCasesTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.regionalCasesTitle}
              </h2>
            )}
            {p?.regionalCasesDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.regionalCasesDescription}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#f8fbff] rounded-xl p-6 ring-1 ring-blue-100/60"
                >
                  {item.image?.image && (
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={contentImageUrl(
                          item.image.image as unknown as Parameters<
                            typeof contentImageUrl
                          >[0]
                        )}
                        alt={item.image.alt || item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    {item.city && (
                      <span className="text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full">
                        {item.city}
                      </span>
                    )}
                    {item.profile && (
                      <span className="text-xs text-[#8a9bb5]">
                        {item.profile}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#173b68] mb-2">
                    {item.title}
                  </h3>
                  {item.challenge && (
                    <p className="text-sm text-[#5a6d8a] mb-2">
                      <span className="font-medium">挑战：</span>
                      {item.challenge}
                    </p>
                  )}
                  {item.serviceSupport && (
                    <p className="text-sm text-[#5a6d8a] mb-2">
                      <span className="font-medium">服务支持：</span>
                      {item.serviceSupport}
                    </p>
                  )}
                  {item.resultDescription && (
                    <p className="text-xs text-[#4b6fa8] border-t border-blue-100 pt-2 mt-2">
                      {item.resultDescription}
                    </p>
                  )}
                  {item.buttonText && (
                    <Link
                      href={item.buttonLink || "#consultation"}
                      className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
                    >
                      {item.buttonText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          10. FAQ - 有数据才显示
      ════════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <section className="bg-[#f8fbff] py-12 lg:py-16">
          <div className="container mx-auto max-w-[1180px] px-4 lg:px-8">
            {p?.faqTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-[#173b68] text-center mb-4">
                {p.faqTitle}
              </h2>
            )}
            {p?.faqDescription && (
              <p className="text-[#5a6d8a] text-center mb-10 max-w-2xl mx-auto">
                {p.faqDescription}
              </p>
            )}
            <div className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl overflow-hidden group ring-1 ring-blue-100/60"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <h3 className="font-semibold text-[#173b68] pr-4 text-[15px]">
                      {item.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-[#8a9bb5] flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-[#5a6d8a] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          11. 预约模块
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        {p?.appointmentBackgroundImage?.image && (
          <Image
            src={contentImageUrl(
              p.appointmentBackgroundImage.image as unknown as Parameters<
                typeof contentImageUrl
              >[0]
            )}
            alt={p.appointmentBackgroundImage.alt || ""}
            fill
            className="object-cover opacity-10"
            loading="lazy"
          />
        )}
        <div className="container relative mx-auto max-w-[1180px] px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {appointment.title}
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              {appointment.description}
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <ConsultationForm source="ivf-services-appointment" />
          </div>
        </div>
      </section>
    </>
  );
}

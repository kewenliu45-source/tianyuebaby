import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ChevronDown,
  Clock,
  User,
  Calendar,
  MessageCircle,
  Shield,
  Heart,
  CheckCircle2,
  ExternalLink,
  MapPin,
  FileSearch,
  Stethoscope,
  Scale,
  Users,
  Fingerprint,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { buildPageMetadata } from "@/lib/social-metadata";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { fetchPrivateCustomizationPageData } from "@/sanity/lib/fetchers";
import { contentImageUrl, bannerImageUrl } from "@/sanity/lib/image";
import type { PrivateCustomizationPage, ImageWithAlt } from "@/types/sanity";

// ── 最小化 SEO Fallback ──

const FALLBACK_SEO = {
  title: "私人订制辅助生殖方案与个性化生育规划 | 天悦宝贝",
  description:
    "天悦宝贝提供私人订制辅助生殖方案咨询服务，涵盖个性化生育规划、性别需求咨询、双胎需求评估、海外合法合规方案、三代试管与胚胎检测咨询、医学评估与全程流程陪伴，帮助家庭在合法合规前提下做出知情决策。",
};

// ── Icon 映射 ──

function getIcon(name?: string) {
  switch (name) {
    case "user":
      return <User className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "heart":
      return <Heart className="w-5 h-5" />;
    case "clock":
      return <Clock className="w-5 h-5" />;
    case "phone":
      return <Phone className="w-5 h-5" />;
    case "message":
      return <MessageCircle className="w-5 h-5" />;
    case "file":
      return <FileSearch className="w-5 h-5" />;
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    case "scale":
      return <Scale className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "fingerprint":
      return <Fingerprint className="w-5 h-5" />;
    default:
      return <CheckCircle2 className="w-5 h-5" />;
  }
}

// ── 辅助函数 ──

function getImageUrl(
  img: ImageWithAlt | undefined,
  fallback: "banner" | "content" = "content"
): string | null {
  if (!img?.image) return null;
  return fallback === "banner"
    ? bannerImageUrl(
        img.image as unknown as Parameters<typeof bannerImageUrl>[0]
      )
    : contentImageUrl(
        img.image as unknown as Parameters<typeof contentImageUrl>[0]
      );
}

const FALLBACK_CONTENT_IMAGES = [
  "/images/site/clinic-reception.png",
  "/images/site/embryology-lab.png",
  "/images/site/doctor-consultation.png",
  "/images/site/microscope-workstation.png",
  "/images/site/care-team.png",
  "/images/site/newborn-family.png",
  "/images/site/hospital-corridor.png",
  "/images/site/documents-review.png",
];

function getFallbackContentImage(index: number) {
  return FALLBACK_CONTENT_IMAGES[index % FALLBACK_CONTENT_IMAGES.length];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

// ── 目录自动生成 ──

function generateTocFromContent(
  blocks?: PrivateCustomizationPage["contentBlocks"]
) {
  if (!blocks?.length) return [];
  return blocks
    .filter((b) => b.anchor && b.title)
    .map((b) => ({ title: b.title!, anchor: b.anchor! }));
}

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { privateCustomizationPage: p, siteSettings } =
    await fetchPrivateCustomizationPageData();
  const seo = p?.seo;

  return buildPageMetadata({
    title: p?.pageTitle || FALLBACK_SEO.title,
    description: p?.pageDescription || FALLBACK_SEO.description,
    pathname: "/private-customization",
    seo,
    siteSettings,
    image: p?.heroImage?.image,
    imageAlt: p?.heroImage?.alt,
  });
}

// ── Content Block 渲染器 ──

function ContentBlockRenderer({
  block,
  index,
}: {
  block: NonNullable<PrivateCustomizationPage["contentBlocks"]>[number];
  index: number;
}) {
  const { blockType, title, subtitle, body, items, cardTone } = block;

  const toneClasses = {
    blue: "border-l-[#2563eb]",
    warning: "border-l-amber-400",
    success: "border-l-emerald-400",
    neutral: "border-l-gray-300",
  };

  const toneBg = {
    blue: "bg-blue-50",
    warning: "bg-amber-50",
    success: "bg-emerald-50",
    neutral: "bg-gray-50",
  };

  const borderClass = toneClasses[cardTone || "blue"];
  const bgClass = toneBg[cardTone || "blue"];

  switch (blockType) {
    case "textImage": {
      const imageUrl =
        getImageUrl(block.image, "content") || getFallbackContentImage(index);
      const isLeft = block.imagePosition === "left";
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-4 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {imageUrl && (
              <div
                className={`relative aspect-[4/3] rounded-lg overflow-hidden ${isLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}
              >
                <Image
                  src={imageUrl}
                  alt={block.image?.alt || title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                {block.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-2">
                    {block.caption}
                  </p>
                )}
              </div>
            )}
            <div
              className={`${isLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"} ${!imageUrl ? "lg:col-span-2" : ""}`}
            >
              {body &&
                body.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[18px] leading-[1.9] text-[#374151] mb-7"
                  >
                    {para}
                  </p>
                ))}
            </div>
          </div>
        </div>
      );
    }

    case "fullImage": {
      const imageUrl =
        getImageUrl(block.image, "banner") || getFallbackContentImage(index);
      return (
        <div className="mb-10">
          {imageUrl && (
            <div className="relative aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={block.image?.alt || title || ""}
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>
          )}
          {block.caption && (
            <p className="text-sm text-[#8a9bb5] mt-2 text-center">
              {block.caption}
            </p>
          )}
        </div>
      );
    }

    case "infoCard":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items?.map((item, i) => {
              const itemImageUrl =
                getImageUrl(item.image, "content") ||
                getFallbackContentImage(index + i + 1);

              return (
                <div
                  key={i}
                  className={`${bgClass} overflow-hidden rounded-lg border-l-4 ${borderClass}`}
                >
                  {itemImageUrl && (
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={itemImageUrl}
                        alt={item.image?.alt || item.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 390px"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#2563eb] shadow-sm">
                        {getIcon(item.icon)}
                      </div>
                      {item.title && (
                        <h3 className="font-semibold text-[#173b68]">
                          {item.title}
                        </h3>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-[#5a6d8a] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items?.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-5 text-center ring-1 ring-blue-100/60"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#2563eb] mb-1">
                  {item.value}
                </p>
                {item.title && (
                  <p className="text-sm font-semibold text-[#173b68] mb-1">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "processTimeline":
      return (
        <div className="mb-10">
          {title && (
            <h2
              className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4"
              id={block.anchor}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#5a6d8a] mb-6 pl-4">{subtitle}</p>
          )}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-200 hidden md:block" />
            <div className="space-y-6">
              {items?.map((item, i) => {
                const itemImageUrl =
                  getImageUrl(item.image, "content") ||
                  getFallbackContentImage(index + i + 2);

                return (
                  <div key={i} className="relative flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-sm shadow-md shadow-blue-600/20">
                      {i + 1}
                    </div>
                    <div className="bg-white rounded-lg ring-1 ring-blue-100/60 flex-1 overflow-hidden">
                      {itemImageUrl && (
                        <div className="relative aspect-[16/7] w-full">
                          <Image
                            src={itemImageUrl}
                            alt={item.image?.alt || item.title || ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 720px"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold text-[#173b68] mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-[#5a6d8a] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case "doctorProfile":
      return null;

    case "caseStudy":
      return null;

    case "inlineCta":
      return (
        <div className="mb-10">
          <div
            className="bg-gradient-to-r from-[#1a3a6b] to-[#2563eb] rounded-xl p-8 text-center"
            id={block.anchor}
          >
            {title && (
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            )}
            {subtitle && <p className="text-blue-200 mb-4">{subtitle}</p>}
            {body && (
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{body}</p>
            )}
            {block.buttonText && (
              <Link
                href={block.buttonLink || "#consultation"}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              >
                {block.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ── Sidebar 组件 ──

function Sidebar({
  data,
  doctor,
}: {
  data: PrivateCustomizationPage;
  doctor: PrivateCustomizationPage;
}) {
  const hasContactInfo =
    data.sidebarTitle ||
    data.sidebarDescription ||
    data.sidebarPrimaryButtonText;

  return (
    <aside className="space-y-6">
      {/* 咨询表单 */}
      <div id="consultation">
        <ConsultationForm source="private-customization" />
      </div>

      {/* 快速联系 - 有数据才显示 */}
      {hasContactInfo && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          {data.sidebarTitle && (
            <h3 className="text-base font-semibold text-[#173b68] mb-3">
              {data.sidebarTitle}
            </h3>
          )}
          {data.sidebarDescription && (
            <p className="text-sm text-[#5a6d8a] mb-4">
              {data.sidebarDescription}
            </p>
          )}
          <div className="space-y-3">
            {data.sidebarPrimaryButtonText && (
              <Link
                href={data.sidebarPrimaryButtonLink || "#consultation"}
                className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {data.sidebarPrimaryButtonText}
              </Link>
            )}
            {data.sidebarSecondaryButtonText && (
              <Link
                href={data.sidebarSecondaryButtonLink || "#content-start"}
                className="flex items-center gap-2 w-full justify-center rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {data.sidebarSecondaryButtonText}
              </Link>
            )}
          </div>
          {data.sidebarPhone && (
            <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6d8a]">
              <Phone className="w-4 h-4 text-[#2563eb]" />
              <span>
                {data.sidebarPhoneLabel || "咨询热线"}：{data.sidebarPhone}
              </span>
            </div>
          )}
          {data.sidebarWechatText && (
            <div className="mt-2 flex items-center gap-2 text-sm text-[#5a6d8a]">
              <MessageCircle className="w-4 h-4 text-[#2563eb]" />
              <span>{data.sidebarWechatText}</span>
            </div>
          )}
          {data.sidebarWhatsappText && (
            <div className="mt-2 flex items-center gap-2 text-sm text-[#5a6d8a]">
              <ExternalLink className="w-4 h-4 text-[#2563eb]" />
              <span>{data.sidebarWhatsappText}</span>
            </div>
          )}
        </div>
      )}

      {/* 医生/顾问 - 有数据才显示 */}
      {doctor.doctorName && (
        <div className="bg-[#f8fbff] rounded-xl p-5 ring-1 ring-blue-100/60">
          <div className="flex items-center gap-3 mb-3">
            {doctor.doctorAvatar?.image ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={contentImageUrl(
                    doctor.doctorAvatar.image as unknown as Parameters<
                      typeof contentImageUrl
                    >[0]
                  )}
                  alt={doctor.doctorAvatar.alt || doctor.doctorName || ""}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-[#2563eb]" />
              </div>
            )}
            <div>
              <p className="font-semibold text-[#173b68] text-sm">
                {doctor.doctorName}
              </p>
              {doctor.doctorTitle && (
                <p className="text-xs text-[#2563eb]">{doctor.doctorTitle}</p>
              )}
            </div>
          </div>
          {doctor.doctorExperience && (
            <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
              {doctor.doctorExperience}
            </p>
          )}
          {doctor.doctorSpecialties && doctor.doctorSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {doctor.doctorSpecialties.map((s) => (
                <span
                  key={s}
                  className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-[#2563eb]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          {doctor.doctorButtonText && (
            <Link
              href={doctor.doctorButtonLink || "#consultation"}
              className="mt-4 flex items-center gap-2 w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#2563eb] ring-1 ring-blue-200 hover:bg-blue-50 transition-colors"
            >
              {doctor.doctorButtonText}
            </Link>
          )}
        </div>
      )}

      {/* 热门文章 - 有数据才显示 */}
      {data.sidebarHotArticles && data.sidebarHotArticles.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            热门文章
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarHotArticles.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 相关推荐 - 有数据才显示 */}
      {data.sidebarRelatedLinks && data.sidebarRelatedLinks.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            相关推荐
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarRelatedLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 热门国家 - 有数据才显示 */}
      {data.sidebarCountries && data.sidebarCountries.length > 0 && (
        <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
          <h3 className="text-base font-semibold text-[#173b68] mb-3">
            热门国家
          </h3>
          <ul className="space-y-2.5">
            {data.sidebarCountries.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 mt-1 flex-shrink-0" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

// ── Page Component ──

export default async function PrivateCustomizationPage() {
  const { siteSettings, privateCustomizationPage: p } =
    await fetchPrivateCustomizationPageData();

  const phone = siteSettings?.phone || "400-123-4567";

  // 使用 Sanity 数据，仅保留最小化 fallback
  const hero = {
    title: p?.heroTitle || FALLBACK_SEO.title.split(" | ")[0],
    subtitle:
      p?.heroSubtitle ||
      "因人而异 · 合法合规 · 专业评估 · 一对一顾问全程陪伴",
    description:
      p?.heroDescription ||
      "天悦宝贝为有个性化生育需求的家庭提供私人订制辅助生殖咨询服务。",
    primaryButtonText: p?.heroPrimaryButtonText || "立即咨询",
    primaryButtonLink: p?.heroPrimaryButtonLink || "#consultation",
    secondaryButtonText: p?.heroSecondaryButtonText || "预约方案评估",
    secondaryButtonLink: p?.heroSecondaryButtonLink || "#content-start",
  };

  // 目录：优先使用 Sanity 配置，否则从 contentBlocks 自动生成
  const tocItems =
    p?.tocItems?.length
      ? p.tocItems
      : generateTocFromContent(p?.contentBlocks);

  // 正文模块：必须从 Sanity 读取
  const contentBlocks = p?.contentBlocks || [];

  // 案例模块：有数据才显示
  const caseItems = p?.caseItems || [];

  // FAQ：有数据才显示
  const faqItems = p?.faqItems || [];
  const faqTitle = p?.faqTitle || "常见问题";
  const faqDescription = p?.faqDescription || "";

  // 最终 CTA
  const finalCta = {
    title: p?.finalCtaTitle || "开始了解私人订制方案",
    description:
      p?.finalCtaDescription ||
      "专业的咨询顾问随时为您服务，帮助您了解个性化辅助生殖方案。",
    primaryButtonText: p?.finalCtaPrimaryButtonText || "立即咨询",
    primaryButtonLink: p?.finalCtaPrimaryButtonLink || "#consultation",
    secondaryButtonText: p?.finalCtaSecondaryButtonText || "预约方案评估",
    secondaryButtonLink: p?.finalCtaSecondaryButtonLink || "#content-start",
  };

  const publishedAt = formatDate(p?.publishedAt);
  const readingTime = p?.readingTime || "10 分钟阅读";
  const authorName = p?.authorName || "天悦宝贝顾问团队";
  const heroImageUrl =
    getImageUrl(p?.heroImage, "banner") ||
    "/images/site/brand-consult-bg.png";
  const mobileHeroImageUrl =
    getImageUrl(p?.mobileHeroImage, "banner") || heroImageUrl;
  const finalCtaBgUrl =
    getImageUrl(p?.finalCtaBackgroundImage, "banner") ||
    "/images/site/brand-consult-bg.png";

  return (
    <>
      {/* 结构化数据 */}
      {faqItems.length > 0 && (
        <FaqJsonLd
          items={faqItems.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      )}
      <ArticleJsonLd
        title={p?.pageTitle || FALLBACK_SEO.title}
        description={p?.pageDescription || FALLBACK_SEO.description}
        image={heroImageUrl || undefined}
        datePublished={publishedAt}
        dateModified={publishedAt}
        authorName={authorName}
        url="https://www.tianyuebaby.com/private-customization"
      />

      {/* ════════════════════════════════════════
          1. Hero Banner
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 500 }}>
        {heroImageUrl ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileHeroImageUrl} />
            <Image
              src={heroImageUrl}
              alt={p?.heroImage?.alt || hero.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </picture>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fe] via-white to-[#f0f6ff]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,37,72,0.85)] via-[rgba(26,58,107,0.75)] to-[rgba(26,58,107,0.6)]" />

        <div
          className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 py-16 lg:py-20 flex flex-col justify-center"
          style={{ minHeight: 500 }}
        >
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium">私人订制</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 mb-3">{hero.subtitle}</p>
            <p className="text-[15px] text-white/70 leading-relaxed mb-5">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-8">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {authorName}
                {p?.authorTitle && (
                  <span className="text-white/40">· {p.authorTitle}</span>
                )}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <PhoneConsultButton
                phone={phone}
                className="rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
                iconClassName="w-4 h-4"
                label={hero.primaryButtonText}
              />
              <Link
                href={hero.secondaryButtonLink}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {hero.secondaryButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 目录导航 - 有数据才显示
      ════════════════════════════════════════ */}
      {tocItems.length > 0 && (
        <section className="bg-white border-b border-blue-100/60">
          <div className="container mx-auto max-w-[1200px] px-4 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto text-sm">
              <span className="text-[#8a9bb5] shrink-0 mr-1">目录：</span>
              {tocItems.map((item, i) => (
                <Link
                  key={i}
                  href={`#${item.anchor}`}
                  className="shrink-0 px-3 py-1.5 rounded-full text-[#5a6d8a] hover:text-[#2563eb] hover:bg-blue-50 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          3. 主体区：左侧正文 + 右侧 Sidebar
      ════════════════════════════════════════ */}
      <section id="content-start" className="bg-[#f8fbff] py-12 lg:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* 左侧正文 */}
            <main>
              {contentBlocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} index={i} />
              ))}

              {/* 案例模块 - 有数据才显示 */}
              {caseItems.length > 0 && (
                <div className="mb-10" id="cases">
                  <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
                    咨询案例参考
                  </h2>
                  <p className="text-[#5a6d8a] mb-6 pl-4">
                    以下案例仅供参考，已做去隐私化处理，不构成任何承诺。
                    每个人的情况不同，实际效果需由医生根据个人状况评估。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {caseItems.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-5 ring-1 ring-blue-100/60"
                      >
                        {item.image?.image && (
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                            <Image
                              src={contentImageUrl(
                                item.image.image as unknown as Parameters<
                                  typeof contentImageUrl
                                >[0]
                              )}
                              alt={item.image.alt || item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-[#173b68] mb-2">
                          {item.title}
                        </h3>
                        {item.profile && (
                          <span className="inline-block text-xs text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full mb-3">
                            {item.profile}
                          </span>
                        )}
                        {item.story && (
                          <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3">
                            {item.story}
                          </p>
                        )}
                        {item.resultDescription && (
                          <p className="text-xs text-[#4b6fa8] border-t border-blue-100 pt-3 mb-2">
                            {item.resultDescription}
                          </p>
                        )}
                        {item.testimonial && (
                          <p className="text-sm text-[#5a6d8a] italic leading-relaxed">
                            &ldquo;{item.testimonial}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ - 有数据才显示 */}
              {faqItems.length > 0 && (
                <div className="mb-10" id="faq">
                  <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
                    {faqTitle}
                  </h2>
                  {faqDescription && (
                    <p className="text-[#5a6d8a] mb-6 pl-4">{faqDescription}</p>
                  )}
                  <div className="space-y-3">
                    {faqItems.map((item, i) => (
                      <details
                        key={i}
                        className="bg-white rounded-lg overflow-hidden group ring-1 ring-blue-100/60"
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
              )}
            </main>

            {/* 右侧 Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar
                  data={p || ({} as PrivateCustomizationPage)}
                  doctor={p || ({} as PrivateCustomizationPage)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 移动端 Sidebar */}
      <section className="lg:hidden bg-white py-12">
        <div className="container mx-auto max-w-[1200px] px-4">
          <Sidebar
            data={p || ({} as PrivateCustomizationPage)}
            doctor={p || ({} as PrivateCustomizationPage)}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. 最终 CTA
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        {finalCtaBgUrl && (
          <Image
            src={finalCtaBgUrl}
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
            <PhoneConsultButton
              phone={phone}
              className="rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
              iconClassName="w-4 h-4"
              label={finalCta.primaryButtonText}
            />
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

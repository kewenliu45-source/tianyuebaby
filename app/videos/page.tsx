import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Calendar,
  MessageCircle,
  MapPin,
  Clock,
  Play,
  User,
} from "lucide-react";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchVideosPageData } from "@/sanity/lib/fetchers";
import { cardImageUrl, bannerImageUrl, contentImageUrl } from "@/sanity/lib/image";
import type { VideosPage, ScienceVideo, ImageWithAlt } from "@/types/sanity";

// ── 默认 SEO ──

const DEFAULT_SEO = {
  title: "科普视频中心 | 天悦宝贝",
  description:
    "天悦宝贝科普视频中心，提供辅助生殖、试管婴儿、冻卵等专业知识视频讲解，帮助您全面了解生育相关信息。",
};

// ── 默认 Hero ──

const DEFAULT_HERO = {
  title: "科普视频中心",
  subtitle: "专业知识 · 视频讲解 · 全面了解",
  description:
    "通过专业讲解视频，系统了解辅助生殖技术、试管婴儿流程、冻卵知识等核心内容，帮助您做出知情决策。",
  primaryButtonText: "咨询详情",
  primaryButtonLink: "#consultation",
};

// ── 默认 Sidebar ──

const DEFAULT_SIDEBAR = {
  title: "视频内容咨询",
  description:
    "观看视频后如有疑问，专业顾问随时为您解答，帮助您更清晰地了解方案选择。",
  primaryButtonText: "在线咨询",
  primaryButtonLink: "#consultation",
  phone: "400-xxx-xxxx",
};

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

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  const { videosPage: p, siteSettings } = await fetchVideosPageData();
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

export default async function VideosPage() {
  const {
    siteSettings,
    videosPage: p,
    scienceVideos,
    categories,
    featuredVideos,
  } = await fetchVideosPageData();

  // 合并 CMS 数据与默认值
  const hero = {
    title: p?.heroTitle || DEFAULT_HERO.title,
    subtitle: p?.heroSubtitle || DEFAULT_HERO.subtitle,
    description: p?.heroDescription || DEFAULT_HERO.description,
    primaryButtonText: p?.heroPrimaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink: p?.heroPrimaryButtonLink || DEFAULT_HERO.primaryButtonLink,
  };

  const sidebar = {
    title: p?.sidebarConsultTitle || DEFAULT_SIDEBAR.title,
    description: p?.sidebarConsultDescription || DEFAULT_SIDEBAR.description,
    primaryButtonText: p?.sidebarConsultButtonText || DEFAULT_SIDEBAR.primaryButtonText,
    primaryButtonLink: p?.sidebarConsultButtonLink || DEFAULT_SIDEBAR.primaryButtonLink,
    phone: p?.sidebarPhone || DEFAULT_SIDEBAR.phone,
  };

  const finalCta = {
    title: p?.finalCtaTitle || DEFAULT_CTA.title,
    description: p?.finalCtaDescription || DEFAULT_CTA.description,
    primaryButtonText: p?.finalCtaPrimaryButtonText || DEFAULT_CTA.primaryButtonText,
    primaryButtonLink: p?.finalCtaPrimaryButtonLink || DEFAULT_CTA.primaryButtonLink,
    secondaryButtonText: p?.finalCtaSecondaryButtonText || DEFAULT_CTA.secondaryButtonText,
    secondaryButtonLink: p?.finalCtaSecondaryButtonLink || DEFAULT_CTA.secondaryButtonLink,
  };

  const heroImageUrl = getImageUrl(p?.heroImage, "banner") || "/images/site/fertility-hero.png";
  const ctaBgUrl = getImageUrl(p?.finalCtaBackgroundImage, "banner") || "/images/site/brand-consult-bg.png";

  const videos = scienceVideos.length > 0 ? scienceVideos : [];
  const featured = featuredVideos.length > 0 ? featuredVideos : [];

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
            <span className="text-white/90 font-medium">科普视频中心</span>
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
          2. 推荐视频区
      ════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="bg-white py-12 lg:py-16 border-b border-blue-100/60">
          <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-[#173b68] mb-2">
              {p?.featuredTitle || "推荐视频"}
            </h2>
            {p?.featuredDescription && (
              <p className="text-[#5a6d8a] text-sm mb-8">{p.featuredDescription}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((video) => {
                const coverUrl = getImageUrl(video.coverImage, "card") || "/images/site/documents-review.png";
                return (
                  <Link
                    key={video._id}
                    href={`/videos/${video.slug.current}`}
                    className="group bg-white rounded-xl overflow-hidden ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={coverUrl}
                        alt={video.coverImage?.alt || video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* 播放按钮 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-[#2563eb] ml-1" fill="currentColor" />
                        </div>
                      </div>
                      {/* 时长 */}
                      {video.duration && (
                        <span className="absolute bottom-2 right-2 text-xs font-medium bg-black/70 text-white px-2 py-0.5 rounded">
                          {video.duration}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#173b68] mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                        {video.title}
                      </h3>
                      {video.excerpt && (
                        <p className="text-sm text-[#5a6d8a] line-clamp-2 mb-2">
                          {video.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-[#8a9bb5]">
                        {video.presenter && (
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {video.presenter}
                          </span>
                        )}
                        {video.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(video.publishedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          3. 主体：左侧视频列表 + 右侧 Sidebar
      ════════════════════════════════════════ */}
      <section className="bg-[#f8fbff] py-12 lg:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#173b68] mb-2 border-l-4 border-l-[#2563eb] pl-4">
              {p?.listTitle || "全部视频"}
            </h2>
            <p className="text-[#5a6d8a] pl-4">
              {p?.listDescription ||
                "系统了解辅助生殖技术的核心知识，帮助您在充分了解信息的基础上做出知情决策。"}
            </p>
          </div>

          {/* 分类筛选 */}
          {p?.categoryFilterEnabled !== false && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-block text-sm px-4 py-2 rounded-full bg-[#2563eb] text-white font-medium">
                全部
              </span>
              {categories.map((cat) => (
                <span
                  key={cat._id}
                  className="inline-block text-sm px-4 py-2 rounded-full bg-white text-[#5a6d8a] ring-1 ring-blue-100/60 font-medium hover:bg-blue-50 hover:text-[#2563eb] transition-colors cursor-pointer"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* 左侧视频列表 */}
            <main>
              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#8a9bb5]">{p?.emptyStateText || "暂无视频数据"}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => {
                    const coverUrl = getImageUrl(video.coverImage, "card") || "/images/site/documents-review.png";
                    return (
                      <Link
                        key={video._id}
                        href={`/videos/${video.slug.current}`}
                        className="group bg-white rounded-xl overflow-hidden ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={coverUrl}
                            alt={video.coverImage?.alt || video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                          {/* 播放按钮 */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 text-[#2563eb] ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                          {/* 时长 */}
                          {video.duration && (
                            <span className="absolute bottom-2 right-2 text-xs font-medium bg-black/70 text-white px-2 py-0.5 rounded">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          {/* 分类标签 */}
                          {video.category && (
                            <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#2563eb] font-medium mb-2">
                              {video.category.name}
                            </span>
                          )}
                          <h3 className="font-semibold text-[#173b68] mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                            {video.title}
                          </h3>
                          {video.excerpt && (
                            <p className="text-sm text-[#5a6d8a] leading-relaxed mb-3 line-clamp-2">
                              {video.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-[#8a9bb5]">
                            <div className="flex items-center gap-3">
                              {video.presenter && (
                                <span className="flex items-center gap-1">
                                  <User className="w-3.5 h-3.5" />
                                  {video.presenter}
                                </span>
                              )}
                            </div>
                            {video.publishedAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(video.publishedAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </main>

            {/* 右侧 Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* 咨询表单 */}
                <div id="consultation">
                  <ConsultationForm source="videos" />
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
                  </div>
                  {sidebar.phone && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6d8a]">
                      <Phone className="w-4 h-4 text-[#2563eb]" />
                      <span>咨询热线：{sidebar.phone}</span>
                    </div>
                  )}
                </div>

                {/* 热门视频 */}
                {featured.length > 0 && (
                  <div className="bg-white rounded-xl ring-1 ring-blue-100/60 p-5">
                    <h3 className="text-base font-semibold text-[#173b68] mb-3">
                      热门视频
                    </h3>
                    <ul className="space-y-3">
                      {featured.slice(0, 5).map((video) => (
                        <li key={video._id}>
                          <Link
                            href={`/videos/${video.slug.current}`}
                            className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0" />
                            <span className="line-clamp-2">{video.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
              <ConsultationForm source="videos" />
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

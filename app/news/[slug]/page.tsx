import { notFound } from "next/navigation";
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
  Star,
  Stethoscope,
  ClipboardList,
  HelpCircle,
} from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { PortableTextRenderer } from "@/components/shared/portable-text";
import { ConsultationForm } from "@/components/shared/consultation-form";
import {
  fetchNewsDetailPageData,
  fetchNewsSlugs,
} from "@/sanity/lib/fetchers";
import {
  urlForImage,
  articleImageUrl,
  cardImageUrl,
  contentImageUrl,
} from "@/sanity/lib/image";
import type { NewsPage } from "@/types/sanity";

// ── 默认 Sidebar 数据 ──

const DEFAULT_CONSULT = {
  title: "需要了解辅助生殖方案？",
  description: "留下联系方式，顾问会尽快联系您。",
  buttonText: "立即咨询",
  buttonLink: "/start-your-journey",
};

const DEFAULT_RESOURCE = {
  title: "整合国际医疗资源",
  description:
    "围绕海外辅助生殖、合作医疗资源、流程评估，为家庭提供清晰的信息参考。",
};

const DEFAULT_EXPERTS = {
  title: "多学科专家服务",
  description: "多学科顾问团队，为不同需求的家庭提供专业支持。",
  items: [
    { title: "辅助生殖顾问", description: "方案评估与流程指导", icon: "users" },
    {
      title: "资料评估顾问",
      description: "检查报告整理与分析",
      icon: "clipboard",
    },
    { title: "妇科医生咨询", description: "生育力评估与建议", icon: "stethoscope" },
    { title: "心理咨询支持", description: "情绪疏导与心理陪伴", icon: "heart" },
  ],
};

const DEFAULT_FEATURED = {
  title: "精选资讯",
  items: [
    { title: "高龄备孕方案评估", href: "/third-generation-ivf" },
    { title: "三代试管前需要准备什么", href: "/third-generation-ivf" },
    { title: "海外辅助生殖如何选择国家", href: "/overseas-fertility" },
  ],
};

const DEFAULT_SERVICE = {
  title: "服务通道",
  items: [
    { title: "在线咨询", href: "/start-your-journey", icon: "message" },
    { title: "预约指导", href: "/journey", icon: "calendar" },
    { title: "询问价格", href: "/start-your-journey", icon: "phone" },
  ],
};

const DEFAULT_CTA = {
  title: "天悦宝贝顾问在线答疑",
  description:
    "如需了解辅助生殖方案，可留下联系方式，顾问会尽快联系您。咨询过程完全保密。",
};

// ── Icon 映射 ──

function getExpertIcon(name?: string) {
  switch (name) {
    case "users":
      return <Users className="w-4 h-4" />;
    case "clipboard":
      return <ClipboardList className="w-4 h-4" />;
    case "stethoscope":
      return <Stethoscope className="w-4 h-4" />;
    case "heart":
      return <Heart className="w-4 h-4" />;
    case "shield":
      return <Shield className="w-4 h-4" />;
    case "award":
      return <Award className="w-4 h-4" />;
    case "star":
      return <Star className="w-4 h-4" />;
    default:
      return <HelpCircle className="w-4 h-4" />;
  }
}

function getServiceIcon(name?: string) {
  switch (name) {
    case "message":
      return <MessageCircle className="w-4 h-4" />;
    case "calendar":
      return <Calendar className="w-4 h-4" />;
    case "phone":
      return <Phone className="w-4 h-4" />;
    case "map":
      return <MapPin className="w-4 h-4" />;
    default:
      return <ArrowRight className="w-4 h-4" />;
  }
}

// ── Sidebar 组件（服务端） ──

function DetailSidebar({
  newsPage,
  relatedArticles,
}: {
  newsPage?: NewsPage | null;
  relatedArticles: { _id: string; title: string; slug: { current: string } }[];
}) {
  // A. 在线咨询
  const consult = {
    title: newsPage?.sidebarConsultTitle || DEFAULT_CONSULT.title,
    description:
      newsPage?.sidebarConsultDescription || DEFAULT_CONSULT.description,
    buttonText:
      newsPage?.sidebarConsultButtonText || DEFAULT_CONSULT.buttonText,
    buttonLink:
      newsPage?.sidebarConsultButtonLink || DEFAULT_CONSULT.buttonLink,
  };

  // B. 医疗资源
  const resource = {
    title: newsPage?.sidebarResourceTitle || DEFAULT_RESOURCE.title,
    description:
      newsPage?.sidebarResourceDescription || DEFAULT_RESOURCE.description,
  };
  const resourceImageUrl = newsPage?.sidebarResourceImage?.image
    ? contentImageUrl(
        newsPage.sidebarResourceImage.image as unknown as Parameters<
          typeof contentImageUrl
        >[0]
      )
    : null;
  const resourceImageAlt =
    newsPage?.sidebarResourceImage?.alt || resource.title;

  // C. 多学科服务
  const experts = {
    title: newsPage?.sidebarExpertsTitle || DEFAULT_EXPERTS.title,
    description:
      newsPage?.sidebarExpertsDescription || DEFAULT_EXPERTS.description,
    items: newsPage?.sidebarExpertItems?.length
      ? newsPage.sidebarExpertItems
      : DEFAULT_EXPERTS.items,
  };

  // D. 精选资讯（用相关新闻替代）
  const featuredTitle = newsPage?.sidebarFeaturedTitle || DEFAULT_FEATURED.title;
  const featuredItems =
    relatedArticles.length > 0
      ? relatedArticles.slice(0, 3).map((a) => ({
          title: a.title,
          href: `/news/${a.slug.current}`,
        }))
      : DEFAULT_FEATURED.items;

  // E. 服务通道
  const service = {
    title: newsPage?.sidebarServiceTitle || DEFAULT_SERVICE.title,
    items: newsPage?.sidebarServiceItems?.length
      ? newsPage.sidebarServiceItems
      : DEFAULT_SERVICE.items,
  };

  return (
    <div className="space-y-6">
      {/* A. 在线咨询卡 */}
      <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-2">
          {consult.title}
        </h3>
        <p className="text-sm text-[#5a6d8a] mb-4">{consult.description}</p>
        <div className="space-y-2.5">
          <Link
            href={consult.buttonLink}
            className="flex items-center gap-2 w-full justify-center rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {consult.buttonText}
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
        {resourceImageUrl ? (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={resourceImageUrl}
              alt={resourceImageAlt}
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
            {resource.title}
          </h3>
          <p className="text-sm text-[#5a6d8a] leading-relaxed">
            {resource.description}
          </p>
        </div>
      </div>

      {/* C. 多学科服务卡 */}
      <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-1">
          {experts.title}
        </h3>
        <p className="text-xs text-[#8a9bb5] mb-4">{experts.description}</p>
        <ul className="space-y-3">
          {experts.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-[#5a6d8a]"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                {getExpertIcon(item.icon)}
              </div>
              <div>
                <p className="font-medium text-[#173b68] text-sm">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* D. 精选资讯 / 相关推荐 */}
      <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-4">
          {featuredTitle}
        </h3>
        <ul className="space-y-3">
          {featuredItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className="flex items-start gap-2 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* E. 服务通道卡 */}
      <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-5">
        <h3 className="text-base font-semibold text-[#173b68] mb-4">
          {service.title}
        </h3>
        <ul className="space-y-2.5">
          {service.items.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href || "/start-your-journey"}
                className="flex items-center gap-2.5 text-sm text-[#5a6d8a] hover:text-[#2563eb] transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                  {getServiceIcon(item.icon)}
                </div>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── 页面 ──

export async function generateStaticParams() {
  const slugs = await fetchNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { article } = await fetchNewsDetailPageData(slug);

  if (!article) {
    return { title: "文章未找到" };
  }

  const seo = article.seo;
  return {
    title: seo?.metaTitle || article.title,
    description: seo?.metaDescription || article.excerpt,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.ogTitle || article.title,
      description: seo?.ogDescription || article.excerpt,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { siteSettings, newsPage, article, relatedArticles } =
    await fetchNewsDetailPageData(slug);

  if (!article) {
    notFound();
  }

  const phone = siteSettings?.phone || "400-123-4567";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  // 底部 CTA
  const cta = {
    title: newsPage?.consultationTitle || DEFAULT_CTA.title,
    description: newsPage?.consultationDescription || DEFAULT_CTA.description,
  };
  const ctaBgUrl = newsPage?.consultationBackgroundImage?.image
    ? contentImageUrl(
        newsPage.consultationBackgroundImage.image as unknown as Parameters<
          typeof contentImageUrl
        >[0]
      )
    : null;

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt || ""}
        image={
          article.coverImage?.image
            ? urlForImage(
                article.coverImage.image as unknown as Parameters<
                  typeof urlForImage
                >[0]
              ).url()
            : undefined
        }
        datePublished={article.publishedAt}
        authorName="天悦宝贝"
        url={`https://tiancibaobei.com/news/${slug}`}
      />

      {/* ════════════════════════════════════════
          1. Breadcrumb
      ════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#e5e7eb]">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#8a9bb5]">
            <Link href="/" className="hover:text-[#2563eb] transition-colors">
              首页
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/news"
              className="hover:text-[#2563eb] transition-colors"
            >
              新闻资讯
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#173b68] font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. 主体：文章 + Sidebar
      ════════════════════════════════════════ */}
      <section className="py-10 lg:py-14 bg-[#f8fbff]">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* 左侧文章 */}
            <article>
              {/* 文章头部 */}
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-[#173b68] leading-tight mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a9bb5]">
                  {article.category && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] font-medium">
                      {article.category.name}
                    </span>
                  )}
                  {article.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.publishedAt).toLocaleDateString(
                        "zh-CN"
                      )}
                    </span>
                  )}
                </div>
              </header>

              {/* 封面图 */}
              {article.coverImage?.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                  <Image
                    src={articleImageUrl(
                      article.coverImage.image as unknown as Parameters<
                        typeof articleImageUrl
                      >[0]
                    )}
                    alt={article.coverImage.alt || article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 820px"
                    priority
                  />
                </div>
              )}

              {/* 正文 */}
              <div className="bg-white rounded-xl ring-1 ring-[#e5e7eb] p-6 lg:p-8">
                <div className="prose prose-lg max-w-none text-[17px] leading-[1.85] text-[#374151]">
                  {article.content && article.content.length > 0 ? (
                    <PortableTextRenderer content={article.content} />
                  ) : (
                    <p className="text-[#8a9bb5]">暂无正文内容</p>
                  )}
                </div>

                {/* 合规提示 */}
                <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
                  <p className="text-xs text-[#8a9bb5] leading-relaxed">
                    内容仅供科普参考，不替代医生面对面诊断或个体化治疗建议。如有健康疑问，请咨询专业医疗机构。
                  </p>
                </div>
              </div>

              {/* 相关文章 */}
              {relatedArticles.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-[#173b68] mb-5">
                    相关文章
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related._id}
                        href={`/news/${related.slug.current}`}
                        className="group bg-white rounded-xl overflow-hidden ring-1 ring-[#e5e7eb] hover:ring-[#2563eb]/30 hover:shadow-lg transition-all"
                      >
                        {related.coverImage?.image ? (
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={cardImageUrl(
                                related.coverImage.image as unknown as Parameters<
                                  typeof cardImageUrl
                                >[0]
                              )}
                              alt={
                                related.coverImage.alt || related.title
                              }
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-blue-100" />
                        )}
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-[#173b68] line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                            {related.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* 右侧 Sidebar — 桌面端 sticky */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <DetailSidebar
                  newsPage={newsPage}
                  relatedArticles={relatedArticles}
                />
              </div>
            </aside>
          </div>

          {/* 移动端 Sidebar — 文章下方 */}
          <div className="lg:hidden mt-10">
            <DetailSidebar
              newsPage={newsPage}
              relatedArticles={relatedArticles}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. 底部咨询 CTA
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 lg:py-18">
        {ctaBgUrl ? (
          <Image
            src={ctaBgUrl}
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
                {cta.title}
              </h2>
              <p className="text-blue-200 leading-relaxed">{cta.description}</p>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-lg border border-white/30 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                电话咨询
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-xl">
              <ConsultationForm source="news-detail" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

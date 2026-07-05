import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  Tag,
  User,
  AlertCircle,
} from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { PortableTextRenderer } from "@/components/shared/portable-text";
import {
  fetchSuccessCaseDetailPageData,
  fetchSuccessCaseSlugs,
} from "@/sanity/lib/fetchers";
import { urlForImage, articleImageUrl, cardImageUrl } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await fetchSuccessCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { successCase } = await fetchSuccessCaseDetailPageData(slug);

  if (!successCase) {
    return { title: "案例未找到" };
  }

  const seo = successCase.seo;
  return {
    title: seo?.metaTitle || `${successCase.title} | 成功案例`,
    description: seo?.metaDescription || successCase.excerpt,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.ogTitle || successCase.title,
      description: seo?.ogDescription || successCase.excerpt,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
  };
}

export default async function SuccessCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { siteSettings, successCase, relatedCases } =
    await fetchSuccessCaseDetailPageData(slug);

  if (!successCase) {
    notFound();
  }

  const phone = siteSettings?.phone || "400-xxx-xxxx";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  return (
    <>
      <ArticleJsonLd
        title={successCase.title}
        description={successCase.excerpt || successCase.resultSummary || ""}
        image={
          successCase.coverImage?.image
            ? urlForImage(
                successCase.coverImage.image as unknown as Parameters<
                  typeof urlForImage
                >[0]
              ).url()
            : undefined
        }
        datePublished={successCase.publishedAt || new Date().toISOString()}
        authorName="天悦宝贝"
        url={`https://tiancibaobei.com/success-cases/${slug}`}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 360 }}>
        {successCase.coverImage?.image ? (
          <Image
            src={articleImageUrl(
              successCase.coverImage.image as unknown as Parameters<
                typeof articleImageUrl
              >[0]
            )}
            alt={successCase.coverImage.alt || successCase.title}
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
          style={{ minHeight: 360 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link
              href="/success-cases"
              className="hover:text-white transition-colors"
            >
              成功案例
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium line-clamp-1">
              {successCase.title}
            </span>
          </nav>

          <div className="max-w-2xl">
            {/* 标签 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {successCase.serviceType && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">
                  <Tag className="w-3 h-3" />
                  {successCase.serviceType}
                </span>
              )}
              {successCase.clientProfile && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80">
                  <User className="w-3 h-3" />
                  {successCase.clientProfile}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {successCase.title}
            </h1>

            {successCase.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="w-4 h-4" />
                <time dateTime={successCase.publishedAt}>
                  {new Date(successCase.publishedAt).toLocaleDateString(
                    "zh-CN"
                  )}
                </time>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 案例内容 */}
      <article className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* 返回链接 */}
            <Link
              href="/success-cases"
              className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#1d4ed8] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回成功案例
            </Link>

            {/* 摘要 */}
            {successCase.excerpt && (
              <div className="mb-8 p-5 rounded-xl bg-[#f8fbff] ring-1 ring-blue-100/60">
                <p className="text-[18px] leading-[1.9] text-[#374151]">
                  {successCase.excerpt}
                </p>
              </div>
            )}

            {/* 案例正文 */}
            <div className="prose prose-lg max-w-none">
              {successCase.content && successCase.content.length > 0 ? (
                <PortableTextRenderer content={successCase.content} />
              ) : successCase.resultSummary ? (
                <p className="text-[18px] leading-[1.9] text-[#374151]">
                  {successCase.resultSummary}
                </p>
              ) : (
                <p className="text-[#8a9bb5]">暂无详细内容</p>
              )}
            </div>

            {/* 结果说明 */}
            {successCase.resultSummary && successCase.content && successCase.content.length > 0 && (
              <div className="mt-8 p-5 rounded-xl bg-[#f8fbff] ring-1 ring-blue-100/60">
                <h3 className="text-lg font-semibold text-[#173b68] mb-2">
                  结果说明
                </h3>
                <p className="text-[15px] leading-relaxed text-[#5a6d8a]">
                  {successCase.resultSummary}
                </p>
              </div>
            )}

            {/* 免责声明 */}
            <div className="mt-8 p-5 rounded-xl bg-amber-50 ring-1 ring-amber-200/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                案例已做去隐私化处理，结果因人而异，不构成医疗承诺。每个人的身体状况和需求不同，实际效果需由专业医生根据个人情况进行评估。如需了解适合您的方案，请咨询专业顾问。
              </p>
            </div>

            {/* 标签 */}
            {successCase.tags && successCase.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {successCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs px-3 py-1.5 rounded-full bg-blue-50 text-[#2563eb] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* 相关推荐 */}
      {relatedCases.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#f8fbff]">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-[#173b68] text-center mb-8">
              相关案例
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedCases.map((related) => (
                <Link
                  key={related._id}
                  href={`/success-cases/${related.slug.current}`}
                  className="bg-white rounded-xl overflow-hidden ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                >
                  {related.coverImage?.image ? (
                    <div className="relative aspect-video">
                      <Image
                        src={cardImageUrl(
                          related.coverImage.image as unknown as Parameters<
                            typeof cardImageUrl
                          >[0]
                        )}
                        alt={related.coverImage.alt || related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100" />
                  )}
                  <div className="p-4">
                    {related.serviceType && (
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] mb-2">
                        {related.serviceType}
                      </span>
                    )}
                    <h3 className="font-semibold text-[#173b68] line-clamp-2">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-sm text-[#5a6d8a] line-clamp-2 mt-2">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 咨询 CTA */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            开始了解适合您的方案
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            每个家庭的情况都是独特的。专业的咨询顾问随时为您服务，帮助您更清晰地了解方案选择，做出适合自己的知情决策。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              电话咨询
            </a>
            <Link
              href="/start-your-journey"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              开始咨询
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

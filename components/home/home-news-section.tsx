import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cardImageUrl } from "@/sanity/lib/image";
import type { NewsArticle } from "@/types/sanity";

interface HomeNewsSectionProps {
  newsTitle?: string;
  /** 手动选稿列表（已按 sortOrder 排列） */
  featuredNews?: NewsArticle[];
  /** 回退：最新推荐新闻 */
  fallbackNews: NewsArticle[];
  isVisible?: boolean;
}

const DEFAULT_COVER = "/images/site/documents-review.png";

/** 格式化日期 */
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/** 获取封面图 URL */
function getCoverSrc(article: NewsArticle): string {
  return article.coverImage?.image
    ? cardImageUrl(
        article.coverImage.image as unknown as Parameters<typeof cardImageUrl>[0]
      )
    : DEFAULT_COVER;
}

// ─────────────────────────────────────────────
// 中间主新闻卡片（4:5 竖版封面）
// ─────────────────────────────────────────────
function MainNewsCard({ article }: { article: NewsArticle }) {
  const src = getCoverSrc(article);
  const alt = article.coverImage?.alt || article.title;

  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
    >
      {/* 4:5 竖版封面图 */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 30vw"
          loading="lazy"
        />
        {/* 底部渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* 文字覆盖层 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <h3 className="text-lg lg:text-xl font-bold text-white leading-snug line-clamp-2 mb-2 drop-shadow">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-white/[0.85] leading-relaxed line-clamp-2 mb-2 drop-shadow-sm">
              {article.excerpt}
            </p>
          )}
          {article.publishedAt && (
            <time
              dateTime={article.publishedAt}
              className="text-xs text-white/70"
            >
              {formatDate(article.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// 侧栏横向新闻卡片
// ─────────────────────────────────────────────
function SideNewsCard({ article }: { article: NewsArticle }) {
  const src = getCoverSrc(article);
  const alt = article.coverImage?.alt || article.title;

  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group flex rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex-1 min-h-0"
    >
      {/* 左侧缩略图（约 35-40%） */}
      <div className="relative w-[38%] shrink-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="160px"
          loading="lazy"
        />
      </div>
      {/* 右侧文字区 */}
      <div className="flex-1 min-w-0 flex flex-col justify-center px-3.5 py-3">
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-1.5">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-1.5">
            {article.excerpt}
          </p>
        )}
        {article.publishedAt && (
          <time
            dateTime={article.publishedAt}
            className="text-[11px] text-muted-foreground/70"
          >
            {formatDate(article.publishedAt)}
          </time>
        )}
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// 侧栏列（3 条纵向排列，总高度对齐中间 4:5）
// ─────────────────────────────────────────────
function SideColumn({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {articles.map((article) => (
        <SideNewsCard key={article._id} article={article} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 主组件
// ─────────────────────────────────────────────
export function HomeNewsSection({
  newsTitle,
  featuredNews,
  fallbackNews,
  isVisible,
}: HomeNewsSectionProps) {
  if (isVisible === false) return null;

  // 优先使用手动选稿，回退到最新推荐
  const articles =
    featuredNews && featuredNews.length > 0 ? featuredNews : fallbackNews;

  if (articles.length === 0) return null;

  // 按位置分配：第 1 篇 = 主新闻，第 2-4 = 左侧，第 5-7 = 右侧
  const mainArticle = articles[0];
  const leftArticles = articles.slice(1, 4);
  const rightArticles = articles.slice(4, 7);
  const sideArticles = [...leftArticles, ...rightArticles];

  return (
    <section className="bg-[#f2f6fb] py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 标题 */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          {newsTitle || "新闻资讯"}
        </h2>

        {/* ── 桌面端：3 + 1 + 3 三栏 ── */}
        <div
          className="hidden lg:grid gap-6 max-w-7xl mx-auto"
          style={{
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(260px, 0.8fr) minmax(0, 1fr)",
          }}
        >
          {/* 左侧 3 条 */}
          {leftArticles.length > 0 && (
            <SideColumn articles={leftArticles} />
          )}

          {/* 中间主新闻（4:5 竖版封面） */}
          <div className="aspect-[4/5]">
            <MainNewsCard article={mainArticle} />
          </div>

          {/* 右侧 3 条 */}
          {rightArticles.length > 0 && (
            <SideColumn articles={rightArticles} />
          )}
        </div>

        {/* ── 手机 / 平板端：主新闻 + 横向列表 ── */}
        <div className="flex lg:hidden flex-col gap-5">
          {/* 主新闻 4:5 */}
          <div className="max-w-sm mx-auto w-full aspect-[4/5]">
            <MainNewsCard article={mainArticle} />
          </div>

          {/* 其余横向新闻 */}
          {sideArticles.length > 0 && (
            <div className="flex flex-col gap-3">
              {sideArticles.map((article) => (
                <SideNewsCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* 查看更多 */}
        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            查看更多新闻
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

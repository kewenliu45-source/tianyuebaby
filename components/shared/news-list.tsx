"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
import { cardImageUrl, contentImageUrl } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { NewsArticle, NewsCategory, NewsPage } from "@/types/sanity";

interface NewsListProps {
  articles: NewsArticle[];
  pinnedArticles: NewsArticle[];
  categories: NewsCategory[];
  newsPage?: NewsPage | null;
}

const PAGE_SIZE = 8;

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
    { title: "资料评估顾问", description: "检查报告整理与分析", icon: "clipboard" },
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

// ── Sidebar 组件 ──

function NewsSidebar({
  newsPage,
  pinnedArticles,
}: {
  newsPage?: NewsPage | null;
  pinnedArticles: NewsArticle[];
}) {
  // A. 在线咨询
  const consult = {
    title: newsPage?.sidebarConsultTitle || DEFAULT_CONSULT.title,
    description: newsPage?.sidebarConsultDescription || DEFAULT_CONSULT.description,
    buttonText: newsPage?.sidebarConsultButtonText || DEFAULT_CONSULT.buttonText,
    buttonLink: newsPage?.sidebarConsultButtonLink || DEFAULT_CONSULT.buttonLink,
  };

  // B. 医疗资源
  const resource = {
    title: newsPage?.sidebarResourceTitle || DEFAULT_RESOURCE.title,
    description: newsPage?.sidebarResourceDescription || DEFAULT_RESOURCE.description,
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
    description: newsPage?.sidebarExpertsDescription || DEFAULT_EXPERTS.description,
    items: newsPage?.sidebarExpertItems?.length
      ? newsPage.sidebarExpertItems
      : DEFAULT_EXPERTS.items,
  };

  // D. 精选资讯
  const featuredTitle = newsPage?.sidebarFeaturedTitle || DEFAULT_FEATURED.title;
  const featuredItems =
    pinnedArticles.length > 0
      ? pinnedArticles.slice(0, 3).map((a) => ({
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
            <li key={i} className="flex items-center gap-3 text-sm text-[#5a6d8a]">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-[#2563eb]">
                {getExpertIcon(item.icon)}
              </div>
              <div>
                <p className="font-medium text-[#173b68] text-sm">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-[#8a9bb5]">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* D. 精选资讯卡 */}
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

// ── 主组件 ──

export function NewsList({
  articles,
  pinnedArticles,
  categories,
  newsPage,
}: NewsListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 合并置顶和普通文章，置顶在前
  const allArticles = useMemo(() => {
    const pinned = pinnedArticles.map((a) => a._id);
    const nonPinned = articles.filter((a) => !pinned.includes(a._id));
    return [...pinnedArticles, ...nonPinned];
  }, [articles, pinnedArticles]);

  // 按分类筛选
  const filteredArticles = useMemo(() => {
    if (!activeCategory) return allArticles;
    return allArticles.filter(
      (article) => article.category?._id === activeCategory
    );
  }, [allArticles, activeCategory]);

  // 分页
  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  // 生成页码数组（当前页附近 ±2）
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  return (
    <>
      {/* 分类筛选 */}
      {categories.length > 0 && (
        <section className="py-6 bg-white border-b border-[#e5e7eb]">
          <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange(null)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm transition-colors",
                  activeCategory === null
                    ? "bg-[#2563eb] text-white"
                    : "text-[#5a6d8a] hover:text-[#2563eb] hover:bg-blue-50"
                )}
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategoryChange(category._id)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm transition-colors",
                    activeCategory === category._id
                      ? "bg-[#2563eb] text-white"
                      : "text-[#5a6d8a] hover:text-[#2563eb] hover:bg-blue-50"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 主体：左侧列表 + 右侧 Sidebar */}
      <section className="py-12 lg:py-16 bg-[#f8fbff]">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* 左侧文章列表 */}
            <main>
              {paginatedArticles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[#8a9bb5]">暂无新闻文章</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {paginatedArticles.map((article) => (
                    <Link
                      key={article._id}
                      href={`/news/${article.slug.current}`}
                      className="group bg-white rounded-xl overflow-hidden ring-1 ring-[#e5e7eb] hover:ring-[#2563eb]/30 hover:shadow-lg transition-all flex flex-col sm:flex-row"
                    >
                      {/* 缩略图 */}
                      {article.coverImage?.image ? (
                        <div className="relative w-full sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto sm:h-[160px]">
                          <Image
                            src={cardImageUrl(
                              article.coverImage.image as unknown as Parameters<
                                typeof cardImageUrl
                              >[0]
                            )}
                            alt={article.coverImage.alt || article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 224px"
                            loading="lazy"
                          />
                          {article.isPinned && (
                            <span className="absolute top-3 left-3 text-[11px] px-2 py-0.5 rounded bg-[#2563eb] text-white font-medium">
                              置顶
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-full sm:w-56 shrink-0 aspect-[16/10] sm:aspect-auto sm:h-[160px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                          <Heart className="w-10 h-10 text-[#2563eb]/20" />
                        </div>
                      )}

                      {/* 内容 */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* 分类 + 日期 */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {article.category && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] font-medium">
                              {article.category.name}
                            </span>
                          )}
                          {article.publishedAt && (
                            <span className="text-xs text-[#8a9bb5] flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(
                                article.publishedAt
                              ).toLocaleDateString("zh-CN")}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-semibold text-[#173b68] mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-sm text-[#5a6d8a] leading-relaxed line-clamp-2 mb-3">
                            {article.excerpt}
                          </p>
                        )}

                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] group-hover:gap-2 transition-all">
                            查看详情
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-10">
                  {/* 首页 */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1.5 rounded-lg text-xs text-[#5a6d8a] hover:bg-white hover:text-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="首页"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  {/* 上一页 */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-2.5 py-1.5 rounded-lg text-xs text-[#5a6d8a] hover:bg-white hover:text-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="上一页"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {/* 页码 */}
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                        page === currentPage
                          ? "bg-[#2563eb] text-white shadow-sm"
                          : "text-[#5a6d8a] hover:bg-white hover:text-[#2563eb]"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  {/* 下一页 */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1.5 rounded-lg text-xs text-[#5a6d8a] hover:bg-white hover:text-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="下一页"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* 末页 */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1.5 rounded-lg text-xs text-[#5a6d8a] hover:bg-white hover:text-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="末页"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </main>

            {/* 右侧 Sidebar — 桌面端 sticky */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <NewsSidebar
                  newsPage={newsPage}
                  pinnedArticles={pinnedArticles}
                />
              </div>
            </aside>
          </div>

          {/* 移动端 Sidebar — 列表下方 */}
          <div className="lg:hidden mt-10">
            <NewsSidebar
              newsPage={newsPage}
              pinnedArticles={pinnedArticles}
            />
          </div>
        </div>
      </section>
    </>
  );
}

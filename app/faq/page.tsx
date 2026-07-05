import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { PageBanner } from "@/components/shared/page-banner";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { FaqList } from "@/components/shared/faq-list";
import { fetchFaqPageData } from "@/sanity/lib/fetchers";

const DEFAULT_TITLE = "常见问题";
const DEFAULT_DESC =
  "了解助孕服务的常见问题和解答，帮助您更好地了解我们的服务。";

export async function generateMetadata(): Promise<Metadata> {
  const { faqPage, siteSettings } = await fetchFaqPageData();
  const seo = faqPage?.seo;
  const fallback = siteSettings?.defaultSeo;

  return {
    title: seo?.metaTitle || DEFAULT_TITLE,
    description: seo?.metaDescription || DEFAULT_DESC,
    keywords: seo?.keywords || fallback?.keywords,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || DEFAULT_TITLE,
      description: seo?.ogDescription || seo?.metaDescription || DEFAULT_DESC,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
    ...(seo?.canonicalUrl && { alternates: { canonical: seo.canonicalUrl } }),
  };
}

export default async function FaqPage() {
  const { siteSettings, faqPage, faqItems, categories } =
    await fetchFaqPageData();

  const phone = siteSettings?.phone || "400-123-4567";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  return (
    <>
      {faqItems.length > 0 && (
        <FaqJsonLd
          items={faqItems.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
        />
      )}

      {/* Banner */}
      <PageBanner
        banners={faqPage?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* FAQ 列表（客户端交互：分类筛选 + 折叠） */}
      <FaqList
        faqItems={faqItems}
        categories={categories}
        pageTitle={faqPage?.pageTitle}
      />

      {/* 咨询入口 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {faqPage?.cta?.title || "还有其他问题？"}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {faqPage?.cta?.description ||
              "联系我们，我们的专业顾问将为您解答所有疑问。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              电话咨询
            </a>
            <Link
              href={faqPage?.cta?.buttonLink || "/start-your-journey"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {faqPage?.cta?.buttonText || "开始咨询"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/site/doctor-consultation.png"
                alt="医生顾问解答辅助生殖咨询问题"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                没找到想了解的问题？
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                每个家庭的身体情况、时间安排和方案选择都不同。您可以把检查报告、既往经历和主要疑问发给顾问，我们会协助您梳理信息，再根据实际情况提供更具体的咨询建议。
              </p>
            </div>
          </div>
        </div>
      </section>

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

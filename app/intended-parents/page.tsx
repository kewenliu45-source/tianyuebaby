import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { PageBanner } from "@/components/shared/page-banner";
import { fetchIntendedParentsPageData } from "@/sanity/lib/fetchers";
import { cn } from "@/lib/utils";

const DEFAULT_TITLE = "关于准父母";
const DEFAULT_DESC =
  "了解助孕服务的适合人群、常见需求和准备事项，为您提供专业的助孕咨询服务。";

export async function generateMetadata(): Promise<Metadata> {
  const { intendedParents, siteSettings } =
    await fetchIntendedParentsPageData();
  const seo = intendedParents?.seo;
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

export default async function IntendedParentsPage() {
  const { siteSettings, intendedParents } =
    await fetchIntendedParentsPageData();

  const phone = siteSettings?.phone || "400-123-4567";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  // 默认数据
  const defaultSuitableFor = [
    {
      title: "高龄备孕",
      description: "35岁以上希望生育的家庭",
      icon: "clock",
    },
    {
      title: "多次试管失败",
      description: "经历多次试管婴儿尝试的家庭",
      icon: "refresh",
    },
    {
      title: "特殊生育需求",
      description: "有特殊生育需求的家庭",
      icon: "heart",
    },
    {
      title: "二胎三胎家庭",
      description: "希望再生育一个宝宝的家庭",
      icon: "baby",
    },
  ];

  const defaultNeeds = [
    { title: "专业医疗建议", description: "需要专业的医疗方案评估" },
    { title: "全程陪伴服务", description: "希望有人全程陪同指导" },
    { title: "资源匹配", description: "需要匹配优质医疗资源" },
    { title: "心理支持", description: "需要心理上的关怀与支持" },
  ];

  const defaultPreparation = [
    { title: "身体检查", description: "完成必要的身体检查", icon: "stethoscope" },
    { title: "资料准备", description: "准备相关医疗资料", icon: "file" },
    { title: "心理准备", description: "做好心理上的准备", icon: "brain" },
    { title: "经济准备", description: "了解相关费用", icon: "wallet" },
  ];

  const suitableFor = intendedParents?.suitableForItems || defaultSuitableFor;
  const needs = intendedParents?.needsItems || defaultNeeds;
  const preparation = intendedParents?.preparationItems || defaultPreparation;

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={intendedParents?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 适合人群 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {intendedParents?.suitableForTitle || "适合人群"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suitableFor.map((item, index) => (
              <div
                key={index}
                className="bg-muted rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 常见需求 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {intendedParents?.needsTitle || "常见需求"}
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {needs.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 准备事项 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {intendedParents?.preparationTitle || "准备事项"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preparation.map((item, index) => (
              <div
                key={index}
                className="bg-muted rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务边界 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              {intendedParents?.boundariesTitle || "服务边界说明"}
            </h2>
            <div className="bg-white rounded-xl p-8">
              <p className="text-muted-foreground leading-relaxed">
                {intendedParents?.boundariesContent ||
                  "我们提供的是助孕咨询服务，包括方案评估、资源匹配、行程安排和全程陪伴等。我们会根据您的具体情况，为您提供专业的建议和帮助。请注意，我们不提供医疗服务本身，而是作为您的咨询顾问，帮助您更好地了解和选择适合的方案。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 咨询入口 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {intendedParents?.cta?.title || "准备好了吗？"}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {intendedParents?.cta?.description ||
              "联系我们，获取专业的助孕咨询服务。"}
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
              href={intendedParents?.cta?.buttonLink || "/start-your-journey"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {intendedParents?.cta?.buttonText || "开始咨询"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

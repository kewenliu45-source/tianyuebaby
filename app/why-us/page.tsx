import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Award, Shield, Users, Heart } from "lucide-react";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { PageBanner } from "@/components/shared/page-banner";
import { fetchWhyUsPageData } from "@/sanity/lib/fetchers";
import { cn } from "@/lib/utils";
import { buildPageMetadata, getBannerShareImage } from "@/lib/social-metadata";

const DEFAULT_TITLE = "为什么选择我们";
const DEFAULT_DESC =
  "了解天悦宝贝的专业优势、服务标准和合作资源，选择值得信赖的助孕咨询服务。";

export async function generateMetadata(): Promise<Metadata> {
  const { whyUs, siteSettings } = await fetchWhyUsPageData();
  const seo = whyUs?.seo;

  return buildPageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    pathname: "/why-us",
    seo,
    siteSettings,
    image: getBannerShareImage(whyUs?.banners),
  });
}

export default async function WhyUsPage() {
  const { siteSettings, whyUs } = await fetchWhyUsPageData();

  const phone = siteSettings?.phone || "400-123-4567";

  const defaultAdvantages = [
    {
      title: "专业团队",
      description: "资深医疗顾问团队，提供一对一专业咨询",
      icon: "users",
    },
    {
      title: "全程陪伴",
      description: "从咨询到完成，全程贴心陪伴服务",
      icon: "heart",
    },
    {
      title: "安全保障",
      description: "严格筛选合作机构，确保服务安全可靠",
      icon: "shield",
    },
    {
      title: "高成功率",
      description: "丰富的成功经验，助力实现父母梦想",
      icon: "award",
    },
  ];

  const defaultStandards = [
    { title: "信息透明", description: "所有流程和费用公开透明" },
    { title: "隐私保护", description: "严格保护客户隐私信息" },
    { title: "合规经营", description: "严格遵守相关法律法规" },
    { title: "持续服务", description: "提供长期的后续支持服务" },
  ];

  const defaultStats = [
    { value: "15+", label: "年行业经验" },
    { value: "1000+", label: "成功案例" },
    { value: "98%", label: "客户满意度" },
    { value: "24h", label: "全程服务" },
  ];

  const advantages = whyUs?.advantages || defaultAdvantages;
  const standards = whyUs?.standards || defaultStandards;
  const stats = whyUs?.stats || defaultStats;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-6 h-6" />;
      case "heart":
        return <Heart className="w-6 h-6" />;
      case "shield":
        return <Shield className="w-6 h-6" />;
      case "award":
        return <Award className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={whyUs?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 机构介绍 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {whyUs?.introTitle || "关于天悦宝贝"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {whyUs?.introContent ||
                "天悦宝贝（国际）助孕中心是一家专注于助孕咨询服务的机构。我们致力于为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。凭借多年的行业经验和丰富的资源网络，我们已帮助众多家庭实现了拥有宝宝的梦想。"}
            </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/site/care-team.png"
                alt="天悦宝贝专业顾问团队"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 服务优势 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {whyUs?.advantagesTitle || "服务优势"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {getIcon(advantage.icon)}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作资源 */}
      {whyUs?.resources && whyUs.resources.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {whyUs?.resourcesTitle || "合作资源"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whyUs.resources.map((resource, index) => (
                <div key={index} className="bg-muted rounded-xl p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">
                    {resource.name}
                  </h3>
                  {resource.description && (
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 服务标准 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {whyUs?.standardsTitle || "服务标准"}
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((standard, index) => (
              <div key={index} className="bg-muted rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {standard.title}
                </h3>
                <p className="text-muted-foreground">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数据展示 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {whyUs?.statsTitle || "我们的成绩"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 咨询入口 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {whyUs?.cta?.title || "准备好了吗？"}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {whyUs?.cta?.description ||
              "联系我们，获取专业的助孕咨询服务。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PhoneConsultButton
              phone={phone}
              className="px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            />
            <Link
              href={whyUs?.cta?.buttonLink || "/start-your-journey"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {whyUs?.cta?.buttonText || "开始咨询"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Clock, MessageCircle } from "lucide-react";
import { PageBanner } from "@/components/shared/page-banner";
import { ConsultationForm } from "@/components/shared/consultation-form";
import { fetchStartJourneyPageData } from "@/sanity/lib/fetchers";
import { iconImageUrl } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "走进天悦宝贝",
  description:
    "了解天悦宝贝（国际）助孕中心的品牌理念、团队实力和服务宗旨，选择值得信赖的助孕咨询服务伙伴。",
};

export default async function AboutTianyuePage() {
  const { siteSettings, startJourney } = await fetchStartJourneyPageData();

  const phone = startJourney?.phone || siteSettings?.phone || "400-123-4567";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;
  const serviceHours =
    startJourney?.serviceHours ||
    siteSettings?.serviceHours ||
    "周一至周日 9:00-18:00";
  const wechatQrCode =
    startJourney?.wechatQrCode || siteSettings?.wechatQrCode;
  const consultationNote =
    startJourney?.consultationNote ||
    "我们的专业顾问将为您提供一对一的咨询服务，帮助您了解助孕流程、评估个人情况、制定个性化方案。请放心，所有咨询内容将严格保密。";

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={startJourney?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 品牌介绍 */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              走进天悦宝贝
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              天悦宝贝（国际）助孕中心是一家专注于助孕咨询服务的机构。我们秉承&ldquo;专业、贴心、科学、安全&rdquo;的服务理念，致力于为有需要的家庭提供高质量的助孕方案咨询与全程陪伴服务。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              凭借多年的行业经验和广泛的资源网络，天悦宝贝已成为众多家庭信赖的选择。
            </p>
          </div>
        </div>
      </section>

      {/* 咨询联系 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              联系我们
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 左栏：联系信息 + 咨询说明 */}
              <div className="space-y-8">
                {/* 咨询说明 */}
                <div className="bg-white rounded-xl p-6 lg:p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    咨询说明
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {consultationNote}
                  </p>
                </div>

                {/* 联系电话 */}
                <div className="bg-white rounded-xl p-6 lg:p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    电话咨询
                  </h3>
                  <a
                    href={telHref}
                    className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    {phone}
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{serviceHours}</span>
                  </div>
                </div>

                {/* 微信二维码 */}
                <div className="bg-white rounded-xl p-6 lg:p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    微信咨询
                  </h3>
                  {wechatQrCode ? (
                    <div className="w-44 h-44 mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={iconImageUrl(wechatQrCode as unknown as Parameters<typeof iconImageUrl>[0])}
                        alt="微信二维码"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-44 h-44 mx-auto rounded-lg bg-white border border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        二维码占位
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-3">
                    扫码添加微信咨询
                  </p>
                </div>
              </div>

              {/* 右栏：咨询表单 */}
              <div>
                <ConsultationForm source="about-tianyue" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

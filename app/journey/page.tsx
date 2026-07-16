import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { PhoneConsultButton } from "@/components/shared/phone-consult-button";
import { PageBanner } from "@/components/shared/page-banner";
import { fetchJourneyPageData } from "@/sanity/lib/fetchers";
import { buildPageMetadata, getBannerShareImage } from "@/lib/social-metadata";

const DEFAULT_TITLE = "助孕流程";
const DEFAULT_DESC =
  "了解助孕服务的完整流程，从初步咨询到后续陪伴，我们为您提供全程专业服务。";

export async function generateMetadata(): Promise<Metadata> {
  const { journey, siteSettings } = await fetchJourneyPageData();
  const seo = journey?.seo;

  return buildPageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    pathname: "/journey",
    seo,
    siteSettings,
    image: getBannerShareImage(journey?.banners),
  });
}

export default async function JourneyPage() {
  const { siteSettings, journey } = await fetchJourneyPageData();

  const phone = siteSettings?.phone || "400-123-4567";

  const defaultSteps = [
    {
      title: "初步咨询",
      description: "了解您的需求，解答您的疑问，评估基本情况",
      stepNumber: 1,
      details: ["电话或在线咨询", "了解服务内容", "初步评估需求"],
    },
    {
      title: "需求评估",
      description: "深入了解您的具体情况，制定个性化方案",
      stepNumber: 2,
      details: ["详细需求沟通", "医疗资料分析", "方案可行性评估"],
    },
    {
      title: "方案沟通",
      description: "为您制定详细的助孕方案并充分沟通",
      stepNumber: 3,
      details: ["方案设计", "费用说明", "风险告知"],
    },
    {
      title: "资源协调",
      description: "为您匹配最合适的医疗资源和服务团队",
      stepNumber: 4,
      details: ["医疗资源筛选", "服务团队组建", "行程安排"],
    },
    {
      title: "行程支持",
      description: "全程陪同，确保每个环节顺利进行",
      stepNumber: 5,
      details: ["行程陪同", "翻译协助", "生活安排"],
    },
    {
      title: "后续陪伴",
      description: "持续关注，提供必要的后续支持",
      stepNumber: 6,
      details: ["定期回访", "问题解答", "持续关怀"],
    },
  ];

  const defaultNotes = [
    { title: "保持沟通", description: "及时与顾问沟通您的想法和需求" },
    { title: "配合检查", description: "按要求完成必要的身体检查" },
    { title: "了解风险", description: "充分了解可能的风险和注意事项" },
    { title: "做好准备", description: "做好心理和生活上的准备" },
  ];

  const steps = journey?.steps || defaultSteps;
  const notes = journey?.notes || defaultNotes;

  return (
    <>
      {/* Banner */}
      <PageBanner
        banners={journey?.banners}
        defaultBanner={siteSettings?.defaultBanner}
      />

      {/* 流程步骤 */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {journey?.stepsTitle || "助孕流程"}
          </h2>
          <div className="relative aspect-[16/7] max-w-5xl mx-auto mb-12 overflow-hidden rounded-xl">
            <Image
              src="/images/site/documents-review.png"
              alt="顾问团队协助梳理助孕流程资料"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1000px"
              loading="lazy"
            />
          </div>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.stepNumber || index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意事项 */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            {journey?.notesTitle || "注意事项"}
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {note.title}
                </h3>
                <p className="text-muted-foreground">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 咨询入口 */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            联系我们，获取专业的助孕咨询服务。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PhoneConsultButton
              phone={phone}
              className="px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            />
            <Link
              href="/start-your-journey"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              开始咨询
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

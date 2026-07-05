import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export { ImageOnlyHomeHero as CrispHomeHero } from "./image-only-home-hero";
export type { ImageOnlyHomeHeroProps as CrispHomeHeroProps } from "./image-only-home-hero";

const features = [
  {
    title: "专业团队",
    description: "资深顾问 1对1 服务",
    icon: ShieldCheck,
  },
  {
    title: "个性化方案",
    description: "量身定制 助孕计划",
    icon: HeartHandshake,
  },
  {
    title: "全程陪伴",
    description: "贴心指导 全程无忧",
    icon: ClipboardCheck,
  },
  {
    title: "隐私保障",
    description: "严格保密 安心咨询",
    icon: LockKeyhole,
  },
];

function DeprecatedCrispHomeHero() {
  return (
    <section
      className="relative h-[620px] overflow-hidden bg-[#eef6ff] md:h-[700px] lg:h-[720px]"
      aria-labelledby="home-hero-title"
    >
      <Image
        src="/images/home-hero.png"
        alt="准父母温柔相拥，期待新生命到来"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center] md:object-center"
        unoptimized
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(239,247,255,.82)_0%,rgba(239,247,255,.72)_45%,rgba(239,247,255,.38)_65%,rgba(239,247,255,0)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,rgba(235,243,255,.92),rgba(235,243,255,0))]" />

      <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-5 pt-20 md:px-10 lg:px-12">
        <div className="w-full max-w-[760px] -translate-y-3 md:-translate-y-4">
          <p className="mb-4 text-center text-sm font-semibold tracking-[.18em] text-[#3b72e8] md:text-left md:text-2xl">
            专业 · 贴心 · 科学 · 安全
          </p>
          <h1
            id="home-hero-title"
            className="text-[2.05rem] font-bold leading-[1.18] text-[#173b68] md:text-[4.5rem] lg:text-[5.1rem]"
          >
            天悦宝贝（国际）
            <span className="mt-2 block md:mt-4">助孕中心</span>
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-[#33445f] md:mt-7 md:text-2xl">
            专注助孕咨询服务 · 陪伴每一个家庭的希望之旅
          </p>

          <div className="mt-9 grid max-w-[760px] grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-0">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`text-center ${index > 0 ? "md:border-l md:border-[#d8e5f5]" : ""}`}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/82 text-[#3475ed] shadow-[0_12px_30px_rgba(52,117,237,.12)] ring-1 ring-white/85 md:h-20 md:w-20">
                    <Icon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={2.3} />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-[#233656] md:text-xl">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-xs font-medium text-[#52627b] md:text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="/start-your-journey"
            className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#3475ed] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#2466df] md:mt-12 md:px-10 md:text-xl"
          >
            开启您的好孕之旅
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

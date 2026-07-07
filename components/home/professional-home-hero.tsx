import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { bannerImageUrl } from "@/sanity/lib/image";
import type { HomePage, ImageWithAlt } from "@/types/sanity";

export function ProfessionalHomeHero({
  hero,
  heroImage,
}: {
  hero?: HomePage["hero"] | null;
  heroImage?: ImageWithAlt | null;
}) {
  const desktop = hero?.desktopImage?.image || heroImage?.image;
  const mobile = hero?.mobileImage?.image;
  const src = desktop
    ? bannerImageUrl(desktop as unknown as Parameters<typeof bannerImageUrl>[0])
    : "/images/home-hero.png";
  const mobileSrc = mobile
    ? bannerImageUrl(mobile as unknown as Parameters<typeof bannerImageUrl>[0])
    : src;
  const overlay = Math.min(Math.max(hero?.overlayStrength ?? 72, 35), 90) / 100;
  const badges = hero?.badges?.filter(Boolean).length
    ? hero.badges
    : ["专业团队", "个性化方案", "严格隐私", "全程陪伴"];
  const stats = hero?.stats?.length
    ? hero.stats
    : [
        { value: "15+", label: "年行业服务经验" },
        { value: "30+", label: "全球合作资源" },
        { value: "1对1", label: "专属顾问服务" },
        { value: "24h", label: "顾问快速响应" },
      ];

  return (
    <section
      className="relative min-h-[560px] overflow-hidden bg-[#eaf2fb] lg:min-h-[650px]"
      aria-labelledby="home-hero-title"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <Image
          src={src}
          alt={hero?.desktopImage?.alt || heroImage?.alt || "专业生育咨询与家庭规划服务"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,rgba(7,30,63,${overlay}) 0%,rgba(13,49,91,${overlay * 0.78}) 39%,rgba(17,54,91,${overlay * 0.2}) 72%,transparent 100%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(7,30,63,0.55)] to-transparent" />
      <div className="relative mx-auto flex min-h-[560px] max-w-[1440px] items-center px-5 pb-28 pt-28 sm:px-8 lg:min-h-[650px] lg:px-12 lg:pb-32">
        <div className="max-w-[680px] text-white">
          <p className="mb-5 text-sm font-bold tracking-[.18em] text-[#bcd6ff] md:text-base">
            {hero?.eyebrow || "国际生育咨询与全流程服务"}
          </p>
          <h1
            id="home-hero-title"
            className="text-[2.35rem] font-bold leading-[1.15] tracking-tight drop-shadow-sm sm:text-5xl lg:text-[3.65rem]"
          >
            {hero?.title || "以专业判断，为每个家庭规划清晰的生育路径"}
          </h1>
          <p className="mt-6 max-w-[610px] text-base leading-8 text-white/[0.86] md:text-lg">
            {hero?.description ||
              "汇聚专业顾问与全球医疗资源，从需求评估、方案规划到全流程陪伴，为您提供严谨、私密、个性化的咨询支持。"}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {badges?.slice(0, 4).map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.12] px-3.5 py-2 text-xs font-semibold backdrop-blur-md sm:text-sm"
              >
                <Check className="h-3.5 w-3.5 text-[#9fc5ff]" />
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero?.primaryButtonLink || "/about-tianyue"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3475ed] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/25 transition hover:bg-[#2466df]"
            >
              <MessageCircle className="h-4 w-4" />
              {hero?.primaryButtonText || "预约专业顾问"}
            </Link>
            <Link
              href={hero?.secondaryButtonLink || "/medical-services"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/[0.18]"
            >
              {hero?.secondaryButtonText || "了解服务项目"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.15] bg-[rgba(7,30,63,0.76)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-white/[0.12] px-4 sm:grid-cols-4 sm:px-8 lg:px-12">
          {stats.slice(0, 4).map((stat, index) => (
            <div
              key={`${stat.value}-${index}`}
              className="px-3 py-4 text-center text-white sm:py-5"
            >
              <div className="text-xl font-bold text-[#bcd6ff] sm:text-2xl">{stat.value}</div>
              <div className="mt-1 text-[11px] text-white/68 sm:text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

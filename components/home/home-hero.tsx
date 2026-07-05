import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative h-[620px] overflow-hidden md:h-[700px] lg:h-[720px]" aria-labelledby="home-hero-title">
      <Image
        src="/images/home-hero.png"
        alt="一对准父母温柔拥抱，期待新生命到来"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center] md:object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(237,246,255,.96)_0%,rgba(237,246,255,.72)_44%,rgba(237,246,255,0)_69%)] md:hidden" />

      <div className="relative mx-auto flex h-full max-w-[1360px] items-center px-5 pt-20 md:hidden">
        <div className="max-w-[340px] -translate-y-4">
          <p className="mb-4 text-sm font-semibold tracking-[.18em] text-[#3b72e8]">专业 · 贴心 · 科学 · 安全</p>
          <h1 id="home-hero-title" className="text-[2.05rem] font-bold leading-[1.22] tracking-tight text-[#174b9f]">
            专业助孕 · 圆梦家庭
            <span className="mt-2 block text-[1.55rem]">天悦宝贝（国际）助孕中心</span>
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-[#33445f]">专注助孕咨询服务，陪伴每一个家庭的希望之旅</p>
          <Link href="/start-your-journey" className="mt-7 inline-flex rounded-full bg-[#3475ed] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
            开启您的好孕之旅&nbsp;&nbsp;→
          </Link>
        </div>
      </div>

      <h1 id="home-hero-title-desktop" className="sr-only">专业助孕，圆梦家庭——天悦宝贝（国际）助孕中心</h1>
    </section>
  );
}

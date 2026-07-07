"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { iconImageUrl } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

const links: [string, string, boolean?][] = [
  ["首页", "/"],
  ["三代试管婴儿", "/third-generation-ivf"],
  ["试管服务区域", "/ivf-services"],
  ["冻卵/冻精", "/egg-sperm-freezing"],
  ["第三方辅助生殖", "/third-party-assisted-reproduction", true],
  ["私人订制", "/private-customization", true],
  ["科普视频", "/videos"],
  ["新闻资讯", "/news"],
  ["医疗服务", "/medical-services"],
  ["走进天悦宝贝", "/about-tianyue"],
];

export function SiteHeader({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const transparent = pathname === "/" && !scrolled;
  const brand = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const sanityLogo = siteSettings?.logo?.image;
  const logoSrc = sanityLogo
    ? iconImageUrl(sanityLogo as unknown as Parameters<typeof iconImageUrl>[0])
    : "/images/site/tianyue-logo-mark.png";
  const logoAlt = siteSettings?.logo?.alt || `${brand} Logo`;

  return <header className={`z-50 w-full transition-all duration-300 ${transparent
    ? "absolute top-0 border-b border-white/30 bg-white/60 shadow-[0_4px_24px_rgba(40,95,160,.06)] backdrop-blur-xl"
    : "sticky top-0 border-b border-blue-100/80 bg-white/[0.92] shadow-[0_8px_30px_rgba(40,95,160,.10)] backdrop-blur-xl"
  }`}>
    <div className="mx-auto flex min-h-[82px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-2 lg:px-8">
      {/* ── 品牌 Logo ── */}
      <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={brand}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={74}
          height={53}
          className="h-[48px] w-[67px] shrink-0 object-contain sm:h-[54px] sm:w-[76px]"
          priority
        />
        <span className="hidden leading-tight sm:block">
          <span className={`block text-[14px] font-extrabold tracking-wide lg:text-[16px] ${transparent ? "text-[#2563eb] drop-shadow-[0_1px_2px_rgba(37,99,235,.15)]" : "text-[#1e4fd6]"}`}>
            {brand}
          </span>
          <span className={`mt-1 block text-center text-[10px] font-semibold tracking-[.3em] ${transparent ? "text-[rgba(59,111,224,0.8)]" : "text-[#4b6fa8]"}`}>
            专业&nbsp;&nbsp;贴心&nbsp;&nbsp;科学&nbsp;&nbsp;安全
          </span>
        </span>
      </Link>

      {/* ── 桌面端导航 ── */}
      <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 xl:flex" aria-label="主导航">
        {links.map(([label, href, hot]) => {
          const active = pathname === href;
          return <Link key={href} href={href} className={`relative inline-flex items-center whitespace-nowrap rounded-full px-1.5 py-1.5 text-[12px] font-semibold transition-all ${active
            ? "bg-[#eef3ff] text-[#1843a0] shadow-[inset_0_0_0_1.5px_rgba(37,99,235,.18)]"
            : transparent
              ? "text-[rgba(26,46,82,0.9)] hover:bg-white/50 hover:text-[#1843a0]"
              : "text-[#1a2e52] hover:bg-blue-50/70 hover:text-[#1843a0]"
          }`}>
            {label}
            {hot && <span className="ml-1 inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white shadow-sm">HOT</span>}
          </Link>;
        })}
      </nav>

      {/* ── 移动端菜单按钮 ── */}
      <button type="button" className="shrink-0 rounded-lg p-2 text-[#174b9f] xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "关闭菜单" : "打开菜单"}>{open ? <X /> : <Menu />}</button>
    </div>

    {/* ── 移动端菜单 ── */}
    {open && <nav className="border-t border-blue-100 bg-white/[0.96] px-5 py-4 shadow-xl backdrop-blur-xl xl:hidden">
      {links.map(([label, href, hot]) => {
        const active = pathname === href;
        return <Link key={href} href={href} onClick={() => setOpen(false)} className={`relative flex items-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${active ? "bg-[#eef3ff] text-[#1843a0]" : "text-[#1a2e52] hover:bg-blue-50"}`}>
          {label}
          {hot && <span className="ml-2 inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">HOT</span>}
        </Link>;
      })}
    </nav>}
  </header>;
}

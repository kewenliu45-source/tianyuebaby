"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconImageUrl } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

interface HeaderProps {
  siteSettings?: SiteSettings | null;
}

const fallbackNavItems = [
  { label: "首页", href: "/" },
  { label: "三代试管婴儿", href: "/third-generation-ivf" },
  { label: "海外生殖", href: "/overseas-fertility" },
  { label: "冻卵/冻精", href: "/egg-sperm-freezing" },
  { label: "第三方辅助生殖", href: "/third-party-assisted-reproduction" },
  { label: "私人订制", href: "/private-customization" },
  { label: "科普视频", href: "/videos" },
  { label: "新闻资讯", href: "/news" },
  { label: "医疗服务", href: "/medical-services" },
  { label: "走进天悦宝贝", href: "/about-tianyue" },
];

export function Header({ siteSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const logoImage = siteSettings?.logo?.image;

  // 构建导航项
  const navLabels = siteSettings?.navLabels;
  const navItems = fallbackNavItems;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-white/80 backdrop-blur-md",
        "border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoImage ? (
            <Image
              src={iconImageUrl(logoImage as unknown as Parameters<typeof iconImageUrl>[0])}
              alt={siteSettings?.logo?.alt || brandName}
              width={200}
              height={40}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span className="text-lg lg:text-xl font-bold text-primary tracking-wide">
              {brandName}
            </span>
          )}
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-[#4B5563] hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 移动端导航 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block whitespace-nowrap px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

import Link from "next/link";
import { Phone, Clock } from "lucide-react";
import type { SiteSettings } from "@/types/sanity";

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

const fallbackNavItems = [
  { label: "首页", href: "/" },
  { label: "三代试管婴儿", href: "/third-generation-ivf" },
  { label: "试管服务区域", href: "/ivf-services" },
  { label: "冻卵/冻精", href: "/egg-sperm-freezing" },
  { label: "第三方辅助生殖", href: "/third-party-assisted-reproduction" },
  { label: "私人订制", href: "/private-customization" },
  { label: "成功案例", href: "/success-cases" },
  { label: "新闻资讯", href: "/news" },
  { label: "医疗服务", href: "/medical-services" },
  { label: "走进天悦宝贝", href: "/about-tianyue" },
];

export function Footer({ siteSettings }: FooterProps) {
  const brandName = siteSettings?.siteName || "天悦宝贝（国际）助孕中心";
  const phone = siteSettings?.phone || "400-123-4567";
  const serviceHours = siteSettings?.serviceHours || "周一至周日 9:00-18:00";
  const footerDescription =
    siteSettings?.footerDescription ||
    "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。";
  const icpNumber = siteSettings?.icpNumber || "ICP 备案号占位";
  const copyrightText =
    siteSettings?.copyrightText ||
    `© ${new Date().getFullYear()} ${brandName} 版权所有`;

  // 构建导航项
  const navLabels = siteSettings?.navLabels;
  const navItems = fallbackNavItems;

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 品牌信息 */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-navy-foreground tracking-wide"
            >
              {brandName}
            </Link>
            <p className="mt-4 text-sm text-navy-foreground/70 leading-relaxed">
              {footerDescription}
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-sm font-semibold text-navy-foreground mb-4">
              快速导航
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-foreground/70 transition-colors duration-200 hover:text-navy-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-sm font-semibold text-navy-foreground mb-4">
              联系我们
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${phone.replace(/[\s-]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-navy-foreground/70 transition-colors duration-200 hover:text-navy-foreground"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-navy-foreground/70">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{serviceHours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8 border-t border-navy-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-navy-foreground/50">{copyrightText}</p>
            <p className="text-xs text-navy-foreground/50">{icpNumber}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

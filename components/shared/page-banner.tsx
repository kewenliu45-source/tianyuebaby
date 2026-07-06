"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { bannerImageUrl } from "@/sanity/lib/image";
import type { BannerSlide, SanityImage } from "@/types/sanity";

interface PageBannerProps {
  banners?: BannerSlide[] | null;
  defaultBanner?: BannerSlide | null;
}

export function PageBanner({ banners, defaultBanner }: PageBannerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 确定要显示的 banners
  const activeBanners =
    banners && banners.length > 0
      ? banners.filter((b) => b.isActive !== false)
      : defaultBanner
        ? [defaultBanner]
        : [];

  // 检查是否应该减少动画（初始化时读取，后续监听变化）
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: activeBanners.length > 1 },
    activeBanners.length > 1 && !prefersReducedMotion
      ? [Autoplay({ delay: 5000, stopOnInteraction: true })]
      : []
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // 如果没有 banners，显示默认样式
  if (activeBanners.length === 0) {
    return (
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/site/fertility-hero.png"
          alt="天悦宝贝（国际）助孕中心"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548]/80 via-[#1a3a6b]/60 to-[#1a3a6b]/30" />
        <div className="relative text-center px-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            天悦宝贝（国际）助孕中心
          </h1>
          <p className="mt-4 text-white/85">
            专注助孕咨询服务
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Embla 轮播容器 */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {activeBanners.map((banner, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] w-full h-[300px] md:h-[400px] lg:h-[500px]"
            >
              {/* 背景图片 */}
              <div className="absolute inset-0">
                {/* 桌面图片 — 2560px，覆盖 2x 2K 屏 */}
                {banner.desktopImage ? (
                  <Image
                    src={bannerImageUrl(banner.desktopImage as unknown as Parameters<typeof bannerImageUrl>[0])}
                    alt={banner.alt}
                    fill
                    sizes="100vw"
                    className="object-cover hidden md:block"
                    priority={index === 0}
                  />
                ) : (
                  <Image
                    src="/images/site/fertility-hero.png"
                    alt={banner.alt || "天悦宝贝（国际）助孕中心"}
                    fill
                    sizes="100vw"
                    className="object-cover hidden md:block"
                    priority={index === 0}
                  />
                )}
                {/* 移动图片 — 2560px，Sanity CDN 按 sizes 自动裁切 */}
                {banner.mobileImage ? (
                  <Image
                    src={bannerImageUrl(banner.mobileImage as unknown as Parameters<typeof bannerImageUrl>[0])}
                    alt={banner.alt}
                    fill
                    sizes="100vw"
                    className="object-cover md:hidden"
                    priority={index === 0}
                  />
                ) : banner.desktopImage ? (
                  <Image
                    src={bannerImageUrl(banner.desktopImage as unknown as Parameters<typeof bannerImageUrl>[0])}
                    alt={banner.alt}
                    fill
                    sizes="100vw"
                    className="object-cover md:hidden"
                    priority={index === 0}
                  />
                ) : (
                  <Image
                    src="/images/site/fertility-hero.png"
                    alt={banner.alt || "天悦宝贝（国际）助孕中心"}
                    fill
                    sizes="100vw"
                    className="object-cover md:hidden"
                    priority={index === 0}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548]/75 via-[#1a3a6b]/45 to-transparent" />

              {/* 文案内容 */}
              {(banner.title || banner.subtitle || banner.buttonText) && (
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-2xl">
                      {banner.title && (
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                          {banner.title}
                        </h1>
                      )}
                      {banner.subtitle && (
                        <p className="text-base md:text-lg text-white/90 mb-6">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.buttonText && banner.buttonLink && (
                        <Link
                          href={banner.buttonLink}
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
                        >
                          {banner.buttonText}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 左右箭头 */}
      {activeBanners.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-foreground hover:bg-white transition-colors"
            aria-label="上一张"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-foreground hover:bg-white transition-colors"
            aria-label="下一张"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* 圆点指示器 */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === selectedIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { contentImageUrl } from "@/sanity/lib/image";

interface Region {
  name: string;
  subtitle?: string;
  description?: string;
  image?: { image: unknown; alt?: string };
  serviceHighlights?: string[];
  ctaText?: string;
  ctaLink?: string;
  mapLabel?: string;
  lng?: number;
  lat?: number;
}

interface ServiceRegionsMapProps {
  regions: Region[];
}

// chinaLow.svg viewBox
const SVG_VIEWBOX = { x: 229.27, y: -2.35, w: 812.46, h: 639.7 };

// 中国地图经纬度范围（裁剪到有效区域）
const MAP_BOUNDS = {
  lngMin: 73,
  lngMax: 136,
  latMin: 3,
  latMax: 54,
};

// Mercator 投影：经纬度 → SVG 坐标
function lngLatToSvg(lng: number, lat: number): { x: number; y: number } {
  // 经度线性映射到 SVG x
  const x =
    SVG_VIEWBOX.x +
    ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) *
      SVG_VIEWBOX.w;

  // 纬度使用 Mercator 投影
  const latRad = (lat * Math.PI) / 180;
  const latMinRad = (MAP_BOUNDS.latMin * Math.PI) / 180;
  const latMaxRad = (MAP_BOUNDS.latMax * Math.PI) / 180;

  const mercY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const mercYMin = Math.log(Math.tan(Math.PI / 4 + latMinRad / 2));
  const mercYMax = Math.log(Math.tan(Math.PI / 4 + latMaxRad / 2));

  // SVG y 轴向下，所以反转
  const y =
    SVG_VIEWBOX.y +
    SVG_VIEWBOX.h -
    ((mercY - mercYMin) / (mercYMax - mercYMin)) * SVG_VIEWBOX.h;

  return { x, y };
}

// SVG 坐标 → 百分比位置
function svgToPercent(svgX: number, svgY: number): { left: number; top: number } {
  return {
    left: ((svgX - SVG_VIEWBOX.x) / SVG_VIEWBOX.w) * 100,
    top: ((svgY - SVG_VIEWBOX.y) / SVG_VIEWBOX.h) * 100,
  };
}

// 默认城市坐标
const DEFAULT_COORDS: Record<string, { lng: number; lat: number }> = {
  北京: { lng: 116.4074, lat: 39.9042 },
  上海: { lng: 121.4737, lat: 31.2304 },
  江浙沪: { lng: 120.5853, lat: 31.2989 },
  广东: { lng: 113.2644, lat: 23.1291 },
  深圳: { lng: 114.0579, lat: 22.5431 },
};

function getMarkerPosition(
  region: Region,
  index: number
): { left: number; top: number } {
  const lng = region.lng ?? DEFAULT_COORDS[region.name]?.lng;
  const lat = region.lat ?? DEFAULT_COORDS[region.name]?.lat;

  if (lng != null && lat != null) {
    const svg = lngLatToSvg(lng, lat);
    return svgToPercent(svg.x, svg.y);
  }

  // 备用散列位置
  const fallback = [
    { left: 55, top: 30 },
    { left: 68, top: 48 },
    { left: 65, top: 42 },
    { left: 58, top: 68 },
    { left: 60, top: 72 },
  ];
  return fallback[index % fallback.length];
}

export function ServiceRegionsMap({ regions }: ServiceRegionsMapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 预计算标记位置
  const markers = useMemo(
    () => regions.map((r, i) => ({ ...getMarkerPosition(r, i), region: r, index: i })),
    [regions]
  );

  if (!regions.length) return null;

  return (
    <div className="mb-12">
      {/* 地图区域 */}
      <div className="relative mx-auto max-w-[700px] mb-10">
        <div className="relative w-full" style={{ aspectRatio: "812 / 640" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/site/china-map.svg"
            alt="中国地图 - 服务覆盖区域"
            className="w-full h-auto"
            style={{ filter: "brightness(1.05)" }}
          />

          {/* 标记叠加层 */}
          <div className="absolute inset-0">
            {markers.map(({ left, top, region, index }) => {
              const isHovered = hoveredIndex === index;
              const label = region.mapLabel || region.name;

              return (
                <div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* 发光外圈 */}
                  <div
                    className={`absolute rounded-full transition-all duration-300 ${
                      isHovered ? "scale-150 opacity-60" : "scale-100 opacity-40"
                    }`}
                    style={{
                      width: 28,
                      height: 28,
                      left: -6,
                      top: -6,
                      background:
                        "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
                    }}
                  />
                  {/* 实心圆点 */}
                  <div
                    className={`rounded-full bg-[#2563eb] transition-all duration-300 ${
                      isHovered ? "w-4 h-4" : "w-3 h-3"
                    }`}
                    style={{
                      boxShadow: isHovered
                        ? "0 0 12px rgba(37,99,235,0.5), 0 0 4px rgba(37,99,235,0.3)"
                        : "0 0 8px rgba(37,99,235,0.3)",
                    }}
                  />
                  {/* 标签 */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold transition-all duration-300 ${
                      isHovered
                        ? "text-[#1d4ed8] -top-6"
                        : "text-[#1e3a5f] -top-5"
                    }`}
                    style={{ textShadow: "0 1px 3px rgba(255,255,255,0.8)" }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 地区卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {regions.map((region, i) => {
          const isHovered = hoveredIndex === i;
          const imgSrc = region.image?.image
            ? contentImageUrl(
                region.image.image as Parameters<typeof contentImageUrl>[0]
              )
            : null;

          return (
            <div
              key={i}
              className={`bg-white rounded-xl shadow-sm ring-1 overflow-hidden transition-all duration-300 ${
                isHovered
                  ? "ring-[#2563eb] shadow-lg shadow-blue-100 scale-[1.02]"
                  : "ring-blue-100/60 hover:shadow-md"
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 地区图片 */}
              <div className="relative h-28">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={region.image?.alt || region.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#2563eb]/30">
                      {region.name}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <h3 className="text-sm font-bold text-white">
                    {region.name}
                  </h3>
                  {region.subtitle && (
                    <p className="text-[10px] text-white/80">
                      {region.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-3">
                {region.description && (
                  <p className="text-xs text-[#5a6d8a] leading-relaxed mb-2 line-clamp-2">
                    {region.description}
                  </p>
                )}

                {region.serviceHighlights &&
                  region.serviceHighlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {region.serviceHighlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-[#2563eb]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                {region.ctaText && (
                  <Link
                    href={region.ctaLink || "#consultation"}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    {region.ctaText} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

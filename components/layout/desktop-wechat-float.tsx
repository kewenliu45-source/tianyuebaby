"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconImageUrl } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types/sanity";

interface DesktopWechatFloatProps {
  siteSettings?: SiteSettings | null;
}

export function DesktopWechatFloat({ siteSettings }: DesktopWechatFloatProps) {
  const [showQr, setShowQr] = useState(false);

  const wechatQrCode = siteSettings?.wechatPublicQrCode;

  const qrSrc = wechatQrCode
    ? iconImageUrl(wechatQrCode as unknown as Parameters<typeof iconImageUrl>[0])
    : null;

  return (
    <div className="hidden lg:block fixed right-6 bottom-24 z-40">
      <div
        className="relative"
        onMouseEnter={() => setShowQr(true)}
        onMouseLeave={() => setShowQr(false)}
      >
        {/* 微信公众号按钮 */}
        <button
          type="button"
          onFocus={() => setShowQr(true)}
          onBlur={() => setShowQr(false)}
          className={cn(
            "flex flex-col items-center justify-center",
            "w-14 px-2 py-3 rounded-lg shadow-lg",
            "bg-white border border-border",
            "text-primary hover:text-primary-hover hover:border-primary",
            "transition-all duration-200 hover:scale-105"
          )}
          aria-label="微信咨询"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] mt-1 leading-tight">微信咨询</span>
        </button>

        {/* 二维码浮层 */}
        {showQr && (
          <div
            className={cn(
              "absolute bottom-0 right-full mr-3",
              "w-[200px] p-4 rounded-xl",
              "bg-white border border-border shadow-lg"
            )}
          >
            <p className="text-sm font-semibold text-foreground mb-2 text-center">
              添加微信咨询
            </p>
            {qrSrc ? (
              <div className="w-full aspect-square rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc}
                  alt="公众号二维码"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full aspect-square rounded-lg bg-muted border border-border flex items-center justify-center">
                <span className="text-xs text-muted-foreground">二维码占位</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

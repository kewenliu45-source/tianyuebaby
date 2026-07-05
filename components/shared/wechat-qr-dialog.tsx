"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconImageUrl } from "@/sanity/lib/image";
import type { SanityImage } from "@/types/sanity";

interface WechatQrDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCode?: SanityImage | null;
}

export function WechatQrDialog({
  open,
  onOpenChange,
  qrCode,
}: WechatQrDialogProps) {
  if (!open) return null;

  const qrSrc = qrCode
    ? iconImageUrl(qrCode as unknown as Parameters<typeof iconImageUrl>[0])
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={cn(
          "relative w-[280px] p-6 rounded-2xl",
          "bg-white shadow-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground"
          aria-label="关闭"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-foreground text-center mb-4">
          微信咨询
        </h3>

        {/* 二维码 — 使用普通 img 元素，允许长按保存 */}
        {qrSrc ? (
          <div className="w-full aspect-square rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt="微信二维码"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        ) : (
          <div className="w-full aspect-square rounded-lg bg-muted border border-border flex items-center justify-center">
            <span className="text-sm text-muted-foreground">二维码占位</span>
          </div>
        )}

        {/* 提示文字 */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          长按保存二维码，打开微信扫一扫
        </p>
      </div>
    </div>
  );
}

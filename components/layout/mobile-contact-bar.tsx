"use client";

import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WechatQrDialog } from "@/components/shared/wechat-qr-dialog";
import { PhoneCallDialog } from "@/components/shared/phone-call-dialog";
import type { SiteSettings } from "@/types/sanity";

interface MobileContactBarProps {
  siteSettings?: SiteSettings | null;
}

export function MobileContactBar({ siteSettings }: MobileContactBarProps) {
  const [showWechatDialog, setShowWechatDialog] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);

  const phone = siteSettings?.phone || "400-123-4567";
  const wechatQrCode = siteSettings?.wechatQrCode;

  return (
    <>
      <div
        className={cn(
          "lg:hidden fixed bottom-0 left-0 right-0 z-40",
          "bg-white/95 backdrop-blur-md border-t border-border",
          "px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        )}
      >
        <div className="flex items-center gap-3">
          {/* 电话咨询 */}
          <button
            type="button"
            onClick={() => setShowPhoneDialog(true)}
            className={cn(
              "flex items-center justify-center gap-2",
              "flex-1 h-11 rounded-lg",
              "bg-white border border-primary text-primary",
              "text-sm font-semibold",
              "hover:bg-primary/5 transition-colors"
            )}
          >
            <Phone className="w-4 h-4" />
            <span>电话咨询</span>
          </button>

          {/* 微信咨询 */}
          <button
            type="button"
            onClick={() => setShowWechatDialog(true)}
            className={cn(
              "flex items-center justify-center gap-2",
              "flex-1 h-11 rounded-lg",
              "bg-white border border-primary text-primary",
              "text-sm font-semibold",
              "hover:bg-primary/5 transition-colors"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            <span>微信咨询</span>
          </button>

          {/* 开始咨询 */}
          <a
            href="/start-your-journey"
            className={cn(
              "flex items-center justify-center",
              "flex-1 h-11 rounded-lg",
              "bg-primary text-primary-foreground",
              "text-sm font-semibold",
              "hover:bg-primary-hover transition-colors"
            )}
          >
            开始咨询
          </a>
        </div>
      </div>

      {/* 电话弹窗 */}
      <PhoneCallDialog
        open={showPhoneDialog}
        onOpenChange={setShowPhoneDialog}
        phone={phone}
      />

      {/* 微信二维码弹窗 */}
      <WechatQrDialog
        open={showWechatDialog}
        onOpenChange={setShowWechatDialog}
        qrCode={wechatQrCode}
      />
    </>
  );
}

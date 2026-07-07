"use client";

import { useState } from "react";
import { X, Phone, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
}

export function PhoneCallDialog({
  open,
  onOpenChange,
  phone,
}: PhoneCallDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = phone;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={cn(
          "relative w-[300px] p-6 rounded-2xl",
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

        {/* 图标 */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-semibold text-foreground text-center mb-2">
          电话咨询
        </h3>

        {/* 电话号码 */}
        <p className="text-2xl font-bold text-primary text-center tracking-wide mb-6">
          {phone}
        </p>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          {/* 复制号码 */}
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 h-11 rounded-lg",
              "border border-border text-foreground text-sm font-semibold",
              "hover:bg-muted transition-colors"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制号码
              </>
            )}
          </button>

          {/* 拨打（移动端触发 tel:，桌面端仅提示） */}
          <a
            href={`tel:${phone.replace(/[\s-]/g, "")}`}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 h-11 rounded-lg",
              "bg-primary text-primary-foreground text-sm font-semibold",
              "hover:bg-primary-hover transition-colors"
            )}
          >
            <Phone className="w-4 h-4" />
            立即拨打
          </a>
        </div>

        {/* 提示 */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          服务时间：周一至周日 9:00-18:00
        </p>
      </div>
    </div>
  );
}

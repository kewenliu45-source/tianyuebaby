"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { PhoneCallDialog } from "@/components/shared/phone-call-dialog";
import { cn } from "@/lib/utils";

interface PhoneConsultButtonProps {
  phone: string;
  className?: string;
  iconClassName?: string;
  label?: string;
}

/**
 * 电话咨询按钮 — 点击弹出电话号码弹窗，而非直接触发 tel: 链接。
 * 移动端弹窗内有"立即拨打"按钮可触发 tel:。
 */
export function PhoneConsultButton({
  phone,
  className,
  iconClassName,
  label = "电话咨询",
}: PhoneConsultButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          className
        )}
      >
        <Phone className={cn("w-5 h-5", iconClassName)} />
        {label}
      </button>
      <PhoneCallDialog
        open={open}
        onOpenChange={setOpen}
        phone={phone}
      />
    </>
  );
}

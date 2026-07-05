"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      返回上一页
    </button>
  );
}

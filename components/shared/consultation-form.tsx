"use client";

import { useState, useRef, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  wechat: string;
  city: string;
  consultationNeed: string;
  contactTime: string;
  privacyConsent: boolean;
  website: string; // 蜜罐
}

interface FormErrors {
  name?: string;
  phone?: string;
  wechat?: string;
  city?: string;
  consultationNeed?: string;
  contactTime?: string;
  privacyConsent?: string;
  submit?: string;
}

const INITIAL_DATA: FormData = {
  name: "",
  phone: "",
  wechat: "",
  city: "",
  consultationNeed: "",
  contactTime: "",
  privacyConsent: false,
  website: "",
};

const CHINA_PHONE_RE = /^1[3-9]\d{9}$/;

const CONTACT_TIME_OPTIONS = [
  { value: "", label: "请选择" },
  { value: "anytime", label: "随时" },
  { value: "morning", label: "上午 09:00–12:00" },
  { value: "afternoon", label: "下午 12:00–18:00" },
  { value: "evening", label: "晚上 18:00–21:00" },
];

function validateClient(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "请输入姓名";
  } else if (data.name.trim().length < 2 || data.name.trim().length > 20) {
    errors.name = "姓名需为 2–20 个字";
  }

  if (!data.phone.trim()) {
    errors.phone = "请输入手机号码";
  } else if (!CHINA_PHONE_RE.test(data.phone.trim())) {
    errors.phone = "请输入正确的中国大陆手机号";
  }

  if (data.wechat.trim().length > 50) {
    errors.wechat = "微信号不超过 50 个字";
  }

  if (data.city.trim().length > 50) {
    errors.city = "城市名称不超过 50 个字";
  }

  if (!data.consultationNeed.trim()) {
    errors.consultationNeed = "请输入咨询需求";
  } else if (
    data.consultationNeed.trim().length < 10 ||
    data.consultationNeed.trim().length > 500
  ) {
    errors.consultationNeed = "咨询需求需为 10–500 个字";
  }

  if (!data.contactTime) {
    errors.contactTime = "请选择方便联系时间";
  }

  if (!data.privacyConsent) {
    errors.privacyConsent = "请同意隐私政策后提交";
  }

  return errors;
}

export function ConsultationForm({ source }: { source?: string } = {}) {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateField(key: keyof FormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // 清除该字段的错误
    const errorKey = key as keyof FormErrors;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 客户端校验
    const clientErrors = validateClient(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          wechat: formData.wechat.trim(),
          city: formData.city.trim(),
          consultationNeed: formData.consultationNeed.trim(),
          contactTime: formData.contactTime,
          privacyConsent: formData.privacyConsent,
          website: formData.website, // 蜜罐
          source: source || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          setStatus("idle");
          return;
        }
        throw new Error(result.error || "提交失败");
      }

      setStatus("success");
      setFormData(INITIAL_DATA);
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "网络错误，请稍后重试"
      );
    }
  }

  // 提交成功状态
  if (status === "success") {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-green flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          咨询已提交
        </h3>
        <p className="text-muted-foreground mb-6">
          我们会尽快与您联系。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          继续咨询
        </button>
      </div>
    );
  }

  const fieldBaseClass =
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
  const fieldErrorClass = "border-destructive focus:border-destructive focus:ring-destructive/20";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-border p-6 lg:p-8 space-y-5"
    >
      <h3 className="text-lg font-semibold text-foreground mb-1">
        在线咨询
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        填写以下信息，我们的顾问将尽快与您联系。
      </p>

      {/* 姓名 */}
      <div>
        <label htmlFor="cf-name" className={labelClass}>
          姓名 <span className="text-destructive">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="请输入您的姓名"
          maxLength={20}
          autoComplete="name"
          className={cn(fieldBaseClass, errors.name && fieldErrorClass)}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* 手机号码 */}
      <div>
        <label htmlFor="cf-phone" className={labelClass}>
          手机号码 <span className="text-destructive">*</span>
        </label>
        <input
          id="cf-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="请输入手机号码"
          maxLength={11}
          autoComplete="tel"
          className={cn(fieldBaseClass, errors.phone && fieldErrorClass)}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      {/* 微信号 */}
      <div>
        <label htmlFor="cf-wechat" className={labelClass}>
          微信号
        </label>
        <input
          id="cf-wechat"
          type="text"
          value={formData.wechat}
          onChange={(e) => updateField("wechat", e.target.value)}
          placeholder="请输入微信号（选填）"
          maxLength={50}
          className={cn(fieldBaseClass, errors.wechat && fieldErrorClass)}
        />
        {errors.wechat && (
          <p className="mt-1 text-xs text-destructive">{errors.wechat}</p>
        )}
      </div>

      {/* 所在城市 */}
      <div>
        <label htmlFor="cf-city" className={labelClass}>
          所在城市
        </label>
        <input
          id="cf-city"
          type="text"
          value={formData.city}
          onChange={(e) => updateField("city", e.target.value)}
          placeholder="请输入所在城市（选填）"
          maxLength={50}
          className={cn(fieldBaseClass, errors.city && fieldErrorClass)}
        />
        {errors.city && (
          <p className="mt-1 text-xs text-destructive">{errors.city}</p>
        )}
      </div>

      {/* 咨询需求 */}
      <div>
        <label htmlFor="cf-need" className={labelClass}>
          咨询需求 <span className="text-destructive">*</span>
        </label>
        <textarea
          id="cf-need"
          value={formData.consultationNeed}
          onChange={(e) => updateField("consultationNeed", e.target.value)}
          placeholder="请简要描述您的咨询需求（10–500字）"
          rows={4}
          maxLength={500}
          className={cn(
            fieldBaseClass,
            "resize-none",
            errors.consultationNeed && fieldErrorClass
          )}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.consultationNeed ? (
            <p className="text-xs text-destructive">
              {errors.consultationNeed}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">
            {formData.consultationNeed.length}/500
          </span>
        </div>
      </div>

      {/* 方便联系时间 */}
      <div>
        <label htmlFor="cf-time" className={labelClass}>
          方便联系时间 <span className="text-destructive">*</span>
        </label>
        <select
          id="cf-time"
          value={formData.contactTime}
          onChange={(e) => updateField("contactTime", e.target.value)}
          className={cn(
            fieldBaseClass,
            "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10",
            errors.contactTime && fieldErrorClass
          )}
        >
          {CONTACT_TIME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.contactTime && (
          <p className="mt-1 text-xs text-destructive">{errors.contactTime}</p>
        )}
      </div>

      {/* 隐私授权 */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => updateField("privacyConsent", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            我已阅读并同意
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary-hover"
            >
              《隐私政策》
            </a>
            ，同意天悦宝贝工作人员通过电话或微信与我联系。
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="mt-1 ml-7 text-xs text-destructive">
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* 蜜罐字段 — 对用户不可见 */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => updateField("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* 提交错误 */}
      {(status === "error" || errors.submit) && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">
            {submitError || errors.submit}
          </p>
        </div>
      )}

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2",
          "px-6 py-3 rounded-lg",
          "bg-primary text-primary-foreground font-semibold",
          "hover:bg-primary-hover transition-colors",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            提交中…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            提交咨询
          </>
        )}
      </button>
    </form>
  );
}

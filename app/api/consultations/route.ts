/**
 * POST /api/consultations
 *
 * 接收咨询表单提交，写入 Sanity。
 * - 服务端完整校验所有字段
 * - 蜜罐字段拦截机器人
 * - 基础频率限制（同 IP 5分钟内最多 3 次）
 * - 不记录敏感信息
 */

import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

// ─── 简易内存频率限制 ─────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 分钟
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ─── 校验规则 ─────────────────────────────────────

const CHINA_PHONE_RE = /^1[3-9]\d{9}$/;

interface ConsultationPayload {
  name?: string;
  phone?: string;
  wechat?: string;
  city?: string;
  consultationNeed?: string;
  contactTime?: string;
  privacyConsent?: boolean;
  /** 蜜罐字段 — 有内容即为机器人 */
  website?: string;
  /** 来源标记 — 记录提交来自哪个页面 */
  source?: string;
}

function validate(data: ConsultationPayload): {
  valid: boolean;
  errors: Record<string, string>;
  cleaned: {
    name: string;
    phone: string;
    wechat: string;
    city: string;
    consultationNeed: string;
    contactTime: string;
  } | null;
} {
  const errors: Record<string, string> = {};

  // 姓名
  const name = (data.name || "").trim();
  if (!name) {
    errors.name = "请输入姓名";
  } else if (name.length < 2 || name.length > 20) {
    errors.name = "姓名需为 2–20 个字";
  }

  // 手机号
  const phone = (data.phone || "").trim();
  if (!phone) {
    errors.phone = "请输入手机号码";
  } else if (!CHINA_PHONE_RE.test(phone)) {
    errors.phone = "请输入正确的中国大陆手机号";
  }

  // 微信号（选填）
  const wechat = (data.wechat || "").trim();
  if (wechat.length > 50) {
    errors.wechat = "微信号不超过 50 个字";
  }

  // 所在城市（选填）
  const city = (data.city || "").trim();
  if (city.length > 50) {
    errors.city = "城市名称不超过 50 个字";
  }

  // 咨询需求
  const consultationNeed = (data.consultationNeed || "").trim();
  if (!consultationNeed) {
    errors.consultationNeed = "请输入咨询需求";
  } else if (consultationNeed.length < 10 || consultationNeed.length > 500) {
    errors.consultationNeed = "咨询需求需为 10–500 个字";
  }

  // 方便联系时间
  const validTimes = ["anytime", "morning", "afternoon", "evening"];
  const contactTime = data.contactTime || "";
  if (!contactTime) {
    errors.contactTime = "请选择方便联系时间";
  } else if (!validTimes.includes(contactTime)) {
    errors.contactTime = "请选择有效的联系时间";
  }

  // 隐私授权
  if (!data.privacyConsent) {
    errors.privacyConsent = "请同意隐私政策";
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    cleaned: valid
      ? { name, phone, wechat, city, consultationNeed, contactTime }
      : null,
  };
}

// ─── POST 处理器 ──────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // 1. 检查写入 Token
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error("SANITY_API_WRITE_TOKEN is not configured");
      return NextResponse.json(
        { ok: false, error: "服务配置异常，请稍后重试" },
        { status: 500 }
      );
    }

    // 2. 获取客户端 IP 并检查频率限制
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "提交过于频繁，请稍后再试" },
        { status: 429 }
      );
    }

    // 3. 解析请求体
    let body: ConsultationPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "请求格式错误" },
        { status: 400 }
      );
    }

    // 4. 蜜罐检查
    if (body.website) {
      // 静默拒绝，不暴露蜜罐机制
      return NextResponse.json({ ok: true });
    }

    // 5. 字段校验
    const { valid, errors, cleaned } = validate(body);
    if (!valid || !cleaned) {
      return NextResponse.json(
        { ok: false, errors },
        { status: 400 }
      );
    }

    // 6. 写入 Sanity
    const doc = {
      _type: "consultationLead",
      name: cleaned.name,
      phone: cleaned.phone,
      wechat: cleaned.wechat || undefined,
      city: cleaned.city || undefined,
      consultationNeed: cleaned.consultationNeed,
      contactTime: cleaned.contactTime,
      source: (body.source || "").trim() || undefined,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    await writeClient.create(doc);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { ok: false, error: "提交失败，请稍后重试" },
      { status: 500 }
    );
  }
}

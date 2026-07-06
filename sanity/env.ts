/**
 * Sanity 环境变量统一管理
 *
 * NEXT_PUBLIC_ 前缀变量可在客户端使用；
 * SANITY_API_READ_TOKEN 仅在服务端使用。
 *
 * 所有公开变量均提供安全默认值，缺失时不会导致构建失败。
 * 生产环境请在部署平台（Netlify / Vercel）环境变量中设置真实值。
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * 开发环境下 projectId 为空时给出提示（不影响构建）
 */
if (!projectId && typeof window === "undefined") {
  console.warn(
    "[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
      "Sanity data fetching will be skipped. " +
      "Set it in .env.local or your deployment platform's environment variables."
  );
}

/**
 * 服务端读取 token（可选）
 * 若未设置，则 client 回退到公开 CDN 读取模式
 */
export const token = process.env.SANITY_API_READ_TOKEN || undefined;

/**
 * 服务端写入 token（仅 API 路由使用）
 * 不暴露为 NEXT_PUBLIC_* 变量
 */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || undefined;

/** Studio 路由路径 */
export const studioUrl = "/studio";

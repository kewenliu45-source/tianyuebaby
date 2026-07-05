import createImageUrlBuilder from "@sanity/image-url";
import type { Image, ImageUrlBuilder } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * 从 Sanity Image 字段值生成图片 URL builder
 *
 * @example
 * ```ts
 * // 低层 builder，需要自定义宽度时使用
 * const url = urlForImage(post.coverImage).width(1920).url();
 *
 * // 推荐：使用场景化 helper（见文件底部）
 * // bannerImageUrl / articleImageUrl / cardImageUrl / contentImageUrl / iconImageUrl
 * ```
 */
export function urlForImage(source: Image): ImageUrlBuilder {
  return builder.image(source).auto("format").fit("max");
}

// ────────────────────────────────────────────────
// 统一图片 URL helpers —— 按场景预设宽度，避免各组件手写低宽度
// ────────────────────────────────────────────────

/** Banner / 首屏大图 — 2560px，覆盖 2x 2K 屏 */
export function bannerImageUrl(source: Image): string {
  return urlForImage(source).width(2560).url();
}

/** 文章封面 / 正文大图 — 1920px */
export function articleImageUrl(source: Image): string {
  return urlForImage(source).width(1920).url();
}

/** 新闻卡片缩略图 — 1200px */
export function cardImageUrl(source: Image): string {
  return urlForImage(source).width(1200).url();
}

/** 品牌介绍等中等图片 — 1536px */
export function contentImageUrl(source: Image): string {
  return urlForImage(source).width(1536).url();
}

/** Logo / 二维码 / 小图标 — 600px（按实际显示 ~200-300px 的 2x） */
export function iconImageUrl(source: Image): string {
  return urlForImage(source).width(600).url();
}

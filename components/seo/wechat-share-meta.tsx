/**
 * 微信分享 Meta 标签组件
 *
 * 微信爬虫不执行 JS，必须在 HTML 源码中直接包含完整的 OG 标签。
 * 此组件确保所有必要的 OG 标签都存在，即使 Next.js metadata API 没有生成。
 */

interface WechatShareMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

export function WechatShareMeta({
  title = "天悦宝贝（国际）助孕中心",
  description = "专注助孕咨询服务，为有需要的家庭提供专业、贴心的助孕方案咨询与全程陪伴服务。",
  image,
  url,
  siteName = "天悦宝贝（国际）助孕中心",
}: WechatShareMetaProps) {
  // 网站 URL（必须是公网可访问的 URL）
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tianyuebaby.com";

  // 分享图片 URL（微信要求 JPG/PNG，至少 200x200，推荐 800x800）
  const shareImage = image || `${siteUrl}/images/share.png`;

  // 当前页面 URL
  const pageUrl = url || siteUrl;

  return (
    <>
      {/* Open Graph 标签 - 微信分享必需 */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card 标签 - 兼容其他平台 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
    </>
  );
}

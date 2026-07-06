import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  Tag,
  User,
  Clock,
  AlertCircle,
  Play,
} from "lucide-react";
import { VideoJsonLd } from "@/components/seo/video-json-ld";
import { PortableTextRenderer } from "@/components/shared/portable-text";
import {
  fetchVideoDetailPageData,
  fetchVideoSlugs,
} from "@/sanity/lib/fetchers";
import { urlForImage, articleImageUrl, cardImageUrl } from "@/sanity/lib/image";
import { projectId, dataset } from "@/sanity/env";

// ── 可信外部视频域名白名单 ──
const TRUSTED_EMBED_DOMAINS = [
  "youtube.com",
  "youtu.be",
  "www.youtube.com",
  "bilibili.com",
  "www.bilibili.com",
  "player.bilibili.com",
  "v.qq.com",
  "v.youku.com",
  "youku.com",
  "www.youku.com",
];

/** 将 "12:30" 格式时长转为 ISO 8601 "PT12M30S" */
function toIsoDuration(raw?: string): string | undefined {
  if (!raw) return undefined;
  const parts = raw.split(":").map(Number);
  if (parts.length === 2) return `PT${parts[0]}M${parts[1]}S`;
  if (parts.length === 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  return undefined;
}

/** 将 Sanity file asset _ref 转为可访问的 CDN URL */
function getSanityFileUrl(ref: string): string {
  // ref 格式: file-<hash>-<ext>  →  https://cdn.sanity.io/files/{projectId}/{dataset}/{hash}.{ext}
  const parts = ref.replace(/^file-/, "").split("-");
  const ext = parts.pop();
  const hash = parts.join("-");
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hash}.${ext}`;
}

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    if (!TRUSTED_EMBED_DOMAINS.some((d) => hostname === d || hostname.endsWith("." + d))) {
      return null;
    }

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId = "";
      if (hostname.includes("youtu.be")) {
        videoId = parsed.pathname.slice(1);
      } else {
        videoId = parsed.searchParams.get("v") || "";
      }
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    // Bilibili
    if (hostname.includes("bilibili.com")) {
      const bvMatch = parsed.pathname.match(/\/video\/(BV\w+)/);
      if (bvMatch) return `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}`;
    }

    // 腾讯视频
    if (hostname.includes("v.qq.com")) {
      return url; // 腾讯视频嵌入地址通常可直接使用
    }

    // 优酷
    if (hostname.includes("youku.com")) {
      return url;
    }

    return url;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = await fetchVideoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { video } = await fetchVideoDetailPageData(slug);

  if (!video) {
    return { title: "视频未找到" };
  }

  const seo = video.seo;
  return {
    title: seo?.metaTitle || `${video.title} | 科普视频`,
    description: seo?.metaDescription || video.excerpt,
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.ogTitle || video.title,
      description: seo?.ogDescription || video.excerpt,
    },
    robots: seo?.noIndex ? "noindex" : "index, follow",
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { siteSettings, videosPage, video, relatedVideos } =
    await fetchVideoDetailPageData(slug);

  if (!video) {
    notFound();
  }

  const phone = siteSettings?.phone || "400-xxx-xxxx";
  const telHref = `tel:${phone.replace(/[\s-]/g, "")}`;

  const disclaimer = videosPage?.medicalDisclaimer ||
    "本视频内容仅供科普参考，不构成医疗建议。每个人的身体状况不同，实际方案需由专业医生根据个人情况进行评估。如需了解适合您的方案，请咨询专业顾问。";

  const playbackErrorText = videosPage?.playbackErrorText || "视频加载失败，请刷新页面重试或联系客服获取帮助。";

  return (
    <>
      <VideoJsonLd
        title={video.title}
        description={video.excerpt || ""}
        thumbnailUrl={
          video.coverImage?.image
            ? urlForImage(
                video.coverImage.image as unknown as Parameters<
                  typeof urlForImage
                >[0]
              ).url()
            : undefined
        }
        uploadDate={video.publishedAt}
        duration={toIsoDuration(video.duration)}
        contentUrl={
          video.videoSource === "upload" && video.videoFile?.asset?._ref
            ? getSanityFileUrl(video.videoFile.asset._ref)
            : video.videoSource === "external"
              ? video.externalUrl
              : undefined
        }
        embedUrl={
          video.videoSource === "external" && video.externalUrl
            ? getEmbedUrl(video.externalUrl) || undefined
            : undefined
        }
        presenter={video.presenter}
        url={`https://tiancibaobei.com/videos/${slug}`}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 360 }}>
        <Image
          src={
            video.coverImage?.image
              ? articleImageUrl(
                  video.coverImage.image as unknown as Parameters<
                    typeof articleImageUrl
                  >[0]
                )
              : "/images/site/newborn-family.png"
          }
          alt={video.coverImage?.alt || video.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2548]/85 via-[#1a3a6b]/75 to-[#1a3a6b]/60" />

        <div
          className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 py-12 lg:py-16 flex flex-col justify-center"
          style={{ minHeight: 360 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <span>/</span>
            <Link
              href="/videos"
              className="hover:text-white transition-colors"
            >
              科普视频中心
            </Link>
            <span>/</span>
            <span className="text-white/90 font-medium line-clamp-1">
              {video.title}
            </span>
          </nav>

          <div className="max-w-2xl">
            {/* 标签 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {video.category && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">
                  <Tag className="w-3 h-3" />
                  {video.category.name}
                </span>
              )}
              {video.presenter && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80">
                  <User className="w-3 h-3" />
                  {video.presenter}
                </span>
              )}
              {video.duration && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {video.title}
            </h1>

            {video.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="w-4 h-4" />
                <time dateTime={video.publishedAt}>
                  {new Date(video.publishedAt).toLocaleDateString("zh-CN")}
                </time>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 视频内容 */}
      <article className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* 返回链接 */}
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#1d4ed8] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回视频中心
            </Link>

            {/* 摘要 */}
            {video.excerpt && (
              <div className="mb-8 p-5 rounded-xl bg-[#f8fbff] ring-1 ring-blue-100/60">
                <p className="text-[18px] leading-[1.9] text-[#374151]">
                  {video.excerpt}
                </p>
              </div>
            )}

            {/* 视频播放器 */}
            <div className="mb-10">
              {video.videoSource === "external" && video.externalUrl ? (
                (() => {
                  const embedUrl = getEmbedUrl(video.externalUrl);
                  return embedUrl ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
                      <Play className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-sm text-[#8a9bb5] text-center px-4">
                        {playbackErrorText}
                      </p>
                    </div>
                  );
                })()
              ) : video.videoSource === "upload" && video.videoFile?.asset?._ref ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                  <video
                    controls
                    className="absolute inset-0 w-full h-full"
                    preload="metadata"
                  >
                    <source
                      src={getSanityFileUrl(video.videoFile.asset._ref)}
                      type="video/mp4"
                    />
                    <p className="text-sm text-white/70 p-4">
                      {playbackErrorText}
                    </p>
                  </video>
                </div>
              ) : (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
                  <Play className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-sm text-[#8a9bb5] text-center px-4">
                    {playbackErrorText}
                  </p>
                </div>
              )}
            </div>

            {/* 科普正文 */}
            <div className="prose prose-lg max-w-none">
              {video.content && video.content.length > 0 ? (
                <PortableTextRenderer content={video.content} />
              ) : (
                <p className="text-[#8a9bb5]">暂无详细内容</p>
              )}
            </div>

            {/* 医疗免责声明 */}
            <div className="mt-10 p-5 rounded-xl bg-amber-50 ring-1 ring-amber-200/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                {disclaimer}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 相关视频 */}
      {relatedVideos.length > 0 && (
        <section className="py-12 lg:py-16 bg-[#f8fbff]">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-[#173b68] text-center mb-8">
              相关视频
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedVideos.map((related) => (
                <Link
                  key={related._id}
                  href={`/videos/${related.slug.current}`}
                  className="group bg-white rounded-xl overflow-hidden ring-1 ring-blue-100/60 hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={
                        related.coverImage?.image
                          ? cardImageUrl(
                              related.coverImage.image as unknown as Parameters<
                                typeof cardImageUrl
                              >[0]
                            )
                          : "/images/site/documents-review.png"
                      }
                      alt={related.coverImage?.alt || related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                    {/* 播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-[#2563eb] ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    {related.duration && (
                      <span className="absolute bottom-2 right-2 text-xs font-medium bg-black/70 text-white px-2 py-0.5 rounded">
                        {related.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#173b68] line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-sm text-[#5a6d8a] line-clamp-2 mt-2">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 咨询 CTA */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] to-[#0f2548] py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,.2),transparent_60%)]" />
        <div className="container relative mx-auto max-w-[1200px] px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {videosPage?.finalCtaTitle || "开始了解适合您的方案"}
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">
            {videosPage?.finalCtaDescription ||
              "每个家庭的情况都是独特的。专业的咨询顾问随时为您服务，帮助您更清晰地了解方案选择，做出适合自己的知情决策。"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[#1a3a6b] shadow-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              电话咨询
            </a>
            <Link
              href={videosPage?.finalCtaSecondaryButtonLink || "/start-your-journey"}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {videosPage?.finalCtaSecondaryButtonText || "开始咨询"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface VideoJsonLdProps {
  title: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate: string;
  duration?: string; // ISO 8601 格式，如 "PT12M30S"
  contentUrl?: string;
  embedUrl?: string;
  presenter?: string;
  url: string;
}

export function VideoJsonLd({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  presenter,
  url,
}: VideoJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    uploadDate,
    url,
    publisher: {
      "@type": "Organization",
      name: "天悦宝贝（国际）助孕中心",
    },
  };

  if (thumbnailUrl) {
    jsonLd.thumbnailUrl = thumbnailUrl;
  }
  if (duration) {
    jsonLd.duration = duration;
  }
  if (contentUrl) {
    jsonLd.contentUrl = contentUrl;
  }
  if (embedUrl) {
    jsonLd.embedUrl = embedUrl;
  }
  if (presenter) {
    jsonLd.author = {
      "@type": "Person",
      name: presenter,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

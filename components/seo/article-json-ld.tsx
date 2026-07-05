interface ArticleJsonLdProps {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: ArticleJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    url,
    publisher: {
      "@type": "Organization",
      name: "天悦宝贝（国际）助孕中心",
    },
  };

  if (image) {
    jsonLd.image = image;
  }
  if (dateModified) {
    jsonLd.dateModified = dateModified;
  }
  if (authorName) {
    jsonLd.author = {
      "@type": "Person",
      name: authorName,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

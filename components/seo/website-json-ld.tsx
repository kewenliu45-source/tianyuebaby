interface WebSiteJsonLdProps {
  name: string;
  url: string;
  image: string;
}

export function WebSiteJsonLd({ name, url, image }: WebSiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    image,
    publisher: {
      "@type": "Organization",
      name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

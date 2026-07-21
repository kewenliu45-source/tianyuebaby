interface OrganizationJsonLdProps {
  name: string;
  description: string;
  phone: string;
  logo?: string;
  image?: string;
}

export function OrganizationJsonLd({
  name,
  description,
  phone,
  logo,
  image,
}: OrganizationJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    telephone: phone,
    url: "https://zhuyunbaby.com",
  };

  if (logo) {
    jsonLd.logo = logo;
  }
  if (image) {
    jsonLd.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

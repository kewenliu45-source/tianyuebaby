interface OrganizationJsonLdProps {
  name: string;
  description: string;
  phone: string;
}

export function OrganizationJsonLd({
  name,
  description,
  phone,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    telephone: phone,
    url: "https://zhuyunbaby.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

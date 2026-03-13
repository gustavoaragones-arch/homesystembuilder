import { SITE_OWNER } from "@/data/legal/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_OWNER.name,
  url: SITE_OWNER.siteUrl,
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE_OWNER.email,
  },
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Site owner and legal entity — Albor Digital LLC
 */

export const SITE_OWNER = {
  name: "Albor Digital LLC",
  description:
    "Independent digital product studio that builds and operates software tools, generators, and digital utilities.",
  email: "contact@albor.digital",
  siteName: "HomeSystemBuilder.com",
  siteUrl: "https://www.homesystembuilder.com",
  jurisdictions: ["United States", "Canada"],
  location: "Wyoming, USA",
} as const;

export const PDF_FOOTER_TEXT =
  "© Albor Digital LLC – HomeSystemBuilder.com\nFor personal use only.";

export const PRINTABLES_LICENSING = {
  personalUseOnly: true,
  noResale: true,
  noRedistribution: true,
} as const;

/**
 * BreadcrumbList schema for programmatic pages.
 * Home > Category Hub > Current Page — adds crawl paths for indexing.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homesystembuilder.com";

export interface BreadcrumbItem {
  name: string;
  item?: string;
}

export function breadcrumbSchema(
  categorySlug: string,
  categoryTitle: string,
  pageTitle: string,
  pageSlug: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: `${BASE}/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: `${BASE}/${categorySlug}/${pageSlug}`,
      },
    ],
  };
}

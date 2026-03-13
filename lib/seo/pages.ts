import type { SeoPageEntry } from "./types";

// Internal linking: prefer same-category related pages in a consistent order
const { getRelatedPagesOrdered } = require("./internal-links");

let cachedPages: SeoPageEntry[] | null = null;

function loadPages(): SeoPageEntry[] {
  if (cachedPages) return cachedPages;
  try {
    const path = require("path");
    const fs = require("fs");
    const filePath = path.join(process.cwd(), "data", "seo-pages", "pages.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    cachedPages = JSON.parse(raw) as SeoPageEntry[];
  } catch {
    cachedPages = [];
  }
  return cachedPages ?? [];
}

/** All programmatic SEO pages */
export function getAllPages(): SeoPageEntry[] {
  return loadPages();
}

/** All params for generateStaticParams: { category, slug }[] */
export function getAllPageParams(): { category: string; slug: string }[] {
  return getAllPages().map((p) => ({ category: p.category, slug: p.slug }));
}

/** Unique category slugs (for category hub pages) */
export function getCategorySlugs(): string[] {
  const set = new Set<string>();
  getAllPages().forEach((p) => set.add(p.category));
  return Array.from(set);
}

/** Get a single page by category and slug */
export function getPageByCategorySlug(
  category: string,
  slug: string
): SeoPageEntry | null {
  const page = getAllPages().find(
    (p) => p.category === category && p.slug === slug
  );
  return page ?? null;
}

/** Get related pages in the same category (excluding current slug), for internal linking */
export function getRelatedPages(
  category: string,
  currentSlug: string,
  limit = 6
): SeoPageEntry[] {
  const all = getAllPages();
  const page = getPageByCategorySlug(category, currentSlug);
  const explicit = page?.relatedSlugs;
  if (explicit && explicit.length > 0) {
    const bySlug = new Map(
      all.filter((p) => p.category === category && p.slug !== currentSlug).map((p) => [p.slug, p])
    );
    const ordered = explicit
      .map((s) => bySlug.get(s))
      .filter(Boolean) as SeoPageEntry[];
    return ordered.slice(0, limit);
  }
  return getRelatedPagesOrdered(all, category, currentSlug, limit) as SeoPageEntry[];
}

/** Human-readable category title for "Related X Printables" */
export function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    "cleaning-schedules": "Cleaning",
    "chore-charts": "Chore chart",
    "kids-routines": "Kids routine",
    "home-organization": "Home organization",
    "adhd-cleaning": "ADHD cleaning",
  };
  return titles[category] ?? category;
}

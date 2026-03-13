/**
 * Single programmatic SEO page entry from pages.json
 */
export interface SeoPageEntry {
  slug: string;
  title: string;
  category: string;
  keyword: string;
  printableType: "cleaning_schedule" | "chore_chart" | "kids_routine";
  /** Optional: override auto-generated meta description */
  description?: string;
  /** Optional: custom HTML for the SEO article block */
  articleHtml?: string;
  /** Optional: hero eyebrow label */
  eyebrow?: string;
  /** Optional: hero subtitle */
  subtitle?: string;
  /** Optional: explicit related page slugs for internal linking (same category) */
  relatedSlugs?: string[];
}

export interface SeoPageWithContent extends SeoPageEntry {
  description: string;
  articleHtml: string;
}

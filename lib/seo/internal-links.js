/**
 * Internal Linking Engine — related pages by category for programmatic SEO.
 * Used by the "Related Printables" section on each page.
 */

/**
 * Get related pages for internal linking within the same category.
 * Cleaning schedule pages can link to e.g. deep-cleaning-checklist,
 * weekly-cleaning-checklist, monthly-cleaning-checklist.
 * Chore chart pages link to chore-chart-by-age, chore-chart-for-kids, etc.
 *
 * @param {Array<{ slug: string, category: string, title?: string }>} pages - Full page list
 * @param {string} category - Category to filter (e.g. "cleaning-schedules", "chore-charts")
 * @param {string} [currentSlug] - Slug to exclude (current page)
 * @param {number} [limit=5] - Max number of related pages to return
 * @returns {Array<{ slug: string, category: string, title?: string }>}
 */
function getRelatedPages(pages, category, currentSlug, limit = 5) {
  if (!Array.isArray(pages)) return [];
  const filtered = pages.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );
  return filtered.slice(0, limit);
}

/**
 * Preferred related slugs per category for topical authority.
 * When available, these appear first in "Related Printables".
 */
const PREFERRED_RELATED = {
  "cleaning-schedules": [
    "deep-cleaning-checklist",
    "weekly-cleaning-checklist",
    "weekly-cleaning-schedule-printable",
    "monthly-cleaning-schedule",
    "daily-cleaning-schedule",
    "realistic-cleaning-routine",
  ],
  "chore-charts": [
    "chore-chart-for-5-year-old",
    "chore-chart-for-7-year-old",
    "family-chore-chart-printable",
    "chore-chart-printable",
  ],
  "kids-routines": [
    "kids-morning-routine-chart",
    "kids-bedtime-routine",
    "kids-bedtime-routine-printable",
    "kids-daily-routine-printable",
  ],
  "home-organization": [
    "home-organization-checklist",
    "household-binder-printable",
    "weekly-home-organization-checklist",
  ],
  "adhd-cleaning": [
    "adhd-cleaning-checklist",
    "adhd-friendly-cleaning-schedule",
    "simple-adhd-cleaning-checklist",
  ],
};

/**
 * Get related pages with preferred order when possible.
 * @param {Array<{ slug: string, category: string, title?: string }>} pages
 * @param {string} category
 * @param {string} currentSlug
 * @param {number} [limit=5]
 */
function getRelatedPagesOrdered(pages, category, currentSlug, limit = 5) {
  const all = getRelatedPages(pages, category, currentSlug, limit * 2);
  const preferred = PREFERRED_RELATED[category];
  if (!preferred || preferred.length === 0) return all.slice(0, limit);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const ordered = [];
  for (const slug of preferred) {
    const p = bySlug.get(slug);
    if (p) ordered.push(p);
  }
  for (const p of all) {
    if (ordered.length >= limit) break;
    if (!ordered.find((o) => o.slug === p.slug)) ordered.push(p);
  }
  return ordered.slice(0, limit);
}

module.exports = {
  getRelatedPages,
  getRelatedPagesOrdered,
  PREFERRED_RELATED,
};

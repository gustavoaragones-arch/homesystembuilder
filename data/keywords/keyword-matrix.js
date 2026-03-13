/**
 * Keyword Matrix — long-tail keyword combinations for programmatic SEO.
 * Used by scripts/build-seo-pages.js to generate pages.json.
 */

const ages = [4, 5, 6, 7, 8, 9, 10, 11, 12];

const routineTypes = [
  "chore chart",
  "cleaning schedule",
  "morning routine",
  "bedtime routine",
  "weekly cleaning checklist",
  "weekly cleaning schedule",
  "monthly cleaning schedule",
  "daily cleaning schedule",
  "deep cleaning checklist",
  "spring cleaning checklist",
  "small apartment cleaning schedule",
  "realistic cleaning routine",
  "house cleaning schedule",
  "household cleaning checklist",
  "kitchen cleaning checklist",
  "bathroom cleaning schedule",
  "kids morning routine",
  "kids bedtime routine",
  "family chore chart",
  "toddler routine chart",
  "teen chore chart",
  "minimalist cleaning schedule",
  "quick cleaning checklist",
  "weekend cleaning schedule",
  "biweekly cleaning schedule",
  "seasonal cleaning checklist",
  "move out cleaning checklist",
  "holiday cleaning checklist",
  "laundry schedule",
  "vacuuming schedule",
  "mopping schedule",
  "dusting checklist",
  "decluttering checklist",
  "minimalist cleaning checklist",
  "eco friendly cleaning checklist",
  "move in cleaning checklist",
  "apartment cleaning schedule",
  "condo cleaning schedule",
  "busy mom cleaning schedule",
  "working parent cleaning schedule",
  "stay at home mom cleaning schedule",
  "single person cleaning schedule",
  "couple cleaning schedule",
  "large family cleaning schedule",
  "small family cleaning schedule",
];

const modifiers = ["printable", "template", "checklist", "chart", "for kids", "free"];

/** ADHD cleaning cluster */
const adhdRoutineTypes = [
  "ADHD cleaning checklist",
  "ADHD friendly cleaning schedule",
  "ADHD cleaning routine",
  "ADHD household checklist",
  "neurodivergent cleaning schedule",
  "simple ADHD cleaning checklist",
];

/** Kids routines beyond age-based chore charts */
const kidsRoutineTypes = [
  "kids morning routine chart",
  "kids bedtime routine",
  "kids daily routine printable",
  "toddler routine chart",
  "preschool routine chart",
  "school morning routine checklist",
  "after school routine chart",
];

/** Home organization cluster */
const homeOrgTypes = [
  "home organization checklist",
  "household binder printable",
  "family command center printables",
  "home management checklist",
  "household organization template",
  "weekly home organization checklist",
  "monthly home organization checklist",
  "family planner printable",
  "household management binder",
  "home binder printables",
  "command center checklist",
  "family organization checklist",
  "household planner printable",
  "home management template",
  "weekly household checklist",
  "monthly household checklist",
];

/**
 * Convert phrase to title case for page title.
 * @param {string} phrase - e.g. "chore chart for 5 year old"
 * @returns {string} - e.g. "Chore Chart for 5 Year Old"
 */
function toTitle(phrase) {
  return phrase
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Convert phrase to URL-safe slug.
 * @param {string} phrase
 * @returns {string}
 */
function toSlug(phrase) {
  return phrase
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Generate long-tail keyword combinations for programmatic SEO.
 * Target: 300–800 unique pages.
 * @returns {{ keyword: string, slug: string, category: string, printableType: string, title: string }[]}
 */
function generateKeywords() {
  const seen = new Set();
  const keywords = [];

  // 1. Chore chart by age (chore-charts)
  ages.forEach((age) => {
    const keyword = `chore chart for ${age} year old`;
    const slug = `chore-chart-for-${age}-year-old`;
    if (seen.has(slug)) return;
    seen.add(slug);
    keywords.push({
      keyword,
      slug,
      title: toTitle(keyword),
      category: "chore-charts",
      printableType: "chore_chart",
    });
  });

  // 2. Routine types × modifiers (cleaning-schedules / kids-routines by type)
  routineTypes.forEach((type) => {
    modifiers.forEach((mod) => {
      const keyword = `${type} ${mod}`;
      const slug = toSlug(keyword);
      if (seen.has(slug)) return;
      seen.add(slug);
      const isKids = /kids|toddler|teen|family|child/.test(type);
      const category = isKids ? "kids-routines" : "cleaning-schedules";
      const printableType = isKids ? "kids_routine" : "cleaning_schedule";
      keywords.push({
        keyword,
        slug,
        title: toTitle(keyword),
        category,
        printableType,
      });
    });
  });

  // 3. ADHD cleaning cluster
  adhdRoutineTypes.forEach((phrase) => {
    const slug = toSlug(phrase);
    if (seen.has(slug)) return;
    seen.add(slug);
    keywords.push({
      keyword: phrase,
      slug,
      title: toTitle(phrase),
      category: "adhd-cleaning",
      printableType: "cleaning_schedule",
    });
  });

  // 4. Kids routine types (standalone, no modifier to avoid dupes)
  kidsRoutineTypes.forEach((phrase) => {
    const slug = toSlug(phrase);
    if (seen.has(slug)) return;
    seen.add(slug);
    keywords.push({
      keyword: phrase,
      slug,
      title: toTitle(phrase),
      category: "kids-routines",
      printableType: "kids_routine",
    });
  });

  // 5. Home organization cluster
  homeOrgTypes.forEach((phrase) => {
    const slug = toSlug(phrase);
    if (seen.has(slug)) return;
    seen.add(slug);
    keywords.push({
      keyword: phrase,
      slug,
      title: toTitle(phrase),
      category: "home-organization",
      printableType: "cleaning_schedule",
    });
  });

  return keywords;
}

module.exports = {
  ages,
  routineTypes,
  modifiers,
  generateKeywords,
  toTitle,
  toSlug,
};

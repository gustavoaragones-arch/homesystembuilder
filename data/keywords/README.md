# Keyword matrix

Long-tail keyword combinations for programmatic SEO.

- **keyword-matrix.js** — Defines `ages`, `routineTypes`, `modifiers`, and cluster arrays (`adhdRoutineTypes`, `kidsRoutineTypes`, `homeOrgTypes`). Exports `generateKeywords()` which returns `{ keyword, slug, title, category, printableType }[]`.
- **Build output** — Run `npm run seo:build-pages` to regenerate `data/seo-pages/pages.json` from this matrix (target 300–800 pages).

## Clusters

| Category            | Examples                                      |
|---------------------|-----------------------------------------------|
| cleaning-schedules  | weekly-cleaning-schedule-printable, deep-cleaning-checklist |
| chore-charts        | chore-chart-for-5-year-old                    |
| kids-routines       | kids-morning-routine-chart, toddler-routine-chart |
| home-organization   | home-organization-checklist, household-binder-printable |
| adhd-cleaning       | adhd-cleaning-checklist, adhd-friendly-cleaning-schedule |

## Extending

Edit `keyword-matrix.js`: add entries to `routineTypes`, `modifiers`, or the cluster arrays, then run `npm run seo:build-pages`.

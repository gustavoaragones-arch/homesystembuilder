# HomeSystemBuilder.com

A scalable SEO tool website that generates **personalized household routines** and **printable planners** for families.

## Tech stack

- **Next.js** (App Router)
- **React** + **TailwindCSS**
- **Node.js** (for PDF generation with Puppeteer)
- **Cloudflare Pages** (deployment)

## Project structure

```
/app              — App Router (home, /[category]/[slug] for programmatic SEO)
/components       — SeoPageTemplate, RoutineGenerator, PrintablePreview, RelatedPrintables, Navigation
/data             — types.ts; /data/seo-pages/pages.json (programmatic page list)
/lib              — routine-logic, pdf-generator (Puppeteer), /lib/seo (pages, content, schema)
/scripts          — generate-sitemap.js → public/sitemap.xml
/public           — /pinterest (images: {slug}-1.jpg, {slug}-2.jpg, {slug}-3.jpg), /assets/vecteezy
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run pdf:generate` | Generate a sample PDF (Node, uses Puppeteer) |
| `npm run sitemap` | Generate public/sitemap.xml from data/seo-pages/pages.json |

## Programmatic SEO (150–300 pages)

- **Route:** `app/[category]/[slug]/page.tsx` — e.g. `/cleaning-schedules/weekly-cleaning-schedule-printable`. All pages are statically generated via `generateStaticParams()`.
- **Data:** `data/seo-pages/pages.json` — one object per page: `slug`, `title`, `category`, `keyword`, `printableType`; optional `description`, `articleHtml`, `eyebrow`, `subtitle`, `relatedSlugs`.
- **Logic:** `lib/seo/` — load pages, related links, default schedule/article content, FAQ + HowTo JSON-LD.
- **Template:** Each page renders `SeoPageTemplate` plus `RelatedPrintables` (internal links by category). Metadata and structured data are set automatically.
- **Images:** Place Pinterest-style images in `public/pinterest/` as `{slug}-1.jpg`, `{slug}-2.jpg`, `{slug}-3.jpg` (1000×1500 recommended).
- **Sitemap:** Run `npm run sitemap` to regenerate `public/sitemap.xml` from `pages.json`.

## PDF generation

- **Component:** `PrintablePreview` shows the schedule and a “Download free PDF” button.
- **Server (Node):** `lib/pdf-generator.js` uses Puppeteer to generate PDF from JSON. Run locally with `npm run pdf:generate`. Use `POST /api/pdf` with a JSON body (same shape as `PrintableScheduleData`) to return a PDF.
- **Cloudflare Pages:** Puppeteer does not run on Edge. Use “Print this page” in the browser, or host the PDF API on a Node server (e.g. separate worker or VPS).

## Cloudflare Pages deployment

This project builds a **static export** (`next.config.js` → `output: "export"`). The deployable site is the **`out/`** directory (includes **`out/index.html`** for `/`).

1. **Dashboard:** Connect your repo.
2. **Build command:** `npm run build`
3. **Build output directory:** **`out`** (not `.next` — that folder is not a static site root and will 404 at `/`).

If the dashboard **Framework preset** forces the wrong output, switch to **None** or override the output directory to **`out`**.

`app/page.tsx` is the App Router home route (same role as `app/page.jsx`).

For **SSR + API routes** on Cloudflare, use [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages) or [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) instead of `output: "export"`. `wrangler.toml` lists `pages_build_output_dir = "out"` for this static setup.

## Styling

Global design tokens (colors, typography, spacing, shadows) are in `app/globals.css` (CSS custom properties). Tailwind is extended in `tailwind.config.ts` to use these variables. Use `/public/assets/vecteezy/` for Vecteezy icons and illustrations.

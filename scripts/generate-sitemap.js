#!/usr/bin/env node
/**
 * Dynamic Sitemap Builder
 * Loads pages.json, generates URLs with priority hierarchy, outputs public/sitemap.xml
 * Run: node scripts/generate-sitemap.js
 */

const fs = require("fs");
const path = require("path");

const BASE = process.env.SITE_URL || "https://homesystembuilder.com";
const PAGES_JSON = path.join(process.cwd(), "data", "seo-pages", "pages.json");
const OUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

function loadPages() {
  try {
    const raw = fs.readFileSync(PAGES_JSON, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not load pages.json:", err.message);
    return [];
  }
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlNode(loc, priority) {
  return (
    "  <url>\n" +
    `    <loc>${escapeXml(loc)}</loc>\n` +
    `    <priority>${priority}</priority>\n` +
    "  </url>\n"
  );
}

function generate() {
  const pages = loadPages();

  let urls = "";

  // Static pages — crawl priority hierarchy
  urls += urlNode(`${BASE}/`, "1.0");
  urls += urlNode(`${BASE}/about`, "0.3");
  urls += urlNode(`${BASE}/privacy`, "0.3");
  urls += urlNode(`${BASE}/terms`, "0.3");
  urls += urlNode(`${BASE}/contact`, "0.3");
  urls += urlNode(`${BASE}/routine-generator`, "0.9");
  urls += urlNode(`${BASE}/home-system-generator`, "0.9");
  urls += urlNode(`${BASE}/routines`, "0.9");
  urls += urlNode(`${BASE}/planners`, "0.9");
  urls += urlNode(`${BASE}/disclaimer`, "0.3");
  urls += urlNode(`${BASE}/cookies`, "0.3");

  // Category hubs — priority 0.9
  const categories = [...new Set(pages.map((p) => p.category))];
  for (const cat of categories) {
    urls += urlNode(`${BASE}/${cat}`, "0.9");
  }

  // Programmatic SEO pages — priority 0.8
  for (const p of pages) {
    urls += urlNode(`${BASE}/${p.category}/${p.slug}`, "0.8");
  }

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    "</urlset>\n";

  const outDir = path.dirname(OUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_PATH, sitemap, "utf-8");

  const total = 11 + categories.length + pages.length;
  console.log(`Wrote ${OUT_PATH} (${total} URLs: static + ${categories.length} hubs + ${pages.length} SEO pages)`);
}

generate();

#!/usr/bin/env node
/**
 * Page Dataset Builder — converts keyword matrix → pages.json.
 * Run: node scripts/build-seo-pages.js
 * Output: data/seo-pages/pages.json
 * Target: 300–800 programmatic SEO pages.
 */

const path = require("path");
const fs = require("fs");

const projectRoot = path.resolve(__dirname, "..");
const matrixPath = path.join(projectRoot, "data", "keywords", "keyword-matrix.js");
const outputPath = path.join(projectRoot, "data", "seo-pages", "pages.json");

function build() {
  const { generateKeywords } = require(matrixPath);
  const keywords = generateKeywords();

  const pages = keywords.map((k) => ({
    slug: k.slug,
    title: k.title,
    category: k.category,
    keyword: k.keyword,
    printableType: k.printableType,
  }));

  const bySlug = new Map();
  pages.forEach((p) => {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
  });
  const deduped = Array.from(bySlug.values());

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(deduped, null, 2), "utf-8");

  const byCategory = {};
  deduped.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  console.log(`Wrote ${outputPath}`);
  console.log(`Total pages: ${deduped.length}`);
  console.log("By category:", byCategory);
}

build();

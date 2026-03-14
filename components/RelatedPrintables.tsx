"use client";

import Link from "next/link";
import { RelatedPages } from "@/components/content/RelatedPages";
import type { SeoPageEntry } from "@/lib/seo/types";

interface RelatedPrintablesProps {
  /** Same-category pages (excluding current) — exactly 5 for Layer 2 internal link ring */
  pages: SeoPageEntry[];
  /** e.g. "Cleaning", "Chore chart" */
  categoryTitle: string;
  /** Category slug for hub link e.g. "cleaning-schedules" */
  categorySlug?: string;
}

export function RelatedPrintables({
  pages,
  categoryTitle,
  categorySlug,
}: RelatedPrintablesProps) {
  return (
    <section
      className="border-y border-border bg-bg-surface px-4 py-16 md:px-8"
      style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-width-layout)" }}>
        {categorySlug && (
          <p className="mb-4 font-body text-sm text-ink-muted">
            <Link
              href={`/${categorySlug}`}
              className="font-medium text-primary-dark underline underline-offset-2"
            >
              ← Browse all {categoryTitle} printables
            </Link>
          </p>
        )}
        <RelatedPages
          pages={pages}
          heading={`Related ${categoryTitle} printables`}
        />
        {pages.length === 0 && categorySlug && (
          <p className="font-body text-ink-muted">
            <Link href={`/${categorySlug}`} className="text-primary-dark underline">
              Browse {categoryTitle} printables
            </Link>
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-4" style={{ marginTop: "var(--space-8)" }}>
          <Link href="#generator" className="btn-secondary">
            Routine generator
          </Link>
          <Link href="/#generator" className="btn-secondary">
            Home system generator
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import type { SeoPageEntry } from "@/lib/seo/types";

interface RelatedPrintablesProps {
  /** Same-category pages (excluding current) — up to 5 for internal link ring */
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
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">
          Related {categoryTitle} printables
        </h2>
        {pages.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.category}/${p.slug}`}
                  className="card inline-block"
                  style={{
                    padding: "var(--space-3) var(--space-5)",
                    textDecoration: "none",
                    color: "var(--color-primary-dark)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--weight-medium)",
                  }}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-ink-muted">
            <Link href={categorySlug ? `/${categorySlug}` : "/"} className="text-primary-dark underline">
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

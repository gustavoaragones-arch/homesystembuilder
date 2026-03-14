import Link from "next/link";
import type { SeoPageEntry } from "@/lib/seo/types";

interface RelatedPagesProps {
  /** Up to 5 related pages for horizontal crawl paths */
  pages: SeoPageEntry[];
  /** Section heading */
  heading?: string;
}

export function RelatedPages({ pages, heading = "Related printables" }: RelatedPagesProps) {
  if (!pages?.length) return null;

  return (
    <section aria-label={heading}>
      <h2 className="mb-6 font-display text-2xl font-bold text-ink">
        {heading}
      </h2>
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
    </section>
  );
}

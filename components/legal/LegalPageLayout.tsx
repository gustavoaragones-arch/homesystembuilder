import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

/**
 * Wrapper for legal pages: readable typography (min 16px), mobile-friendly,
 * uses design tokens. Excluded from programmatic SEO.
 */
export function LegalPageLayout({
  children,
  title,
  description,
}: LegalPageLayoutProps) {
  return (
    <article
      className="mx-auto px-4 py-12 md:px-8"
      style={{
        maxWidth: "var(--max-width-content)",
        paddingTop: "var(--space-12)",
        paddingBottom: "var(--space-12)",
        fontSize: "var(--text-base)",
        lineHeight: "var(--leading-relaxed)",
      }}
    >
      <h1
        className="mb-6 font-display text-2xl font-bold text-ink"
        style={{ marginBottom: "var(--space-6)" }}
      >
        {title}
      </h1>
      <p
        className="mb-10 font-body text-ink-muted"
        style={{
          marginBottom: "var(--space-10)",
          fontSize: "var(--text-md)",
        }}
      >
        {description}
      </p>
      <div
        className="legal-page-content font-body text-ink"
        style={{
          fontSize: "var(--text-base)",
          lineHeight: "var(--leading-relaxed)",
        }}
      >
        {children}
      </div>
    </article>
  );
}

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb nav: Home > Category > Page
 * Creates crawl paths and supports BreadcrumbList schema.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 font-body text-sm text-ink-muted"
      style={{ marginBottom: "var(--space-6)" }}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-ink-faint" aria-hidden>
                ›
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-primary-dark underline underline-offset-2 hover:text-primary-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

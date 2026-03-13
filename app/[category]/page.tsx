import Link from "next/link";
import type { Metadata } from "next";
import { getAllPages, getCategorySlugs, getCategoryTitle } from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const title = getCategoryTitle(category);
  return {
    title: `${title} Printables | HomeSystemBuilder`,
    description: `Browse all ${title.toLowerCase()} printables and templates. Cleaning schedules, chore charts, and home routines.`,
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category } = await params;
  const all = getAllPages();
  const pages = all.filter((p) => p.category === category);
  const categoryTitle = getCategoryTitle(category);

  if (pages.length === 0) {
    return (
      <div className="mx-auto max-w-content px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">No printables in this category</h1>
        <p className="mt-4 font-body text-ink-muted">
          <Link href="/" className="text-primary-dark underline">
            Back to home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-16 md:px-8" style={{ maxWidth: "var(--max-width-layout)" }}>
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">
        {categoryTitle} printables
      </h1>
      <p className="mb-10 font-body text-ink-muted" style={{ marginBottom: "var(--space-10)" }}>
        Browse all {categoryTitle.toLowerCase()} templates and printables. Use the routine generator
        to customize, then download your free PDF.
      </p>

      <nav aria-label={`${categoryTitle} printables`}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.category}/${p.slug}`}
                className="card block"
                style={{
                  padding: "var(--space-4) var(--space-5)",
                  textDecoration: "none",
                  color: "var(--color-primary-dark)",
                  fontWeight: "var(--weight-medium)",
                }}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12 flex flex-wrap gap-4" style={{ marginTop: "var(--space-12)" }}>
        <Link href="/#generator" className="btn-primary">
          Routine generator
        </Link>
        <Link href="/#generator" className="btn-secondary">
          Home system generator
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_OWNER } from "@/data/legal/site";

export const metadata: Metadata = {
  title: "About | HomeSystemBuilder",
  description: `Learn about HomeSystemBuilder and ${SITE_OWNER.name}, the digital product studio that builds household routine and printable planner tools.`,
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <LegalPageLayout
      title="About"
      description="HomeSystemBuilder helps families create cleaning routines, chore charts, printable planners, and home management systems. It is operated by Albor Digital LLC."
    >
      <section className="mb-10" style={{ marginBottom: "var(--space-10)" }}>
        <h2
          className="mb-4 font-display text-xl font-semibold text-ink"
          style={{ marginBottom: "var(--space-4)" }}
        >
          About the Platform
        </h2>
        <p className="mb-4 font-body text-ink-muted" style={{ marginBottom: "var(--space-4)" }}>
          HomeSystemBuilder helps families create:
        </p>
        <ul className="list-inside list-disc space-y-2 font-body text-ink-muted">
          <li>Cleaning routines</li>
          <li>Chore charts</li>
          <li>Printable planners</li>
          <li>Home management systems</li>
        </ul>
        <p className="mt-4 font-body text-ink-muted" style={{ marginTop: "var(--space-4)" }}>
          Our tools and generators are free to use. You can customize outputs by household size,
          number of bathrooms, cleaning frequency, and more, then download printable PDFs for
          personal use.
        </p>
      </section>

      <section>
        <h2
          className="mb-4 font-display text-xl font-semibold text-ink"
          style={{ marginBottom: "var(--space-4)" }}
        >
          About the Company
        </h2>
        <p className="mb-4 font-body text-ink-muted" style={{ marginBottom: "var(--space-4)" }}>
          HomeSystemBuilder is operated by <strong>{SITE_OWNER.name}</strong>, an independent
          digital product studio based in {SITE_OWNER.location}.
        </p>
        <p className="font-body text-ink-muted">
          We build and operate software tools, generators, and digital utilities—not client
          services. Our products are designed for individuals and families who want practical
          tools for home organization and productivity.
        </p>
      </section>
    </LegalPageLayout>
  );
}

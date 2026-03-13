import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { TERMS_SECTIONS } from "@/data/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service | HomeSystemBuilder",
  description:
    "Terms of Service for HomeSystemBuilder.com and digital products operated by Albor Digital LLC.",
  robots: "index, follow",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These terms apply to your use of HomeSystemBuilder.com and all digital products operated by Albor Digital LLC."
    >
      <div className="space-y-10" style={{ marginBottom: "var(--space-10)" }}>
        {TERMS_SECTIONS.map((section) => (
          <section key={section.id}>
            <h2
              className="mb-3 font-display text-lg font-semibold text-ink"
              style={{ marginBottom: "var(--space-3)" }}
            >
              {section.title}
            </h2>
            <p
              className="font-body text-ink-muted whitespace-pre-line"
              style={{ lineHeight: "var(--leading-relaxed)" }}
            >
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </LegalPageLayout>
  );
}

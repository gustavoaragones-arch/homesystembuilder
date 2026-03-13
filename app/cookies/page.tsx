import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | HomeSystemBuilder",
  description:
    "How HomeSystemBuilder and Albor Digital LLC use cookies: essential, analytics, and advertising.",
  robots: "index, follow",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="How we use cookies and how you can manage them."
    >
      <section className="mb-10" style={{ marginBottom: "var(--space-10)" }}>
        <h2
          className="mb-4 font-display text-xl font-semibold text-ink"
          style={{ marginBottom: "var(--space-4)" }}
        >
          Types of Cookies We Use
        </h2>
        <ul className="space-y-4 font-body text-ink-muted">
          <li>
            <strong className="text-ink">Essential cookies:</strong> Required for the site to
            function (e.g., preferences, security). These cannot be disabled without affecting
            core functionality.
          </li>
          <li>
            <strong className="text-ink">Analytics cookies:</strong> Help us understand how
            visitors use the site (e.g., pages viewed, time on site). We may use services such
            as Google Analytics.
          </li>
          <li>
            <strong className="text-ink">Advertising cookies:</strong> Used to deliver relevant
            ads and measure ad performance. These may be set by us or by advertising networks.
          </li>
        </ul>
      </section>

      <section className="mb-10" style={{ marginBottom: "var(--space-10)" }}>
        <h2
          className="mb-4 font-display text-xl font-semibold text-ink"
          style={{ marginBottom: "var(--space-4)" }}
        >
          Third-Party Services
        </h2>
        <p className="mb-4 font-body text-ink-muted" style={{ marginBottom: "var(--space-4)" }}>
          We may use cookies and similar technologies from:
        </p>
        <ul className="list-inside list-disc space-y-2 font-body text-ink-muted">
          <li>Google Analytics (analytics)</li>
          <li>Stripe (payments, if applicable)</li>
          <li>Advertising networks (e.g., for AdSense or similar programs)</li>
        </ul>
        <p className="mt-4 font-body text-ink-muted" style={{ marginTop: "var(--space-4)" }}>
          Each provider has its own privacy and cookie policy. We encourage you to review them.
        </p>
      </section>

      <section>
        <h2
          className="mb-4 font-display text-xl font-semibold text-ink"
          style={{ marginBottom: "var(--space-4)" }}
        >
          Managing Cookies
        </h2>
        <p className="font-body text-ink-muted" style={{ lineHeight: "var(--leading-relaxed)" }}>
          You can manage or disable cookies through your browser settings. Most browsers allow
          you to block or delete cookies. Note that blocking essential cookies may affect site
          functionality. When you first visit, you can use our cookie banner to accept cookies
          or go to &quot;Manage Settings&quot; to learn more and adjust preferences.
        </p>
      </section>
    </LegalPageLayout>
  );
}

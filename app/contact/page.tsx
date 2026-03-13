import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_OWNER } from "@/data/legal/site";
import { ContactForm } from "@/components/legal/ContactForm";

export const metadata: Metadata = {
  title: "Contact | HomeSystemBuilder",
  description: `Contact ${SITE_OWNER.name} about HomeSystemBuilder or other Albor Digital products.`,
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact"
      description={`For questions about HomeSystemBuilder or any Albor Digital product:`}
    >
      <div className="space-y-6" style={{ marginBottom: "var(--space-6)" }}>
        <p className="font-body text-ink-muted" style={{ fontSize: "var(--text-base)" }}>
          <strong className="text-ink">Email:</strong>{" "}
          <a
            href={`mailto:${SITE_OWNER.email}`}
            className="text-primary-dark underline"
          >
            {SITE_OWNER.email}
          </a>
        </p>
        <p className="font-body text-ink-muted">
          We aim to respond to inquiries within a few business days. For legal or privacy
          requests, please include &quot;Legal&quot; or &quot;Privacy&quot; in your subject line.
        </p>
      </div>
      <ContactForm />
    </LegalPageLayout>
  );
}

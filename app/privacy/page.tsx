import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_OWNER } from "@/data/legal/site";

export const metadata: Metadata = {
  title: "Privacy Policy | HomeSystemBuilder",
  description: `Learn how HomeSystemBuilder and ${SITE_OWNER.name} collect and protect your data.`,
  robots: "index, follow",
};

const sections = [
  {
    title: "Information We Collect",
    content: `We may collect information you provide (e.g., form inputs when using our generators), device and browser information, and usage data such as pages visited and time on site. We do not require account creation for most features.`,
  },
  {
    title: "How We Use Data",
    content: `We use data to operate and improve the Site, personalize content, analyze usage, and (where applicable) show relevant advertising. We do not sell personal information to third parties.`,
  },
  {
    title: "Cookies and Tracking",
    content: `We use cookies and similar technologies for essential functionality, analytics, and advertising. See our Cookie Policy for details. You can manage preferences via your browser or our cookie banner.`,
  },
  {
    title: "AI Interaction Data",
    content: `If we use AI or automated systems to generate routine or planner content, inputs and outputs may be processed in accordance with our providers’ policies. Generated content is for personal use only and should not be relied upon as professional advice.`,
  },
  {
    title: "Third-Party Services",
    content: `We may use third-party services (e.g., analytics, hosting, payment processors). Those services have their own privacy policies. We encourage you to review them.`,
  },
  {
    title: "User Rights",
    content: `Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your data. Contact us at ${SITE_OWNER.email} to exercise these rights.`,
  },
  {
    title: "Data Retention",
    content: `We retain data only as long as needed to provide our services, comply with law, or resolve disputes. Cookie and analytics data retention follows our Cookie Policy.`,
  },
  {
    title: "Security",
    content: `We implement reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure; you use the Site at your own risk.`,
  },
  {
    title: "International Transfers",
    content: `We operate in the United States and Canada. Data may be processed in these jurisdictions. By using the Site from elsewhere, you consent to such transfer.`,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description={`Learn how HomeSystemBuilder and ${SITE_OWNER.name} collect and protect your data.`}
    >
      <p className="mb-10 font-body text-ink-muted" style={{ marginBottom: "var(--space-10)" }}>
        <strong>{SITE_OWNER.name}</strong> does not sell personal information to third parties.
      </p>
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2
              className="mb-3 font-display text-lg font-semibold text-ink"
              style={{ marginBottom: "var(--space-3)" }}
            >
              {section.title}
            </h2>
            <p
              className="font-body text-ink-muted"
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

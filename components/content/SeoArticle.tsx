import type { GeneratedContent } from "@/lib/content/generate-content";

interface SeoArticleProps {
  content: GeneratedContent;
}

export function SeoArticle({ content }: SeoArticleProps) {
  return (
    <div className="seo-article space-y-6">
      <p className="font-body text-ink-muted" style={{ lineHeight: "var(--leading-relaxed)" }}>
        {content.intro}
      </p>
      <h2
        className="font-display text-xl font-semibold text-ink"
        style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-3)" }}
      >
        Why structured household routines work
      </h2>
      <p className="font-body text-ink-muted" style={{ lineHeight: "var(--leading-relaxed)" }}>
        {content.section1}
      </p>
      <h2
        className="font-display text-xl font-semibold text-ink"
        style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-3)" }}
      >
        How to use this printable
      </h2>
      <p className="font-body text-ink-muted" style={{ lineHeight: "var(--leading-relaxed)" }}>
        {content.section2}
      </p>
      <ul
        className="list-inside list-disc space-y-2 font-body text-ink-muted"
        style={{ paddingLeft: "var(--space-4)" }}
      >
        {content.tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

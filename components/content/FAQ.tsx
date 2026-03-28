interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  faq: FAQItem[];
}

export function FAQ({ faq }: FAQProps) {
  if (!faq?.length) return null;

  return (
    <div role="region" aria-label="Frequently asked questions">
      <h2
        className="mb-6 font-display text-xl font-semibold text-ink"
        style={{ marginBottom: "var(--space-6)" }}
      >
        Frequently asked questions
      </h2>
      <div className="space-y-6">
        {faq.map((item, i) => (
          <div key={i}>
            <h3
              className="mb-2 font-body text-base font-semibold text-ink"
              style={{ marginBottom: "var(--space-2)" }}
            >
              {item.q}
            </h3>
            <p
              className="font-body text-ink-muted"
              style={{ lineHeight: "var(--leading-relaxed)" }}
            >
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

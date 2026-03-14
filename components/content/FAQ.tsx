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
    <section
      className="mt-10 border-t border-border pt-10"
      style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-10)" }}
      aria-label="Frequently asked questions"
    >
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
    </section>
  );
}

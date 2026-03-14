/**
 * FAQ schema from programmatic content (q/a pairs).
 * Outputs JSON-LD FAQPage for the visible FAQ section.
 */

interface FAQItem {
  q: string;
  a: string;
}

export function faqSchema(faq: FAQItem[]): object {
  if (!Array.isArray(faq) || faq.length === 0) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

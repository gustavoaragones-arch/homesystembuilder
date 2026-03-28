import type { SeoPageEntry } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.homesystembuilder.com";

/** FAQ schema for programmatic pages */
export function buildFaqSchema(entry: SeoPageEntry): object {
  const keyword = entry.keyword;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is a ${keyword}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${keyword} is a printable or digital plan that helps you organize household tasks. Ours is free and can be customized to your home size and routine.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I get the free ${keyword}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the generator on this page to customize your routine and preview your personalized planner on screen. You can print from your browser; PDF export is available when enabled on the site.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the printable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Enter your household size, number of bathrooms, cleaning frequency, and other details in the generator. Your printable will be tailored to your situation.",
        },
      },
    ],
  };
}

/** HowTo schema for programmatic pages */
export function buildHowToSchema(
  entry: SeoPageEntry,
  metaDescription?: string
): object {
  const pageUrl = `${SITE_URL}/${entry.category}/${entry.slug}`;
  const desc =
    metaDescription ??
    entry.description ??
    `Get and use a free printable ${entry.keyword} for your home.`;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use a ${entry.keyword}`,
    description: desc,
    url: pageUrl,
    step: [
      {
        "@type": "HowToStep",
        name: "Customize your routine",
        text: "Use the generator on this page to enter your household size, bathrooms, and cleaning frequency.",
      },
      {
        "@type": "HowToStep",
        name: "Preview your printable",
        text: "Review the on-page planner preview and use your browser print option for a paper copy, or save a PDF when that option is available.",
      },
      {
        "@type": "HowToStep",
        name: "Print and display",
        text: "Print the PDF and place it where your family can see it—kitchen, command center, or fridge.",
      },
    ],
  };
}

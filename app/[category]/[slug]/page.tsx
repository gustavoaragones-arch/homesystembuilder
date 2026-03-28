import { notFound } from "next/navigation";
import type { SeoPageEntry } from "@/lib/seo/types";
import pagesData from "@/data/seo-pages/pages.json";
import { SeoPageTemplate } from "@/components/SeoPageTemplate";
import { RelatedPrintables } from "@/components/RelatedPrintables";
import { SeoArticle } from "@/components/content/SeoArticle";
import { FAQ } from "@/components/content/FAQ";
import { Breadcrumb } from "@/components/content/Breadcrumb";
import { generateContent } from "@/lib/content/generate-content";
import { faqSchema } from "@/lib/seo/faq-schema";
import { breadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import {
  getPageByCategorySlug,
  getRelatedPages,
  getCategoryTitle,
  getDefaultScheduleData,
  getDefaultDescription,
  buildHowToSchema,
} from "@/lib/seo";

/** Only build pages from pages.json — no dynamic params (bad URLs) at runtime */
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const pages = pagesData as SeoPageEntry[];
  return pages.map((page) => ({
    category: page.category,
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const page = getPageByCategorySlug(category, slug);
  if (!page) return { title: "HomeSystemBuilder" };
  const description = getDefaultDescription(page);
  return {
    title: `${page.title} | HomeSystemBuilder`,
    description,
    openGraph: {
      title: page.title,
      description,
      type: "website",
    },
  };
}

export default async function ProgrammaticSeoPage({ params }: PageProps) {
  const { category, slug } = await params;
  const page = getPageByCategorySlug(category, slug);
  if (!page) notFound();

  const description = getDefaultDescription(page);
  const scheduleData = getDefaultScheduleData(page.printableType, page.title);
  const content = generateContent(page.keyword, category);
  const related = getRelatedPages(category, slug, 5);
  const categoryTitle = getCategoryTitle(category);

  const faqJsonLd = faqSchema(content.faq);
  const howToJsonLd = buildHowToSchema(page, description);
  const breadcrumbJsonLd = breadcrumbSchema(category, categoryTitle, page.title, slug);

  const pinterestImages = [1, 2, 3].map((i) => ({
    src: `/pinterest/${slug}-${i}.jpg`,
    alt: `${page.title} - Pin ${i}`,
    title: page.title,
  }));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryTitle, href: `/${category}` },
    { label: page.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto px-4 pt-6 md:px-8" style={{ maxWidth: "var(--max-width-layout)" }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <SeoPageTemplate
        title={page.title}
        description={description}
        category={category}
        keyword={page.keyword}
        printableType={page.printableType}
        eyebrow={page.eyebrow}
        subtitle={page.subtitle}
        ctaPrimaryLabel="Preview Free Printable"
        ctaSecondaryLabel="Customize with generator"
        scheduleData={scheduleData}
        introContent={<SeoArticle content={content} />}
        faqContent={<FAQ faq={content.faq} />}
        pinterestImages={pinterestImages}
      />
      <RelatedPrintables
        pages={related}
        categoryTitle={categoryTitle}
        categorySlug={category}
      />
    </>
  );
}

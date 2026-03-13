import { notFound } from "next/navigation";
import { SeoPageTemplate } from "@/components/SeoPageTemplate";
import { RelatedPrintables } from "@/components/RelatedPrintables";
import {
  getPageByCategorySlug,
  getAllPageParams,
  getRelatedPages,
  getCategoryTitle,
  getDefaultScheduleData,
  getDefaultDescription,
  getDefaultArticleHtml,
  buildFaqSchema,
  buildHowToSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllPageParams();
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
  const articleHtml = getDefaultArticleHtml(page);
  const related = getRelatedPages(category, slug, 6);
  const categoryTitle = getCategoryTitle(category);

  const faqSchema = buildFaqSchema(page);
  const howToSchema = buildHowToSchema(page, description);

  const pinterestImages = [1, 2, 3].map((i) => ({
    src: `/pinterest/${slug}-${i}.jpg`,
    alt: `${page.title} - Pin ${i}`,
    title: page.title,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SeoPageTemplate
        title={page.title}
        description={description}
        category={category}
        keyword={page.keyword}
        printableType={page.printableType}
        eyebrow={page.eyebrow}
        subtitle={page.subtitle}
        ctaPrimaryLabel="Download Free Printable"
        ctaSecondaryLabel="Customize with generator"
        scheduleData={scheduleData}
        articleContent={
          <div
            className="seo-article space-y-6"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        }
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

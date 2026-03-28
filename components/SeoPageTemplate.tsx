"use client";

import { PrintablePreview } from "@/components/PrintablePreview";
import { RoutineGenerator } from "@/components/generator/RoutineGenerator";
import { PremiumBundle } from "@/components/conversion/PremiumBundle";
import type { PrintableScheduleData } from "@/data/types";
import { FEATURES } from "@/config/features";

export interface SeoPageTemplateProps {
  /** Main H1 and meta title */
  title: string;
  /** Meta description and optional hero subtitle */
  description: string;
  /** Category for breadcrumb/eyebrow (e.g. cleaning-schedules, chore-charts) */
  category?: string;
  /** Target keyword for SEO */
  keyword?: string;
  /** Type of printable (e.g. cleaning_schedule, chore_chart) */
  printableType?: string;
  /** Generator variant if needed */
  generatorType?: string;
  /** Hero eyebrow label (defaults from category) */
  eyebrow?: string;
  /** Hero subtitle (defaults to description) */
  subtitle?: string;
  /** Primary CTA label */
  ctaPrimaryLabel?: string;
  /** Secondary CTA label */
  ctaSecondaryLabel?: string;
  /** Printable schedule data for preview and PDF */
  scheduleData: PrintableScheduleData;
  /** Intro article (above preview) */
  introContent: React.ReactNode;
  /** FAQ block (after generator + download funnel) */
  faqContent: React.ReactNode;
  /** Optional: custom PDF download handler */
  onDownloadPdf?: (data: PrintableScheduleData) => void | Promise<void>;
  /** Pinterest-style images: 1000x1500 vertical, with title overlay */
  pinterestImages?: { src: string; alt: string; title: string }[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "cleaning-schedules": "Free printable",
  "chore-charts": "For families",
  "kids-routines": "Kids routines",
  "adhd-cleaning": "ADHD-friendly",
};

export function SeoPageTemplate({
  title,
  description,
  category = "",
  eyebrow,
  subtitle,
  ctaPrimaryLabel = "Preview Free Printable",
  ctaSecondaryLabel = "Customize with generator",
  scheduleData,
  introContent,
  faqContent,
  onDownloadPdf,
  pinterestImages = [],
}: SeoPageTemplateProps) {
  const heroEyebrow = eyebrow ?? (category ? CATEGORY_LABELS[category] ?? category : "Free printable");
  const heroSubtitle = subtitle ?? description;

  return (
    <>
      {/* 1. Hero — CTAs to preview + generator (conversion path) */}
      <section
        className="hero px-4 py-16 text-center md:px-8"
        style={{
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(196, 129, 74, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(122, 158, 135, 0.10) 0%, transparent 55%)
          `,
        }}
      >
        <p
          className="hero-eyebrow mb-4 font-body text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          {heroEyebrow}
        </p>
        <h1
          className="hero-title mx-auto max-w-[660px] font-display text-3xl font-bold leading-tight tracking-tight md:text-[2.75rem]"
          style={{ color: "var(--color-ink)", lineHeight: "var(--leading-tight)" }}
        >
          {title}
        </h1>
        <p
          className="hero-subtitle mx-auto max-w-[520px] font-body text-lg leading-relaxed mb-10"
          style={{ color: "var(--color-ink-muted)", marginBottom: "var(--space-10)" }}
        >
          {heroSubtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#preview" className="btn-primary">
            {ctaPrimaryLabel}
          </a>
          <a href="#generator" className="btn-secondary">
            {ctaSecondaryLabel}
          </a>
        </div>
      </section>

      {/* 2. SEO intro (before printable) */}
      <section
        className="px-4 py-12 md:px-8"
        style={{ paddingTop: "var(--space-12)", paddingBottom: "var(--space-12)" }}
      >
        <article
          className="seo-article mx-auto font-body leading-relaxed"
          style={{
            maxWidth: "var(--max-width-content)",
            color: "var(--color-ink-muted)",
            lineHeight: "var(--leading-relaxed)",
            fontSize: "var(--text-md)",
          }}
        >
          {introContent}
        </article>
      </section>

      {/* 3. Printable preview + free PDF from template data */}
      <section
        id="preview"
        className="border-y border-border bg-bg-surface px-4 py-16 md:px-8"
        style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-width-layout)" }}>
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">
            Your printable preview
          </h2>
          <PrintablePreview
            scheduleData={scheduleData}
            onDownloadPdf={onDownloadPdf}
            showPdfDownloadButton={FEATURES.PDF_DOWNLOAD}
          />
          <p className="mt-6 text-center font-body text-sm text-ink-muted" style={{ marginTop: "var(--space-6)" }}>
            {FEATURES.PDF_DOWNLOAD
              ? "Preview the planner above, save a PDF when ready, or customize below — email unlock may apply for downloads."
              : "Preview the planner on screen, print from your browser, or customize below. High-quality PDFs are coming soon — join early access in the section after your routine."}
          </p>
        </div>
      </section>

      {/* 4. Routine generator + download funnel (uses page printable until user generates) */}
      <section
        id="generator"
        className="border-y border-border bg-bg-surface px-4 py-16 md:px-8"
        style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-width-layout)" }}>
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">
            Customize your routine
          </h2>
          <RoutineGenerator pagePrintable={scheduleData} />
        </div>
      </section>

      {/* 5. FAQ */}
      <section
        id="faq"
        className="px-4 py-16 md:px-8"
        style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-width-content)" }}>
          {faqContent}
        </div>
      </section>

      {/* 6. Premium bundle (gated) */}
      {FEATURES.PREMIUM ? <PremiumBundle /> : null}

      {/* 7. Pinterest */}
      {pinterestImages.length > 0 && (
        <section
          className="px-4 py-16 md:px-8"
          style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
        >
          <div className="mx-auto" style={{ maxWidth: "var(--max-width-layout)" }}>
            <h2 className="mb-8 font-display text-2xl font-bold text-ink text-center">
              Save & share
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {pinterestImages.map((img, i) => (
                <figure
                  key={i}
                  className="animate-fade-up overflow-hidden rounded-lg"
                  style={{
                    aspectRatio: "1000 / 1500",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 flex items-end p-4"
                      style={{
                        background: "linear-gradient(to top, rgba(59, 53, 48, 0.85), transparent 60%)",
                        padding: "var(--space-4)",
                      }}
                    >
                      <span
                        className="font-display text-lg font-semibold"
                        style={{ color: "var(--color-white)" }}
                      >
                        {img.title}
                      </span>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

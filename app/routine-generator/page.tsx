import type { Metadata } from "next";
import Link from "next/link";
import { RoutineGenerator } from "@/components/RoutineGenerator";

export const metadata: Metadata = {
  title: "Routine Generator | HomeSystemBuilder",
  description:
    "Generate a personalized household routine. Enter your home size, kids, and cleaning frequency to get a custom schedule and chore chart.",
};

export default function RoutineGeneratorPage() {
  return (
    <div className="mx-auto px-4 py-16 md:px-8" style={{ maxWidth: "var(--max-width-layout)" }}>
      <h1 className="mb-4 font-display text-3xl font-bold text-ink">
        Routine generator
      </h1>
      <p className="mb-10 font-body text-ink-muted" style={{ marginBottom: "var(--space-10)" }}>
        Customize your cleaning schedule and chore chart by household size, bathrooms, and
        cleaning frequency. Then download your free printable.
      </p>
      <RoutineGenerator />
      <p className="mt-8 font-body text-sm text-ink-muted">
        <Link href="/" className="text-primary-dark underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

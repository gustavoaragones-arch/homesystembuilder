import type { Metadata } from "next";
import Link from "next/link";
import { RoutineGenerator } from "@/components/RoutineGenerator";

export const metadata: Metadata = {
  title: "Home System Generator | HomeSystemBuilder",
  description:
    "Build your home system: cleaning routines, chore charts, and printable planners tailored to your household.",
};

export default function HomeSystemGeneratorPage() {
  return (
    <div className="mx-auto px-4 py-16 md:px-8" style={{ maxWidth: "var(--max-width-layout)" }}>
      <h1 className="mb-4 font-display text-3xl font-bold text-ink">
        Home system generator
      </h1>
      <p className="mb-10 font-body text-ink-muted" style={{ marginBottom: "var(--space-10)" }}>
        Create a personalized home system with cleaning schedules, chore charts, and kids
        routines. Enter your details below and download your free printables.
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

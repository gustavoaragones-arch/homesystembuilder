"use client";

import Link from "next/link";

export function PremiumBundle() {
  return (
    <section
      id="premium-bundle"
      className="border-y border-border bg-bg-surface px-4 py-[var(--space-16)] md:px-8"
    >
      <div className="mx-auto max-w-content text-center">
        <div className="card p-[var(--space-10)]">
          <h2 className="mb-[var(--space-4)] font-display text-2xl font-bold text-ink">
            Complete Home System Bundle
          </h2>
          <p className="mb-[var(--space-6)] font-body text-ink-muted">Includes:</p>
          <ul className="mx-auto mb-[var(--space-8)] max-w-md list-inside list-disc text-left font-body text-ink-muted">
            <li>Cleaning planners</li>
            <li>Chore charts</li>
            <li>Kids routines</li>
            <li>ADHD system</li>
            <li>Home binder pages</li>
          </ul>
          <div className="flex flex-wrap justify-center gap-[var(--space-3)]">
            <button type="button" className="btn-primary">
              Unlock full system
            </button>
            <Link href="/planners" className="btn-secondary">
              Browse planners
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

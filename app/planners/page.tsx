import Link from "next/link";

export default function PlannersPage() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-layout text-center">
        <h1 className="font-display text-3xl font-bold text-ink mb-4">
          Printable planners
        </h1>
        <p className="font-body text-ink-muted mb-8 max-w-[520px] mx-auto">
          Cleaning schedules, chore charts, and family planners you can print at home.
        </p>
        <Link href="/cleaning-schedule" className="btn-primary inline-block">
          View cleaning schedule
        </Link>
      </div>
    </section>
  );
}

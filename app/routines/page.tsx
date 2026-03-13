import Link from "next/link";

export default function RoutinesPage() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-layout text-center">
        <h1 className="font-display text-3xl font-bold text-ink mb-4">
          Household routines
        </h1>
        <p className="font-body text-ink-muted mb-8 max-w-[520px] mx-auto">
          Browse routine templates and use the generator to build your own.
        </p>
        <Link href="/#generator" className="btn-primary inline-block">
          Open routine generator
        </Link>
      </div>
    </section>
  );
}

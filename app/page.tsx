import Link from "next/link";
import { RoutineGenerator } from "@/components/RoutineGenerator";
import { PrintablePreview } from "@/components/PrintablePreview";

export default function HomePage() {
  return (
    <>
      <section
        className="hero px-4 py-20 text-center md:px-8"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(196, 129, 74, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(122, 158, 135, 0.10) 0%, transparent 55%)
          `,
        }}
      >
        <p className="hero-eyebrow mb-4 font-body text-xs font-semibold uppercase tracking-widest text-accent">
          For families who want a calmer home
        </p>
        <h1 className="hero-title mx-auto max-w-[660px] font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.75rem]">
          Build your <em>personalized</em> household routine
        </h1>
        <p className="hero-subtitle mx-auto max-w-[520px] font-body text-lg text-ink-muted leading-relaxed mb-10">
          Get a custom cleaning schedule, chore chart, and printable planners tailored to your household size, kids, and lifestyle.
        </p>
        <Link href="#generator" className="btn-primary inline-block">
          Start building
        </Link>
      </section>

      <section id="generator" className="section-tinted border-y border-border px-4 py-16 md:px-8">
        <div className="mx-auto max-w-layout">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">
            Routine generator
          </h2>
          <RoutineGenerator />
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-layout">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">
            Your printable preview
          </h2>
          <PrintablePreview
            scheduleData={{
              title: "Sample Weekly Cleaning Schedule",
              dailyTasks: ["Make beds", "Wipe counters", "Quick tidy"],
              weeklySchedule: [
                { day: "Monday", tasks: ["Bathrooms", "Vacuum"] },
                { day: "Tuesday", tasks: ["Kitchen deep clean", "Laundry"] },
              ],
              choreChart: [],
              kidsRoutine: [],
            }}
          />
        </div>
      </section>

      <section className="section-tinted border-y border-border px-4 py-16 md:px-8">
        <div className="mx-auto max-w-layout text-center">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            Premium bundle
          </h2>
          <p className="mx-auto max-w-[520px] font-body text-ink-muted mb-8">
            Get the full set of planners: morning & evening routines, meal planner, and seasonal cleaning checklist — all in one download.
          </p>
          <button type="button" className="btn-primary">
            Get the premium bundle
          </button>
        </div>
      </section>
    </>
  );
}

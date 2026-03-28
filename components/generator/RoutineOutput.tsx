import { getTimeLabel } from "@/lib/generator/time-labels";
import type { RoutineEngineOutput, TaskCategory } from "@/lib/generator/routine-engine";
import { FEATURES } from "@/config/features";
import { RoutinePdfToolbar } from "@/components/generator/RoutinePdfToolbar";
import { PlannerEarlyAccess } from "@/components/conversion/PlannerEarlyAccess";

function categoryLabel(c: TaskCategory): string {
  const map: Record<TaskCategory, string> = {
    morning: "Morning",
    midday: "Midday",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
    kids: "Kids",
    general: "General",
  };
  return map[c];
}

function categoryTagClass(c: TaskCategory): string {
  if (c === "morning" || c === "general") return "tag tag-sage shrink-0";
  if (c === "evening" || c === "kids") return "tag tag-peach shrink-0";
  return "tag tag-sand shrink-0";
}

interface RoutineOutputProps {
  data: RoutineEngineOutput | null;
}

export default function RoutineOutput({ data }: RoutineOutputProps) {
  if (!data) return null;

  const { daily_cleaning_tasks: daily, weekly_schedule: weekly, chore_chart_by_age: chores } = data;

  return (
    <div className="card-planner planner-sheet">
      <h2 className="planner-sheet-header font-display text-xl font-bold text-primary-dark border-b-2 border-primary-light pb-[var(--space-3)] mb-[var(--space-6)]">
        Your personalized routine
      </h2>

      <section className="mb-[var(--space-8)]">
        <h3 className="tag tag-sage mb-[var(--space-4)]">Daily routine</h3>
        <ul className="space-y-0">
          {daily.map((item, i) => (
            <li
              key={`${item.task}-${i}`}
              className="planner-time-block border-b border-dashed border-border"
            >
              <div className="planner-time-label font-mono text-xs font-medium text-accent min-w-[4.5rem]">
                {getTimeLabel(i)}
              </div>
              <div className="planner-task-line flex flex-col gap-[var(--space-2)] sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-ink">{item.task}</span>
                <span className={categoryTagClass(item.category)}>{categoryLabel(item.category)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="planner-line-dashed" aria-hidden />

      <section className="mb-[var(--space-8)]">
        <h3 className="tag tag-peach mb-[var(--space-4)]">Weekly tasks</h3>
        <ul className="space-y-0">
          {weekly.map(({ day, tasks }) => (
            <li key={day} className="planner-time-block border-b border-dashed border-border">
              <div className="planner-time-label font-mono text-xs font-medium text-accent min-w-[4.5rem]">
                {day}
              </div>
              <div className="planner-task-line text-sm text-ink-muted">{tasks.join(" · ")}</div>
            </li>
          ))}
        </ul>
      </section>

      {chores.length > 0 ? (
        <>
          <div className="planner-line-dashed" aria-hidden />
          <section>
            <h3 className="tag tag-sand mb-[var(--space-4)]">Chore chart by age</h3>
            <ul className="space-y-[var(--space-6)]">
              {chores.map((row) => (
                <li key={row.ageBracket}>
                  <p className="tag tag-peach mb-[var(--space-2)]">{row.ageBracket}</p>
                  <ul className="space-y-0 border-t border-dashed border-border pt-[var(--space-2)]">
                    {row.chores.map((c) => (
                      <li key={c} className="planner-time-block border-b border-dashed border-border text-sm text-ink-muted">
                        <span className="planner-time-label font-mono text-xs min-w-[4.5rem]">•</span>
                        <span className="planner-task-line">{c}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}

      {FEATURES.PDF_DOWNLOAD ? (
        <RoutinePdfToolbar routine={data} />
      ) : (
        <div className="mt-[var(--space-8)] border-t border-dashed border-border pt-[var(--space-6)]">
          <PlannerEarlyAccess idPrefix="routine-output" />
        </div>
      )}
    </div>
  );
}

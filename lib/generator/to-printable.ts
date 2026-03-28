import type { PrintableScheduleData } from "@/data/types";
import type { RoutineEngineOutput } from "./routine-engine";

/** Map engine output to printable / PDF shape */
export function routineOutputToPrintable(
  out: RoutineEngineOutput,
  title: string
): PrintableScheduleData {
  const choreChart = out.chore_chart_by_age.flatMap((row) =>
    row.chores.map((c) => ({ task: c, assignee: row.ageBracket }))
  );

  const kidsRoutine =
    out.chore_chart_by_age.length > 0
      ? [
          { time: "7:30", activity: "Morning routine checklist" },
          { time: "15:30", activity: "After-school tasks" },
          { time: "19:00", activity: "Evening tidy" },
        ]
      : [];

  return {
    title,
    dailyTasks: out.daily_cleaning_tasks.map((d) => d.task),
    weeklySchedule: out.weekly_schedule,
    choreChart,
    kidsRoutine,
  };
}

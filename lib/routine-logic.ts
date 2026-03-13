import type { RoutineGeneratorInputs, RoutineGeneratorOutputs } from "@/data/types";

const BASE_DAILY = ["Make beds", "Wipe kitchen counters", "Quick tidy common areas"];
const DEEP_DAILY = [...BASE_DAILY, "Sweep high-traffic areas", "Load dishwasher"];
const DEEP_EXTRA = ["Mop floors", "Clean bathroom sinks", "Take out trash"];

const WEEKLY_BASE = [
  { day: "Monday", tasks: ["Bathrooms", "Vacuum main areas"] },
  { day: "Tuesday", tasks: ["Kitchen deep clean", "Laundry"] },
  { day: "Wednesday", tasks: ["Dusting", "Change sheets (optional)"] },
  { day: "Thursday", tasks: ["Bathrooms", "Vacuum"] },
  { day: "Friday", tasks: ["Kitchen", "Tidy for weekend"] },
  { day: "Saturday", tasks: ["Laundry", "Outdoor / errands"] },
  { day: "Sunday", tasks: ["Rest / light tidy", "Plan week ahead"] },
];

export function generateRoutineFromInputs(
  inputs: RoutineGeneratorInputs
): RoutineGeneratorOutputs {
  const { cleaning_frequency, children_count, house_size, bathrooms } = inputs;

  const daily_cleaning_tasks =
    cleaning_frequency === "deep"
      ? [...DEEP_DAILY, ...DEEP_EXTRA]
      : cleaning_frequency === "moderate"
        ? DEEP_DAILY
        : BASE_DAILY;

  const weekly_cleaning_schedule = WEEKLY_BASE.map((row) => {
    const extra =
      bathrooms > 2 && row.tasks.includes("Bathrooms")
        ? [`(${bathrooms} bathrooms)`]
        : [];
    return { day: row.day, tasks: [...row.tasks, ...extra] };
  });

  const chore_chart: { task: string; assignee?: string }[] = [
    { task: "Set table", assignee: children_count > 0 ? "Kids (rotate)" : undefined },
    { task: "Take out recycling", assignee: undefined },
    { task: "Vacuum own room", assignee: children_count > 0 ? "Older kids" : undefined },
    { task: "Feed pets", assignee: inputs.pets ? "Assign" : undefined },
  ].filter((c) => (c.task === "Feed pets" ? !!inputs.pets : true));

  const kids_routine: { time: string; activity: string }[] =
    children_count > 0
      ? [
          { time: "7:00", activity: "Wake up, get dressed" },
          { time: "7:30", activity: "Breakfast" },
          { time: "8:00", activity: "Brush teeth, pack bag" },
          { time: "15:30", activity: "Snack, homework" },
          { time: "18:00", activity: "Dinner" },
          { time: "19:00", activity: "Bath, pajamas" },
          { time: "19:30", activity: "Quiet time / bedtime" },
        ]
      : [];

  return {
    daily_cleaning_tasks,
    weekly_cleaning_schedule,
    chore_chart,
    kids_routine,
  };
}

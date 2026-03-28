/**
 * Deterministic routine generation — client-side, no API.
 */

export interface RoutineEngineInput {
  household_size: number;
  children_count: number;
  children_ages: string;
  pets: "yes" | "no";
  house_size: "small" | "medium" | "large";
  bathrooms: number;
  cleaning_frequency: "light" | "moderate" | "deep";
}

export type TaskCategory = "morning" | "midday" | "afternoon" | "evening" | "night" | "kids" | "general";

export interface DailyTaskItem {
  task: string;
  /** Visual / grouping tag (morning, evening, kids, etc.) */
  category: TaskCategory;
}

export interface ChoreByAge {
  ageBracket: string;
  chores: string[];
}

export interface RoutineEngineOutput {
  daily_cleaning_tasks: DailyTaskItem[];
  weekly_schedule: { day: string; tasks: string[] }[];
  chore_chart_by_age: ChoreByAge[];
}

const WEEKLY_BASE: { day: string; tasks: string[] }[] = [
  { day: "Monday", tasks: ["Deep clean bathrooms", "Laundry"] },
  { day: "Tuesday", tasks: ["Kitchen focus", "Dust surfaces"] },
  { day: "Wednesday", tasks: ["Vacuum main areas", "Meal prep tidy"] },
  { day: "Thursday", tasks: ["Bathrooms touch-up", "Floors"] },
  { day: "Friday", tasks: ["Kitchen reset", "Laundry"] },
  { day: "Saturday", tasks: ["Family zone clean", "Outdoor / errands"] },
  { day: "Sunday", tasks: ["Rest / light tidy", "Plan week ahead"] },
];

function parseAges(agesStr: string): number[] {
  return agesStr
    .split(/[,;\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n) && n > 0 && n < 19);
}

function bucketForAge(age: number): string {
  if (age <= 5) return "Ages 3–5";
  if (age <= 9) return "Ages 6–9";
  if (age <= 12) return "Ages 10–12";
  return "Teens 13+";
}

function defaultChoresForBucket(bracket: string): string[] {
  if (bracket === "Ages 3–5") return ["Put toys in bin", "Help set napkins", "Sort socks"];
  if (bracket === "Ages 6–9") return ["Clear dishes", "Feed pet (with help)", "Tidy bedroom"];
  if (bracket === "Ages 10–12") return ["Load dishwasher", "Vacuum one room", "Take out trash"];
  return ["Laundry fold", "Bathroom wipe-down", "Cooking prep help"];
}

function pushDaily(out: DailyTaskItem[], task: string, category: TaskCategory) {
  out.push({ task, category });
}

export function generateRoutine(data: RoutineEngineInput): RoutineEngineOutput {
  const daily: DailyTaskItem[] = [];

  pushDaily(daily, "Make beds", "morning");
  pushDaily(daily, "Wipe kitchen counters", "morning");
  pushDaily(daily, "Quick tidy high-traffic areas", "afternoon");

  if (data.house_size === "large") {
    pushDaily(daily, "Vacuum main areas daily", "afternoon");
  }

  if (data.house_size === "small") {
    pushDaily(daily, "10-minute evening reset", "evening");
  }

  if (data.children_count > 0) {
    pushDaily(daily, "Assign one daily chore to children", "kids");
  }

  if (data.pets === "yes") {
    pushDaily(daily, "Pet feeding / water check", "morning");
  }

  if (data.cleaning_frequency === "moderate") {
    pushDaily(daily, "Load or empty dishwasher", "evening");
    pushDaily(daily, "Sweep kitchen floor", "afternoon");
  }

  if (data.cleaning_frequency === "deep") {
    pushDaily(daily, "Mop hard floors", "evening");
    pushDaily(daily, "Clean bathroom sinks", "midday");
    pushDaily(daily, "Take out trash", "evening");
  }

  const weekly = WEEKLY_BASE.map((row) => {
    const extra =
      data.bathrooms > 2 && row.tasks.some((t) => t.toLowerCase().includes("bathroom"))
        ? [`Extra bath care (${data.bathrooms} baths)`]
        : [];
    return { day: row.day, tasks: [...row.tasks, ...extra] };
  });

  const ages = parseAges(data.children_ages);
  const chore_chart_by_age: ChoreByAge[] = [];

  if (data.children_count > 0) {
    const brackets = new Set<string>();
    if (ages.length > 0) {
      ages.forEach((a) => brackets.add(bucketForAge(a)));
    } else {
      brackets.add("School-age kids");
    }
    brackets.forEach((bracket) => {
      chore_chart_by_age.push({
        ageBracket: bracket,
        chores: defaultChoresForBucket(bracket),
      });
    });
  }

  return {
    daily_cleaning_tasks: daily,
    weekly_schedule: weekly,
    chore_chart_by_age,
  };
}

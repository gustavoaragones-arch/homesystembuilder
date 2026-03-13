export interface RoutineGeneratorInputs {
  household_size: number;
  children_count: number;
  children_ages: string;
  pets: string;
  house_size: "small" | "medium" | "large";
  bathrooms: number;
  cleaning_frequency: "light" | "moderate" | "deep";
}

export interface RoutineGeneratorOutputs {
  daily_cleaning_tasks: string[];
  weekly_cleaning_schedule: { day: string; tasks: string[] }[];
  chore_chart: { task: string; assignee?: string }[];
  kids_routine: { time: string; activity: string }[];
}

export interface PrintableScheduleData {
  title: string;
  dailyTasks: string[];
  weeklySchedule: { day: string; tasks: string[] }[];
  choreChart: { task: string; assignee?: string }[];
  kidsRoutine: { time: string; activity: string }[];
}

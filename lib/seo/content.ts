import type { PrintableScheduleData } from "@/data/types";
import type { SeoPageEntry } from "./types";

const DEFAULT_DAILY = ["Make beds", "Wipe counters", "Quick tidy", "Load dishwasher"];
const DEFAULT_WEEKLY = [
  { day: "Monday", tasks: ["Bathrooms", "Vacuum"] },
  { day: "Tuesday", tasks: ["Kitchen deep clean", "Laundry"] },
  { day: "Wednesday", tasks: ["Dusting"] },
  { day: "Thursday", tasks: ["Bathrooms", "Vacuum"] },
  { day: "Friday", tasks: ["Kitchen", "Tidy for weekend"] },
];
const DEFAULT_CHORE = [
  { task: "Set table", assignee: "Rotate" },
  { task: "Put away toys", assignee: "Kids" },
  { task: "Take out recycling", assignee: "Older kids" },
];
const DEFAULT_KIDS_ROUTINE = [
  { time: "7:00", activity: "Wake up, get dressed" },
  { time: "7:30", activity: "Breakfast" },
  { time: "8:00", activity: "Brush teeth, pack bag" },
];

/** Default printable schedule data by printableType */
export function getDefaultScheduleData(
  printableType: string,
  title: string
): PrintableScheduleData {
  switch (printableType) {
    case "chore_chart":
      return {
        title: title || "Family Chore Chart",
        dailyTasks: [],
        weeklySchedule: [],
        choreChart: DEFAULT_CHORE,
        kidsRoutine: [],
      };
    case "kids_routine":
      return {
        title: title || "Kids Routine",
        dailyTasks: [],
        weeklySchedule: [],
        choreChart: [],
        kidsRoutine: DEFAULT_KIDS_ROUTINE,
      };
    default:
      return {
        title: title || "Weekly Cleaning Schedule",
        dailyTasks: DEFAULT_DAILY,
        weeklySchedule: DEFAULT_WEEKLY,
        choreChart: [],
        kidsRoutine: [],
      };
  }
}

/** Default meta description from title and keyword */
export function getDefaultDescription(entry: SeoPageEntry): string {
  if (entry.description) return entry.description;
  return `Download a printable ${entry.keyword} and generate a personalized home routine. Free PDF from HomeSystemBuilder.`;
}

/** Default SEO article HTML when articleHtml not in JSON */
export function getDefaultArticleHtml(entry: SeoPageEntry): string {
  if (entry.articleHtml) return entry.articleHtml;
  const k = entry.keyword;
  const t = entry.title;
  return `
    <p>A ${k} helps you stay on top of household tasks without overwhelm. Whether you have a small apartment or a busy family home, having a clear plan makes it easier to maintain a calm, organized space.</p>
    <p>Use our free generator below to customize your routine by household size, number of bathrooms, and how often you want to clean. Then download your free PDF and print it for the kitchen or command center.</p>
    <h2>Why use a ${t.toLowerCase()}?</h2>
    <p>Consistency beats intensity. A little each day prevents weekend marathons and keeps your space welcoming. A printed schedule also gets the whole family on the same page—everyone can see their tasks and you can track what's done.</p>
    <h2>How to get started</h2>
    <ul>
      <li>Scroll to the generator and enter your household details.</li>
      <li>Download your free printable using the button below.</li>
      <li>Print and display it where everyone can see it.</li>
      <li>Adjust as needed—your routine can evolve with your family.</li>
    </ul>
  `;
}

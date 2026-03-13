import type { PrintableScheduleData } from "./types";

export interface SeoPagePayload {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  articleHtml: string;
  printableTitle: string;
  sampleSchedule?: Partial<PrintableScheduleData>;
}

const SEO_PAGES: SeoPagePayload[] = [
  {
    slug: "cleaning-schedule",
    title: "Free Printable Cleaning Schedule",
    metaDescription:
      "Get a free printable cleaning schedule tailored to your home. Daily and weekly tasks, chore charts, and tips for keeping your house clean.",
    eyebrow: "Free printable",
    heroTitle: "Your free printable cleaning schedule",
    heroSubtitle:
      "Download a simple, customizable cleaning schedule you can print and stick on the fridge. Perfect for busy families.",
    ctaLabel: "Download free PDF",
    printableTitle: "Weekly Cleaning Schedule",
    articleHtml: `
      <p>A printable cleaning schedule helps you stay on top of household tasks without overwhelm. Whether you have a small apartment or a large family home, breaking chores into daily and weekly blocks makes maintenance manageable.</p>
      <p>Use our generator above to customize tasks by household size, number of bathrooms, and how often you want to clean. Then download your free PDF and print it for the kitchen or command center.</p>
      <h2>Why use a cleaning schedule?</h2>
      <p>Consistency beats intensity. A little each day prevents weekend cleaning marathons and keeps your space welcoming. A printed schedule also gets the whole family on the same page—kids can see their chores and you can track what’s done.</p>
    `,
    sampleSchedule: {
      dailyTasks: ["Make beds", "Wipe counters", "Quick tidy", "Load dishwasher"],
      weeklySchedule: [
        { day: "Monday", tasks: ["Bathrooms", "Vacuum"] },
        { day: "Tuesday", tasks: ["Kitchen deep clean", "Laundry"] },
        { day: "Wednesday", tasks: ["Dusting"] },
        { day: "Thursday", tasks: ["Bathrooms", "Vacuum"] },
        { day: "Friday", tasks: ["Kitchen", "Tidy for weekend"] },
      ],
    },
  },
  {
    slug: "chore-chart",
    title: "Free Printable Chore Chart for Kids",
    metaDescription:
      "Printable chore chart for kids. Assign age-appropriate tasks and teach responsibility with a simple, visual chart.",
    eyebrow: "For families",
    heroTitle: "Printable chore chart for kids",
    heroSubtitle:
      "Age-appropriate chores and a simple chart that kids can follow. Print, assign, and reward—no app required.",
    ctaLabel: "Get your chore chart",
    printableTitle: "Family Chore Chart",
    articleHtml: `
      <p>Chore charts give kids clear expectations and a sense of contribution. When tasks are visible and consistent, even young children can learn to help with daily routines.</p>
      <p>Our generator lets you choose how many children you have and their ages, so we can suggest tasks that fit. Download the PDF and use stickers or checkmarks to track progress each week.</p>
    `,
    sampleSchedule: {
      choreChart: [
        { task: "Set table", assignee: "Rotate" },
        { task: "Put away toys", assignee: "Under 6" },
        { task: "Take out recycling", assignee: "Older kids" },
      ],
    },
  },
];

export async function getSeoPageBySlug(slug: string): Promise<SeoPagePayload | null> {
  return SEO_PAGES.find((p) => p.slug === slug) ?? null;
}

export async function getAllSeoSlugs(): Promise<string[]> {
  return SEO_PAGES.map((p) => p.slug);
}

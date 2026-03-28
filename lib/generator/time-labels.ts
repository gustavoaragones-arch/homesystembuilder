const SLOTS = ["Morning", "Midday", "Afternoon", "Evening", "Night"] as const;

/** Maps row index to a printable time-band label (deterministic, planner-style). */
export function getTimeLabel(index: number): string {
  return SLOTS[index] ?? "Task";
}

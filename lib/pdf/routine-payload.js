/**
 * Maps generator / printable shapes → PdfPlannerPayload for lib/pdf/template.js
 */

const TIME_SLOTS = ["Morning", "Midday", "Afternoon", "Evening", "Night"];

function getTimeLabel(index) {
  return TIME_SLOTS[index] ?? "Task";
}

const CATEGORY_LABELS = {
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
  kids: "Kids",
  general: "General",
};

function categoryLabel(category) {
  if (!category) return "";
  return CATEGORY_LABELS[category] || String(category);
}

/** @param {object} routine — RoutineEngineOutput shape */
function routineEngineToPdfPayload(routine, title = "Your personalized routine") {
  const daily = routine.daily_cleaning_tasks || [];
  const dailyRows = daily.map((item, i) => {
    const task = typeof item === "string" ? item : item.task;
    const cat = typeof item === "string" ? "" : categoryLabel(item.category);
    return {
      slotLabel: getTimeLabel(i),
      task,
      categoryLabel: cat,
    };
  });

  const weekly = routine.weekly_schedule || [];
  const weeklyRows = weekly.map((row) => ({
    label: row.day,
    line: (row.tasks || []).join(" · "),
  }));

  /** @type {{ heading: string, items: string[] }[]} */
  const choreSections = [];
  const byAge = routine.chore_chart_by_age || [];
  for (const row of byAge) {
    choreSections.push({
      heading: row.ageBracket,
      items: row.chores || [],
    });
  }

  return {
    title,
    dailyRows,
    weeklyRows,
    choreChartTitle: byAge.length ? "Chore chart by age" : undefined,
    choreSections: choreSections.length ? choreSections : undefined,
    kidsRoutine: undefined,
  };
}

/** @param {object} schedule — PrintableScheduleData shape */
function printableScheduleToPdfPayload(schedule) {
  const dailyTasks = schedule.dailyTasks || [];
  const dailyRows = dailyTasks.map((task, i) => ({
    slotLabel: getTimeLabel(i),
    task,
    categoryLabel: "",
  }));

  const weekly = schedule.weeklySchedule || [];
  const weeklyRows = weekly.map((row) => ({
    label: row.day,
    line: (row.tasks || []).join(" · "),
  }));

  const choreChart = schedule.choreChart || [];
  /** @type {{ heading: string, items: string[] }[]} */
  const choreSections = [];
  if (choreChart.length > 0) {
    choreSections.push({
      heading: "Chore chart",
      items: choreChart.map((c) => {
        const a = c.assignee ? ` (${c.assignee})` : "";
        return `${c.task}${a}`;
      }),
    });
  }

  return {
    title: schedule.title || "Your cleaning schedule",
    dailyRows,
    weeklyRows,
    choreSections: choreSections.length ? choreSections : undefined,
    kidsRoutine: schedule.kidsRoutine?.length ? schedule.kidsRoutine : undefined,
  };
}

module.exports = {
  routineEngineToPdfPayload,
  printableScheduleToPdfPayload,
  getTimeLabel,
};

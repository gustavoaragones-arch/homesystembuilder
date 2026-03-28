/**
 * PDF Generator — HomeSystemBuilder
 * Uses Puppeteer to generate a printable cleaning schedule from JSON data.
 * Run: node lib/pdf-generator.js
 * Or call from an API route with schedule data.
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

/**
 * @typedef {Object} ScheduleData
 * @property {string} title
 * @property {string[]} dailyTasks
 * @property {{ day: string; tasks: string[] }[]} weeklySchedule
 * @property {{ task: string; assignee?: string }[]} choreChart
 * @property {{ time: string; activity: string }[]} kidsRoutine
 */

/**
 * Generates HTML for the printable schedule (inline styles for Puppeteer).
 * @param {ScheduleData} data
 * @returns {string}
 */
function buildScheduleHtml(data) {
  const styles = `
    * { box-sizing: border-box; }
    body {
      font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
      color: #3B3530;
      background: #fff;
      padding: 40px;
      font-size: 14px;
      line-height: 1.6;
    }
    .planner-sheet { max-width: 720px; margin: 0 auto; }
    .planner-sheet-header {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #567367;
      border-bottom: 2px solid #BDD5C4;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    section { margin-bottom: 28px; }
    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 16px;
      font-weight: 600;
      color: #3B3530;
      margin-bottom: 12px;
    }
    .planner-time-block {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 8px 0;
    }
    .planner-line-dashed { border-bottom: 1px dashed #DDD5CA; }
    .planner-time-label { font-family: 'DM Mono', monospace; font-size: 12px; color: #C4814A; min-width: 52px; }
    .planner-task-line { flex: 1; color: #7A6F66; font-size: 13px; }
    .assignee-hint { color: #C4814A; }
  `;

  let body = `<div class="planner-sheet"><div class="planner-sheet-header">${escapeHtml(data.title)}</div>`;

  if (data.dailyTasks && data.dailyTasks.length) {
    body += `<section><h3>Daily tasks</h3>`;
    data.dailyTasks.forEach((task) => {
      body += `<div class="planner-time-block planner-line-dashed"><span class="planner-time-label">•</span><span class="planner-task-line">${escapeHtml(task)}</span></div>`;
    });
    body += `</section>`;
  }

  if (data.weeklySchedule && data.weeklySchedule.length) {
    body += `<section><h3>Weekly schedule</h3>`;
    data.weeklySchedule.forEach(({ day, tasks }) => {
      body += `<div class="planner-time-block planner-line-dashed"><span class="planner-time-label">${escapeHtml(day)}</span><span class="planner-task-line">${escapeHtml(tasks.join(" · "))}</span></div>`;
    });
    body += `</section>`;
  }

  if (data.choreChart && data.choreChart.length) {
    body += `<section><h3>Chore chart</h3>`;
    data.choreChart.forEach(({ task, assignee }) => {
      body += `<div class="planner-time-block planner-line-dashed"><span class="planner-time-label">—</span><span class="planner-task-line">${escapeHtml(task)}${assignee ? ` <span class="assignee-hint">(${escapeHtml(assignee)})</span>` : ""}</span></div>`;
    });
    body += `</section>`;
  }

  if (data.kidsRoutine && data.kidsRoutine.length) {
    body += `<section><h3>Kids routine</h3>`;
    data.kidsRoutine.forEach(({ time, activity }) => {
      body += `<div class="planner-time-block planner-line-dashed"><span class="planner-time-label">${escapeHtml(time)}</span><span class="planner-task-line">${escapeHtml(activity)}</span></div>`;
    });
    body += `</section>`;
  }

  body += `</div>`;

  const footerHtml = `
    <footer class="pdf-footer" style="margin-top: 32px; padding-top: 12px; border-top: 1px solid #DDD5CA; font-size: 11px; color: #7A6F66; font-family: 'DM Sans', sans-serif;">
      © Albor Digital LLC – HomeSystemBuilder.com<br>For personal use only.
    </footer>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styles}</style></head><body>${body}${footerHtml}</body></html>`;
}

function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return text.replace(/[&<>"']/g, (c) => map[c]);
}

/**
 * Generates a PDF from schedule JSON and writes to outputPath.
 * @param {ScheduleData} scheduleData
 * @param {string} [outputPath] - Optional file path. Defaults to public/downloads/schedule-{timestamp}.pdf
 * @returns {Promise<{ path: string; buffer: Buffer }>}
 */
async function generatePdfFromSchedule(scheduleData, outputPath) {
  const html = buildScheduleHtml(scheduleData);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
      printBackground: true,
    });

    const dir = path.join(process.cwd(), "public", "downloads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = outputPath || path.join(dir, `schedule-${Date.now()}.pdf`);
    fs.writeFileSync(filePath, pdfBuffer);

    return { path: filePath, buffer: pdfBuffer };
  } finally {
    await browser.close();
  }
}

// CLI: node lib/pdf-generator.js
if (require.main === module) {
  const sampleData = {
    title: "Your Weekly Cleaning Schedule",
    dailyTasks: ["Make beds", "Wipe counters", "Quick tidy", "Load dishwasher"],
    weeklySchedule: [
      { day: "Monday", tasks: ["Bathrooms", "Vacuum"] },
      { day: "Tuesday", tasks: ["Kitchen", "Laundry"] },
      { day: "Wednesday", tasks: ["Dusting"] },
      { day: "Thursday", tasks: ["Bathrooms", "Vacuum"] },
      { day: "Friday", tasks: ["Kitchen", "Tidy for weekend"] },
    ],
    choreChart: [{ task: "Set table", assignee: "Kids" }, { task: "Take out recycling" }],
    kidsRoutine: [
      { time: "7:00", activity: "Wake up, get dressed" },
      { time: "7:30", activity: "Breakfast" },
    ],
  };

  generatePdfFromSchedule(sampleData)
    .then(({ path: p }) => console.log("PDF written to", p))
    .catch((err) => {
      console.error("PDF generation failed:", err);
      process.exit(1);
    });
}

module.exports = { generatePdfFromSchedule, buildScheduleHtml };

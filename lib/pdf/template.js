/**
 * HTML template for routine PDFs — design tokens as :root (Puppeteer has no app CSS).
 * Uses planner-sheet / planner-time-block / planner-line-dashed naming for parity with UI.
 */

function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return text.replace(/[&<>"']/g, (c) => map[c]);
}

/**
 * @typedef {Object} PdfPlannerPayload
 * @property {string} title
 * @property {{ slotLabel: string, task: string, categoryLabel?: string }[]} dailyRows
 * @property {{ label: string, line: string }[]} weeklyRows
 * @property {{ heading: string, items: string[] }[]} [choreSections]
 * @property {string} [choreChartTitle]
 * @property {{ time: string, activity: string }[]} [kidsRoutine]
 */

/**
 * @param {PdfPlannerPayload} data
 * @returns {string}
 */
function generateHTML(data) {
  const title = escapeHtml(data.title || "Your personalized routine");

  const dailyHtml = (data.dailyRows || [])
    .map(
      (row) => `
    <div class="planner-time-block planner-line-dashed">
      <span class="planner-time-label">${escapeHtml(row.slotLabel)}</span>
      <span class="planner-task-line">
        ${escapeHtml(row.task)}
        ${row.categoryLabel ? `<span class="category-pill">${escapeHtml(row.categoryLabel)}</span>` : ""}
      </span>
    </div>`
    )
    .join("");

  const weeklyHtml = (data.weeklyRows || [])
    .map(
      (row) => `
    <div class="planner-time-block planner-line-dashed">
      <span class="planner-time-label">${escapeHtml(row.label)}</span>
      <span class="planner-task-line">${escapeHtml(row.line)}</span>
    </div>`
    )
    .join("");

  let choresHtml = "";
  if (data.choreSections && data.choreSections.length > 0) {
    choresHtml = data.choreSections
      .map((sec) => {
        const items = (sec.items || [])
          .map(
            (item) => `
      <div class="planner-time-block planner-line-dashed">
        <span class="planner-time-label">•</span>
        <span class="planner-task-line">${escapeHtml(item)}</span>
      </div>`
          )
          .join("");
        const tagClass = data.choreChartTitle ? "section-tag-peach" : "section-tag-sage";
        return `
    <h3 class="section-tag ${tagClass}">${escapeHtml(sec.heading)}</h3>
    ${items}`;
      })
      .join("");
  }

  let kidsHtml = "";
  if (data.kidsRoutine && data.kidsRoutine.length > 0) {
    kidsHtml = data.kidsRoutine
      .map(
        (row) => `
    <div class="planner-time-block planner-line-dashed">
      <span class="planner-time-label">${escapeHtml(row.time)}</span>
      <span class="planner-task-line">${escapeHtml(row.activity)}</span>
    </div>`
      )
      .join("");
    kidsHtml = `
  <div class="section-break"></div>
  <h3 class="section-tag section-tag-peach">Kids routine</h3>
  ${kidsHtml}`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;1,9..40,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --color-primary-dark: #567367;
      --color-primary-light: #bdd5c4;
      --color-accent: #c4814a;
      --color-accent-light: #eac5a0;
      --color-ink: #3b3530;
      --color-ink-muted: #7a6f66;
      --color-border: #ddd5ca;
      --color-bg-surface: #f3ede3;
      --color-white: #ffffff;
      --shadow-card: 0 2px 8px rgba(59, 53, 48, 0.08), 0 6px 20px rgba(59, 53, 48, 0.06);
      --radius-md: 8px;
    }
    * { box-sizing: border-box; }
    body {
      font-family: "DM Sans", "Helvetica Neue", sans-serif;
      color: var(--color-ink);
      background: var(--color-white);
      padding: 36px 40px 48px;
      font-size: 14px;
      line-height: 1.55;
      margin: 0;
    }
    .planner-sheet {
      max-width: 720px;
      margin: 0 auto;
    }
    .planner-sheet-header {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--color-primary-dark);
      border-bottom: 2px solid var(--color-primary-light);
      padding-bottom: 12px;
      margin: 0 0 28px;
    }
    .section-tag {
      display: inline-block;
      font-family: "DM Sans", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 999px;
      margin: 0 0 16px;
    }
    .section-tag-sage {
      background: var(--color-primary-light);
      color: var(--color-primary-dark);
    }
    .section-tag-peach {
      background: var(--color-accent-light);
      color: var(--color-accent);
    }
    .section-tag-sand {
      background: #ede5d8;
      color: var(--color-ink-muted);
    }
    .section-break {
      margin: 28px 0;
      border: none;
      border-top: 1px dashed var(--color-border);
      height: 0;
    }
    .planner-time-block {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 10px 0;
    }
    .planner-line-dashed {
      border-bottom: 1px dashed var(--color-border);
    }
    .planner-time-label {
      font-family: "DM Mono", "Courier New", monospace;
      font-size: 12px;
      font-weight: 500;
      color: var(--color-accent);
      min-width: 5.5rem;
      flex-shrink: 0;
    }
    .planner-task-line {
      flex: 1;
      color: var(--color-ink-muted);
      font-size: 13px;
    }
    .category-pill {
      display: inline-block;
      margin-left: 10px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--color-primary-light);
      color: var(--color-primary-dark);
      vertical-align: middle;
    }
    .pdf-footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
      font-size: 10px;
      line-height: 1.5;
      color: var(--color-ink-muted);
      font-family: "DM Sans", sans-serif;
    }
  </style>
</head>
<body>
  <div class="planner-sheet">
    <h1 class="planner-sheet-header">${title}</h1>

    <h2 class="section-tag section-tag-sage">Daily routine</h2>
    ${dailyHtml || '<p class="planner-task-line">No daily tasks.</p>'}

    <div class="section-break" aria-hidden="true"></div>

    <h2 class="section-tag section-tag-peach">Weekly tasks</h2>
    ${weeklyHtml || '<p class="planner-task-line">No weekly tasks.</p>'}

    ${
      choresHtml
        ? `<div class="section-break" aria-hidden="true"></div>${
            data.choreChartTitle
              ? `<h2 class="section-tag section-tag-sand">${escapeHtml(data.choreChartTitle)}</h2>`
              : ""
          }${choresHtml}`
        : ""
    }
    ${kidsHtml}

    <footer class="pdf-footer">
      © Albor Digital LLC — HomeSystemBuilder.com<br />
      For personal use only. Not for redistribution.
    </footer>
  </div>
</body>
</html>`;
}

module.exports = { generateHTML, escapeHtml };

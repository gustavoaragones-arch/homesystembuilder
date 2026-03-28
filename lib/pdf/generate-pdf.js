/**
 * PDF product engine — Puppeteer + planner HTML template.
 * Node.js only (not Cloudflare Workers). Use a Node-hosted API route or external PDF service on edge.
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { generateHTML } = require("./template.js");
const { printableScheduleToPdfPayload, routineEngineToPdfPayload } = require("./routine-payload.js");

/**
 * @param {import("./template.js").PdfPlannerPayload | object} payload
 * @returns {Promise<Buffer>}
 */
async function generatePDF(payload) {
  const html = generateHTML(payload);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    return await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });
  } finally {
    await browser.close();
  }
}

/**
 * Legacy: PrintableScheduleData → PDF (writes to public/downloads for CLI parity).
 * @param {object} scheduleData
 * @param {string} [outputPath]
 * @returns {Promise<{ path: string, buffer: Buffer }>}
 */
async function generatePdfFromSchedule(scheduleData, outputPath) {
  const payload = printableScheduleToPdfPayload(scheduleData);
  const pdfBuffer = await generatePDF(payload);

  const dir = path.join(process.cwd(), "public", "downloads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = outputPath || path.join(dir, `schedule-${Date.now()}.pdf`);
  fs.writeFileSync(filePath, pdfBuffer);

  return { path: filePath, buffer: pdfBuffer };
}

const { buildScheduleHtml } = require("../pdf-generator.js");

module.exports = {
  generatePDF,
  generatePdfFromSchedule,
  printableScheduleToPdfPayload,
  routineEngineToPdfPayload,
  buildScheduleHtml,
};

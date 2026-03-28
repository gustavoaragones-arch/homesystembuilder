import { NextRequest, NextResponse } from "next/server";
import type { PrintableScheduleData } from "@/data/types";
import { FEATURES } from "@/config/features";

// Server-side PDF generation with Puppeteer is not supported on Edge/Cloudflare Pages.
// This route is prepared for Node.js server (e.g. self-hosted Next or serverless with Node).
// For Cloudflare Pages: use client-side print (window.print) or a separate PDF API service.

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!FEATURES.PDF_DOWNLOAD) {
    return new NextResponse("Not available", { status: 403 });
  }

  try {
    const body = await request.json();
    const data = body as Partial<PrintableScheduleData>;

    const scheduleData: PrintableScheduleData = {
      title: data.title ?? "Your Cleaning Schedule",
      dailyTasks: data.dailyTasks ?? [],
      weeklySchedule: data.weeklySchedule ?? [],
      choreChart: data.choreChart ?? [],
      kidsRoutine: data.kidsRoutine ?? [],
    };

    // Dynamic import so build doesn't fail on Edge (Puppeteer is Node-only)
    const { generatePdfFromSchedule } = await import("@/lib/pdf/generate-pdf.js");
    const result = await generatePdfFromSchedule(scheduleData);

    const buf = result.buffer;
    const pdfBody = Buffer.isBuffer(buf) ? new Uint8Array(buf) : new Uint8Array(buf as ArrayBuffer);
    return new NextResponse(pdfBody, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="schedule-${Date.now()}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF API error:", err);
    return NextResponse.json(
      {
        error: "PDF generation is not available in this environment. Use Print this page for now.",
      },
      { status: 501 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { FEATURES } from "@/config/features";

/**
 * Personalized routine / printable → PDF (Puppeteer).
 * Requires Node.js runtime — not available on Cloudflare Workers / Edge.
 */
export const runtime = "nodejs";

/** Mirrors lib/pdf/template.js PdfPlannerPayload */
interface PdfPlannerPayload {
  title: string;
  dailyRows: { slotLabel: string; task: string; categoryLabel?: string }[];
  weeklyRows: { label: string; line: string }[];
  choreSections?: { heading: string; items: string[] }[];
  choreChartTitle?: string;
  kidsRoutine?: { time: string; activity: string }[];
}

export async function POST(request: NextRequest) {
  if (!FEATURES.PDF_DOWNLOAD) {
    return new NextResponse("Not available", { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      generatePDF,
      routineEngineToPdfPayload,
      printableScheduleToPdfPayload,
    } = await import("@/lib/pdf/generate-pdf.js");

    let payload: PdfPlannerPayload;

    if (
      body?.routine &&
      typeof body.routine === "object" &&
      ("daily_cleaning_tasks" in body.routine || "weekly_schedule" in body.routine)
    ) {
      payload = routineEngineToPdfPayload(body.routine, body.title ?? "Your personalized routine");
    } else if (Array.isArray(body?.dailyTasks)) {
      payload = printableScheduleToPdfPayload(body);
    } else {
      return NextResponse.json(
        { error: "Send { routine, title } from the generator or a full printable schedule (dailyTasks, …)." },
        { status: 400 }
      );
    }

    const buf = await generatePDF(payload);
    const pdfBody = Buffer.isBuffer(buf) ? new Uint8Array(buf) : new Uint8Array(buf as ArrayBuffer);

    return new NextResponse(pdfBody, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="routine-${Date.now()}.pdf"`,
      },
    });
  } catch (err) {
    console.error("generate-pdf route:", err);
    return NextResponse.json(
      {
        error:
          "PDF generation is not available in this environment. Use Print, or host on Node (e.g. Vercel Node, VPS).",
      },
      { status: 501 }
    );
  }
}

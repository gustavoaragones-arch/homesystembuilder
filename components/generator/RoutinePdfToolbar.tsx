"use client";

import { useState } from "react";
import type { RoutineEngineOutput } from "@/lib/generator/routine-engine";
import { FEATURES } from "@/config/features";

const EMAIL_KEY = "hsb_lead_email";

function openEmailGate() {
  document.getElementById("download-routine")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    document.getElementById("hsb-email-gate")?.focus();
  }, 450);
}

interface RoutinePdfToolbarProps {
  routine: RoutineEngineOutput;
}

export function RoutinePdfToolbar({ routine }: RoutinePdfToolbarProps) {
  const [loading, setLoading] = useState(false);

  async function downloadPdf() {
    if (FEATURES.EMAIL_GATE) {
      const userEmail = typeof window !== "undefined" ? localStorage.getItem(EMAIL_KEY)?.trim() : "";
      if (!userEmail) {
        openEmailGate();
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Your personalized routine",
          routine,
        }),
      });
      if (!res.ok) {
        window.print();
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `routine-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.print();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-[var(--space-8)] border-t border-dashed border-border pt-[var(--space-6)]">
      <button type="button" className="btn-primary" disabled={loading} onClick={downloadPdf}>
        {loading ? "Preparing PDF…" : "Preview your personalized routine"}
      </button>
      <p className="mt-[var(--space-3)] font-body text-xs text-ink-muted">
        {FEATURES.EMAIL_GATE
          ? "Use your email below to unlock PDFs. If you haven&apos;t yet, we&apos;ll take you to the unlock form."
          : "Saves a print-ready PDF of this routine."}
      </p>
    </div>
  );
}

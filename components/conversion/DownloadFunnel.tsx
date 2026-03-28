"use client";

import { useState, useCallback } from "react";
import type { PrintableScheduleData } from "@/data/types";
import { FEATURES } from "@/config/features";
import { EmailGate } from "./EmailGate";
import { PlannerEarlyAccess } from "./PlannerEarlyAccess";

interface DownloadFunnelProps {
  scheduleData: PrintableScheduleData | null;
}

export function DownloadFunnel({ scheduleData }: DownloadFunnelProps) {
  const [emailUnlocked, setEmailUnlocked] = useState(false);

  const onUnlocked = useCallback((_email: string) => {
    setEmailUnlocked(true);
  }, []);

  const canDownloadPdf =
    FEATURES.PDF_DOWNLOAD && (!FEATURES.EMAIL_GATE || emailUnlocked);

  const downloadPdf = async () => {
    if (!scheduleData || !FEATURES.PDF_DOWNLOAD) return;
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      });
      if (!res.ok) {
        window.print();
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `routine-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.print();
    }
  };

  return (
    <section
      id="download-routine"
      className="mt-[var(--space-10)] scroll-mt-[var(--space-8)] space-y-[var(--space-6)] border-t border-border pt-[var(--space-10)]"
      aria-label="Preview your personalized routine"
    >
      <h2 className="font-display text-2xl font-bold text-ink">
        Preview your personalized routine
      </h2>
      {!scheduleData && (
        <p className="font-body text-ink-muted">
          Generate your routine above to see your planner preview
          {FEATURES.PDF_DOWNLOAD ? " and export options." : " and join early access for printables."}
        </p>
      )}
      {scheduleData && !FEATURES.PDF_DOWNLOAD && <PlannerEarlyAccess idPrefix="funnel" />}
      {scheduleData && FEATURES.PDF_DOWNLOAD && (
        <>
          {FEATURES.EMAIL_GATE && <EmailGate onUnlocked={onUnlocked} disabled={false} />}
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <button
              type="button"
              className="btn-primary"
              disabled={!canDownloadPdf}
              onClick={downloadPdf}
            >
              Save printable PDF (basic)
            </button>
            {FEATURES.PREMIUM && (
              <a href="#premium-bundle" className="btn-secondary">
                Premium bundle ($7–$15)
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}

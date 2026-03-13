"use client";

import { useRef, useState } from "react";
import type { PrintableScheduleData } from "@/data/types";

interface PrintablePreviewProps {
  scheduleData: PrintableScheduleData;
  /** If provided, called when user clicks "Download free PDF" with current schedule data (e.g. to call /api/pdf). */
  onDownloadPdf?: (data: PrintableScheduleData) => void | Promise<void>;
  showDownloadButton?: boolean;
}

export function PrintablePreview({
  scheduleData,
  onDownloadPdf,
  showDownloadButton = true,
}: PrintablePreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (onDownloadPdf) {
      setIsGenerating(true);
      try {
        await onDownloadPdf(scheduleData);
      } finally {
        setIsGenerating(false);
      }
    } else {
      window.print();
    }
  };

  return (
    <div className="animate-fade-up">
      <div ref={printRef} className="card-planner planner-sheet print:shadow-none">
        <h2 className="planner-sheet-header font-display text-xl font-bold text-primary-dark border-b-2 border-primary-light pb-3 mb-6">
          {scheduleData.title}
        </h2>

        {scheduleData.dailyTasks.length > 0 && (
          <section className="mb-8">
            <h3 className="font-display text-lg font-semibold text-ink mb-3">
              Daily tasks
            </h3>
            <ul className="space-y-2">
              {scheduleData.dailyTasks.map((task) => (
                <li
                  key={task}
                  className="planner-time-block border-b border-dashed border-border"
                >
                  <span className="planner-time-label font-mono text-xs font-medium text-accent min-w-[52px]">
                    •
                  </span>
                  <span className="planner-task-line flex-1 text-sm text-ink-muted">
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {scheduleData.weeklySchedule.length > 0 && (
          <section className="mb-8">
            <h3 className="font-display text-lg font-semibold text-ink mb-3">
              Weekly schedule
            </h3>
            <div className="space-y-2">
              {scheduleData.weeklySchedule.map(({ day, tasks }) => (
                <div
                  key={day}
                  className="planner-time-block border-b border-dashed border-border"
                >
                  <span className="planner-time-label font-mono text-xs font-medium text-accent min-w-[52px]">
                    {day}
                  </span>
                  <span className="planner-task-line flex-1 text-sm text-ink-muted">
                    {tasks.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {scheduleData.choreChart.length > 0 && (
          <section className="mb-8">
            <h3 className="font-display text-lg font-semibold text-ink mb-3">
              Chore chart
            </h3>
            <ul className="space-y-2">
              {scheduleData.choreChart.map(({ task, assignee }, i) => (
                <li
                  key={i}
                  className="planner-time-block border-b border-dashed border-border"
                >
                  <span className="planner-time-label font-mono text-xs min-w-[52px]">
                    —
                  </span>
                  <span className="planner-task-line flex-1 text-sm text-ink-muted">
                    {task}
                    {assignee && (
                      <span className="ml-2 text-accent">({assignee})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {scheduleData.kidsRoutine.length > 0 && (
          <section>
            <h3 className="font-display text-lg font-semibold text-ink mb-3">
              Kids routine
            </h3>
            <div className="space-y-2">
              {scheduleData.kidsRoutine.map(({ time, activity }, i) => (
                <div
                  key={i}
                  className="planner-time-block border-b border-dashed border-border"
                >
                  <span className="planner-time-label font-mono text-xs font-medium text-accent min-w-[52px]">
                    {time}
                  </span>
                  <span className="planner-task-line flex-1 text-sm text-ink-muted">
                    {activity}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {showDownloadButton && (
        <div className="mt-6 flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating}
            className="btn-primary"
          >
            {isGenerating ? "Generating PDF…" : "Download free PDF"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Print this page
          </button>
        </div>
      )}
    </div>
  );
}

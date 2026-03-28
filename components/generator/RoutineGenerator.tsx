"use client";

import { useState, useCallback, useEffect } from "react";
import { generateRoutine } from "@/lib/generator/routine-engine";
import type { RoutineEngineInput, RoutineEngineOutput } from "@/lib/generator/routine-engine";
import { routineOutputToPrintable } from "@/lib/generator/to-printable";
import type { PrintableScheduleData } from "@/data/types";
import { DownloadFunnel } from "@/components/conversion/DownloadFunnel";
import { FEATURES } from "@/config/features";
import Select from "@/components/ui/Select";
import type { SelectOption } from "@/components/ui/Select";
import RoutineOutput from "@/components/generator/RoutineOutput";

interface RoutineGeneratorProps {
  /** When set (e.g. SEO page default printable), funnel can download before user generates. */
  pagePrintable?: PrintableScheduleData | null;
}

const HOUSEHOLD_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const HOUSEHOLD_SIZE_OPTIONS: SelectOption<number>[] = HOUSEHOLD_OPTIONS.map((n) => ({
  value: n,
  label: `${n} ${n === 1 ? "person" : "people"}`,
}));
const HOUSE_SIZES = [
  { value: "small" as const, label: "Small (apartment / condo)" },
  { value: "medium" as const, label: "Medium (house)" },
  { value: "large" as const, label: "Large (multi-story)" },
];
const FREQUENCIES = [
  { value: "light" as const, label: "Light (basics only)" },
  { value: "moderate" as const, label: "Moderate (regular upkeep)" },
  { value: "deep" as const, label: "Deep (thorough weekly)" },
];

export function RoutineGenerator({ pagePrintable = null }: RoutineGeneratorProps) {
  const [input, setInput] = useState<RoutineEngineInput>({
    household_size: 2,
    children_count: 0,
    children_ages: "",
    pets: "no",
    house_size: "medium",
    bathrooms: 1,
    cleaning_frequency: "moderate",
  });
  const [ageFields, setAgeFields] = useState<string[]>([""]);
  const [result, setResult] = useState<RoutineEngineOutput | null>(null);
  const [printable, setPrintable] = useState<PrintableScheduleData | null>(null);

  const update = useCallback(<K extends keyof RoutineEngineInput>(key: K, value: RoutineEngineInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (!result) return;
    const t = window.setTimeout(() => {
      document.getElementById("routine-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [result]);

  const setAgeAt = (i: number, v: string) => {
    setAgeFields((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const addAgeField = () => setAgeFields((prev) => [...prev, ""]);
  const removeAgeField = (i: number) =>
    setAgeFields((prev) => (prev.length > 1 ? prev.filter((_, j) => j !== i) : prev));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const agesStr = ageFields
      .map((a) => a.trim())
      .filter(Boolean)
      .join(", ");
    const data: RoutineEngineInput = { ...input, children_ages: agesStr };
    const routine = generateRoutine(data);
    setResult(routine);
    setPrintable(routineOutputToPrintable(routine, "My personalized household routine"));
  };

  return (
    <div className="space-y-[var(--space-10)]">
      <div className="card animate-fade-up">
        <form onSubmit={submit} className="space-y-[var(--space-6)]">
          <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
            <div>
              <Select
                label="Household size"
                id="gen-household"
                options={HOUSEHOLD_SIZE_OPTIONS}
                value={input.household_size}
                onChange={(v) => update("household_size", typeof v === "number" ? v : Number(v) || 1)}
              />
            </div>
            <div>
              <label className="label" htmlFor="gen-children">
                Children count
              </label>
              <input
                id="gen-children"
                type="number"
                min={0}
                max={10}
                className="input"
                value={input.children_count}
                onChange={(e) => update("children_count", parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>

          <div>
            <span className="label">Children ages (optional)</span>
            <div className="flex flex-col gap-[var(--space-3)]">
              {ageFields.map((age, i) => (
                <div key={i} className="flex flex-wrap items-center gap-[var(--space-2)]">
                  <input
                    type="number"
                    min={1}
                    max={18}
                    className="input max-w-[120px]"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAgeAt(i, e.target.value)}
                  />
                  {ageFields.length > 1 && (
                    <button type="button" className="btn-ghost" onClick={() => removeAgeField(i)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn-secondary w-fit" onClick={addAgeField}>
                Add another age
              </button>
            </div>
          </div>

          <div>
            <span className="label">Pets</span>
            <div className="flex flex-wrap gap-[var(--space-4)]">
              <label className="flex cursor-pointer items-center gap-[var(--space-2)] font-body text-ink-muted">
                <input
                  type="radio"
                  name="pets"
                  checked={input.pets === "yes"}
                  onChange={() => update("pets", "yes")}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Yes
              </label>
              <label className="flex cursor-pointer items-center gap-[var(--space-2)] font-body text-ink-muted">
                <input
                  type="radio"
                  name="pets"
                  checked={input.pets === "no"}
                  onChange={() => update("pets", "no")}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                No
              </label>
            </div>
          </div>

          <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
            <div>
              <Select
                label="House size"
                id="gen-house-size"
                options={HOUSE_SIZES.map((o) => ({ value: o.value, label: o.label }))}
                value={input.house_size}
                onChange={(v) => update("house_size", v as RoutineEngineInput["house_size"])}
              />
            </div>
            <div>
              <label className="label" htmlFor="gen-bathrooms">
                Bathrooms
              </label>
              <input
                id="gen-bathrooms"
                type="number"
                min={1}
                max={6}
                className="input"
                value={input.bathrooms}
                onChange={(e) => update("bathrooms", parseInt(e.target.value, 10) || 1)}
              />
            </div>
          </div>

          <div>
            <Select
              label="Cleaning frequency"
              id="gen-frequency"
              options={FREQUENCIES.map((o) => ({ value: o.value, label: o.label }))}
              value={input.cleaning_frequency}
              onChange={(v) =>
                update("cleaning_frequency", v as RoutineEngineInput["cleaning_frequency"])
              }
            />
          </div>

          <button type="submit" className="btn-primary">
            Generate my routine
          </button>
        </form>

        <div className="legal-note mt-[var(--space-6)] border-t border-border pt-[var(--space-6)]" role="note">
          <p className="legal-note font-body">
            Generated routines are for informational purposes only. Results may vary depending on
            household conditions.
          </p>
        </div>
      </div>

      {result ? (
        <div id="routine-output" className="animate-fade-up space-y-[var(--space-8)] scroll-mt-[var(--space-8)]">
          <RoutineOutput data={result} />

          <div className="card space-y-[var(--space-4)]">
            <h3 className="font-display text-xl font-bold text-ink">What this routine means</h3>
            <p className="font-body text-ink-muted leading-relaxed">
              This routine is designed to maintain a balanced household cleaning flow based on your home
              size, family makeup, and how often you want to clean.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              {FEATURES.PDF_DOWNLOAD
                ? "Older homes or larger families may need extra time blocks — save a printable PDF to adjust times and tasks to match your real life."
                : "Older homes or larger families may need extra time blocks — print this view or join early access below for high-quality printables when they launch."}
            </p>
          </div>

          <div className="card space-y-[var(--space-4)]">
            <h3 className="font-display text-xl font-bold text-ink">Preview your personalized routine</h3>
            <p className="font-body text-sm text-ink-muted">
              {FEATURES.PDF_DOWNLOAD
                ? "Continue below to save a PDF (email may be required) or explore the full home system."
                : "Continue below to join early access for printables — we’ll email you when downloads go live."}
            </p>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              <a href="#download-routine" className="btn-primary inline-flex text-center">
                {FEATURES.PDF_DOWNLOAD ? "Save printable PDF" : "Get early access"}
              </a>
              {FEATURES.PREMIUM ? (
                <a href="#premium-bundle" className="btn-secondary inline-flex text-center">
                  Get full home system
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <DownloadFunnel scheduleData={printable ?? pagePrintable} />
    </div>
  );
}

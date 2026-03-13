"use client";

import { useState, useCallback } from "react";
import type { RoutineGeneratorInputs, RoutineGeneratorOutputs } from "@/data/types";
import { generateRoutineFromInputs } from "@/lib/routine-logic";

const HOUSE_SIZES = [
  { value: "small", label: "Small (apartment / condo)" },
  { value: "medium", label: "Medium (house)" },
  { value: "large", label: "Large (multi-story)" },
] as const;

const FREQUENCIES = [
  { value: "light", label: "Light (basics only)" },
  { value: "moderate", label: "Moderate (regular upkeep)" },
  { value: "deep", label: "Deep (thorough weekly)" },
] as const;

export function RoutineGenerator() {
  const [inputs, setInputs] = useState<RoutineGeneratorInputs>({
    household_size: 2,
    children_count: 0,
    children_ages: "",
    pets: "",
    house_size: "medium",
    bathrooms: 1,
    cleaning_frequency: "moderate",
  });
  const [outputs, setOutputs] = useState<RoutineGeneratorOutputs | null>(null);

  const handleChange = useCallback(
    (field: keyof RoutineGeneratorInputs, value: string | number) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const result = generateRoutineFromInputs(inputs);
      setOutputs(result);
    },
    [inputs]
  );

  return (
    <div className="card animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="household_size">
              Household size
            </label>
            <input
              id="household_size"
              type="number"
              min={1}
              max={12}
              className="input"
              value={inputs.household_size}
              onChange={(e) =>
                handleChange("household_size", parseInt(e.target.value, 10) || 1)
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="children_count">
              Number of children
            </label>
            <input
              id="children_count"
              type="number"
              min={0}
              max={10}
              className="input"
              value={inputs.children_count}
              onChange={(e) =>
                handleChange("children_count", parseInt(e.target.value, 10) || 0)
              }
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="children_ages">
            Children ages (e.g. 3, 7, 12)
          </label>
          <input
            id="children_ages"
            type="text"
            className="input"
            placeholder="Optional"
            value={inputs.children_ages}
            onChange={(e) => handleChange("children_ages", e.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="pets">
            Pets
          </label>
          <input
            id="pets"
            type="text"
            className="input"
            placeholder="e.g. 1 dog, 2 cats"
            value={inputs.pets}
            onChange={(e) => handleChange("pets", e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="label">House size</label>
            <select
              className="input"
              value={inputs.house_size}
              onChange={(e) =>
                handleChange("house_size", e.target.value as RoutineGeneratorInputs["house_size"])
              }
            >
              {HOUSE_SIZES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              min={1}
              max={6}
              className="input"
              value={inputs.bathrooms}
              onChange={(e) =>
                handleChange("bathrooms", parseInt(e.target.value, 10) || 1)
              }
            />
          </div>
        </div>

        <div>
          <label className="label">Cleaning frequency</label>
          <select
            className="input"
            value={inputs.cleaning_frequency}
            onChange={(e) =>
              handleChange(
                "cleaning_frequency",
                e.target.value as RoutineGeneratorInputs["cleaning_frequency"]
              )
            }
          >
            {FREQUENCIES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Generate my routine
        </button>
      </form>

      {outputs && (
        <div className="mt-10 space-y-8 border-t border-border pt-8">
          <div>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              Daily tasks
            </h3>
            <ul className="flex flex-wrap gap-2">
              {outputs.daily_cleaning_tasks.map((task) => (
                <span key={task} className="tag tag-sage">
                  {task}
                </span>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              Weekly schedule
            </h3>
            <ul className="space-y-2 font-mono text-sm text-ink-muted">
              {outputs.weekly_cleaning_schedule.map(({ day, tasks }) => (
                <li key={day}>
                  <span className="font-semibold text-accent">{day}:</span>{" "}
                  {tasks.join(", ")}
                </li>
              ))}
            </ul>
          </div>
          {outputs.chore_chart.length > 0 && (
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold text-ink">
                Chore chart
              </h3>
              <ul className="space-y-1 text-sm text-ink-muted">
                {outputs.chore_chart.map(({ task, assignee }, i) => (
                  <li key={i}>
                    {task}
                    {assignee && (
                      <span className="tag tag-peach ml-2">{assignee}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {outputs.kids_routine.length > 0 && (
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold text-ink">
                Kids routine
              </h3>
              <ul className="space-y-1 font-mono text-sm text-ink-muted">
                {outputs.kids_routine.map(({ time, activity }, i) => (
                  <li key={i}>
                    <span className="text-accent">{time}</span> — {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="legal-note mt-6 pt-6 border-t border-border" role="note">
        <p className="font-body text-xs text-ink-muted" style={{ fontSize: "var(--text-sm)" }}>
          Generated routines are for informational purposes only. Results may vary depending on
          household conditions.
        </p>
      </div>
    </div>
  );
}

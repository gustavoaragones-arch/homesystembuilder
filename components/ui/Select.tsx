"use client";

import { useState, useEffect, useRef, useId } from "react";

export type SelectOption<T extends string | number = string | number> = {
  value: T;
  label: string;
};

export type SelectProps<T extends string | number> = {
  label?: string;
  id?: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function Select<T extends string | number>({
  label,
  id: idProp,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select option",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const id = idProp ?? `select-${reactId.replace(/:/g, "")}`;
  const listId = `${id}-listbox`;

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? placeholder;

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="select-wrap">
      {label ? (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <button
        id={id}
        type="button"
        className="input select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setOpen((o) => !o);
        }}
      >
        <span className="select-trigger-label">{displayLabel}</span>
        <span className="select-trigger-chevron" aria-hidden>
          ▼
        </span>
      </button>
      {open && !disabled ? (
        <ul id={listId} className="select-menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={String(opt.value)} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`select-option${isSelected ? " select-option-selected" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

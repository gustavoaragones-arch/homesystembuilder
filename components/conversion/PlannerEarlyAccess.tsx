"use client";

import { useState } from "react";

const EMAIL_KEY = "hsb_lead_email";

interface PlannerEarlyAccessProps {
  /** Prefix for input id (avoid duplicate ids on one page) */
  idPrefix?: string;
}

/**
 * Soft-launch capture when PDF downloads are off — stores same key as EmailGate for a smooth flip later.
 */
export function PlannerEarlyAccess({ idPrefix = "early-access" }: PlannerEarlyAccessProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(EMAIL_KEY, email.trim());
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="card space-y-[var(--space-3)] p-[var(--space-6)]">
        <p className="font-body text-sm text-primary-dark">
          You&apos;re on the list — we&apos;ll email you when printables go live.
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-[var(--space-4)] p-[var(--space-6)]">
      <h3 className="font-display text-xl font-bold text-ink">Want your printable version?</h3>
      <p className="font-body text-ink-muted leading-relaxed">
        We&apos;re about to launch printable planners. Join early access.
      </p>
      <form onSubmit={submit} className="space-y-[var(--space-3)]">
        <input
          id={`${idPrefix}-email`}
          type="email"
          className="input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className="btn-primary">
          Get early access
        </button>
      </form>
      <p className="font-body text-xs text-ink-muted leading-relaxed">
        Launching soon — early users will get free access. We don&apos;t sell your email.
      </p>
    </div>
  );
}

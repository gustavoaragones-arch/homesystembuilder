"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "hsb_lead_email";

interface EmailGateProps {
  onUnlocked: (email: string) => void;
  disabled?: boolean;
}

export function EmailGate({ onUnlocked, disabled }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      setEmail(stored);
      setUnlocked(true);
      onUnlocked(stored);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only localStorage read; onUnlocked should be stable
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || disabled) return;
    localStorage.setItem(STORAGE_KEY, email.trim());
    setUnlocked(true);
    onUnlocked(email.trim());
  };

  if (unlocked) {
    return (
      <p className="label mb-0 text-primary-dark">
        Download unlocked — thank you. We may send helpful home tips to {email}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-[var(--space-4)] p-[var(--space-6)]">
      <p className="font-body text-sm text-ink-muted">
        Enter your email to unlock your free personalized routine PDF. We do not sell your email.
      </p>
      <div>
        <label className="label" htmlFor="hsb-email-gate">
          Email
        </label>
        <input
          id="hsb-email-gate"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={disabled}
        />
      </div>
      <button type="submit" className="btn-primary" disabled={disabled}>
        Unlock free download
      </button>
    </form>
  );
}

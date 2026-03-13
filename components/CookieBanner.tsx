"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STORAGE_KEY = "homesystembuilder_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const manage = () => {
    window.location.href = "/cookies";
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[200] border-t border-border bg-bg-surface p-4 shadow-raised md:left-4 md:right-4 md:bottom-4 md:max-w-lg md:rounded-lg"
      style={{
        padding: "var(--space-4)",
        boxShadow: "var(--shadow-raised)",
      }}
    >
      <p
        className="mb-4 font-body text-sm text-ink"
        style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-snug)" }}
      >
        We use cookies for essential site function, analytics, and (where applicable)
        advertising. By continuing you agree to our{" "}
        <Link href="/cookies" className="underline text-primary-dark">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="btn-primary"
        >
          Accept Cookies
        </button>
        <button
          type="button"
          onClick={manage}
          className="btn-secondary"
        >
          Manage Settings
        </button>
      </div>
    </div>
  );
}

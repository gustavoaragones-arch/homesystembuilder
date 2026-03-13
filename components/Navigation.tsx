"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/routines", label: "Routines" },
  { href: "/planners", label: "Planners" },
  { href: "/cleaning-schedules/weekly-cleaning-schedule-printable", label: "Cleaning Schedule" },
];

export function Navigation() {
  return (
    <nav
      className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-bg-base/90 px-4 py-4 backdrop-blur-md md:px-8"
      style={{ backgroundColor: "rgba(250, 247, 242, 0.88)" }}
    >
      <Link
        href="/"
        className="font-display text-xl font-bold tracking-tight text-primary-dark"
      >
        HomeSystemBuilder
      </Link>
      <ul className="flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-[var(--radius-sm)] px-3 py-2 font-body text-sm font-medium text-ink-muted transition-colors hover:bg-primary-light hover:text-primary-dark"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

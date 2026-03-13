import Link from "next/link";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-bg-surface px-4 py-12 md:px-8"
      style={{ paddingTop: "var(--space-12)", paddingBottom: "var(--space-12)" }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-6 text-center"
        style={{ maxWidth: "var(--max-width-layout)" }}
      >
        <nav aria-label="Legal and company links">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm font-medium text-ink-muted underline-offset-2 transition-colors hover:text-primary-dark"
                  style={{ textDecoration: "underline" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p
          className="font-body text-sm text-ink-muted"
          style={{ fontSize: "var(--text-sm)" }}
        >
          © 2026 Albor Digital LLC
        </p>
      </div>
    </footer>
  );
}

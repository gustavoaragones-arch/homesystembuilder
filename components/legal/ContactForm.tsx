"use client";

import { useState } from "react";
import { SITE_OWNER } from "@/data/legal/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
    const subject = encodeURIComponent("HomeSystemBuilder contact");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${SITE_OWNER.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="mt-10" style={{ marginTop: "var(--space-10)" }}>
      <h2
        className="mb-4 font-display text-lg font-semibold text-ink"
        style={{ marginBottom: "var(--space-4)" }}
      >
        Send a message (optional)
      </h2>
      {submitted ? (
        <p className="font-body text-ink-muted">
          Your email client should open. If not, email us directly at{" "}
          <a href={`mailto:${SITE_OWNER.email}`} className="text-primary-dark underline">
            {SITE_OWNER.email}
          </a>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="input"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="input"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className="input"
              placeholder="Your question or feedback..."
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Open email to send
          </button>
        </form>
      )}
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { site } from "../lib/site";
import { Check, ChevronDown, PinIcon, SendIcon } from "./Icons";

const buyerTypes = [
  "First-time home buyer",
  "I have land, need a home",
  "I need a home & land",
  "Upgrading my current home",
  "Investor",
];

const budgets = ["Under $60k", "$60k – $100k", "$100k – $150k", "$150k – $200k", "$200k+"];

const field =
  "h-14 w-full rounded-2xl border border-white/35 bg-white/10 px-5 text-[16px] text-white placeholder:text-white/65 outline-none transition-colors focus:border-white/80 focus:bg-white/15";

/** Lead form for the closing section; posts to /api/quote. */
export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center text-white">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay">
          <Check className="h-7 w-7" />
        </span>
        <p className="display mt-6 text-3xl">Thanks, we&rsquo;ll be in touch!</p>
        <p className="mt-3 max-w-xs text-white/75">
          Our team will reach out shortly. Need us sooner? Call{" "}
          <a href={site.phoneHref} className="underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required autoComplete="name" placeholder="Your Name *" aria-label="Your name" className={field} />
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email *"
        aria-label="Email"
        className={field}
      />
      <input
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        placeholder="Phone *"
        aria-label="Phone"
        className={field}
      />
      <div className="relative">
        <select name="buyerType" required defaultValue="" aria-label="What best describes you?" className={`${field} appearance-none pr-12`}>
          <option value="" disabled>
            What best describes you? *
          </option>
          {buyerTypes.map((t) => (
            <option key={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-white/80" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <select name="budget" defaultValue="" aria-label="Budget" className={`${field} appearance-none pr-12`}>
            <option value="">Budget</option>
            {budgets.map((b) => (
              <option key={b} className="text-ink">
                {b}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-white/80" />
        </div>
        <div className="relative">
          <PinIcon className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-white/65" />
          <input name="location" placeholder="Location" aria-label="Location" className={`${field} pl-12`} />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-clay text-[17px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(192,31,38,0.5)] transition-colors hover:bg-clay-dark disabled:opacity-70"
      >
        <SendIcon className="h-5 w-5" />
        {status === "sending" ? "Sending…" : "Get Your Free Quote"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-white/85">
          Something went wrong. Please try again or call us at{" "}
          <a href={site.phoneHref} className="underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}

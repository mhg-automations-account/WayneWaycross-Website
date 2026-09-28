"use client";

import { useEffect, useRef, useState } from "react";
import { monthlyPayment, usd } from "../lib/site";
import Reveal from "./Reveal";
import { ArrowRight, Check, Cross } from "./Icons";

const MIN = 40_000;
const MAX = 250_000;

// Sample assumptions for the estimate
const plans = [
  {
    name: "Home only",
    apr: 9,
    down: 0.1,
    features: [
      { t: "Single, double or triple-wide", ok: true },
      { t: "Live Oak Homes & TownHomes models", ok: true },
      { t: "Delivery & setup", ok: true },
      { t: "Custom options & upgrades", ok: true },
      { t: "Land, clearing & well drilling", ok: false },
    ],
  },
  {
    name: "Land/Home package",
    apr: 7.5,
    down: 0.05,
    featured: true,
    features: [
      { t: "Single, double or triple-wide", ok: true },
      { t: "Live Oak Homes & TownHomes models", ok: true },
      { t: "Delivery & setup", ok: true },
      { t: "Custom options & upgrades", ok: true },
      { t: "Land, clearing & well drilling", ok: true },
    ],
  },
];

/** Tweens a number toward its target, like the price change in the reference. */
function useTween(target: number, ms = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = a + (target - a) * eased;
      from.current = v;
      setValue(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);
  return value;
}

function Price({ value }: { value: number }) {
  const v = useTween(value);
  return <>{usd(v)}</>;
}

export default function Financing() {
  const [price, setPrice] = useState(120_000);
  const [years, setYears] = useState<20 | 30>(20);
  const pct = ((price - MIN) / (MAX - MIN)) * 100;

  return (
    <section id="financing" className="scroll-mt-24 bg-band px-4 pt-28 pb-32">
      <div className="text-center">
        <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
          Simple, honest financing
        </Reveal>
        <Reveal as="p" delay={120} className="mt-4 text-lg text-muted">
          Find a payment that fits your family.
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-[880px]">
        <Reveal delay={200} className="flex justify-center">
          <span className="rounded-full border border-line bg-cream px-4 py-2 text-[15px] font-medium">
            Home price around <span className="text-clay">{usd(price).replace(",000", "k")}</span>
          </span>
        </Reveal>

        <Reveal delay={300} className="mt-8 flex flex-col items-stretch gap-6 sm:flex-row sm:items-end">
          <div className="flex-1">
            <div className="mb-2 flex justify-between text-xs text-muted">
              <span>$40k</span>
              <span>$250k+</span>
            </div>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={5_000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              aria-label="Home price"
              className="range w-full"
              style={{ background: `linear-gradient(to right, var(--color-clay) ${pct}%, #e6ddd5 ${pct}%)` }}
            />
          </div>
          <div className="relative self-center sm:self-auto">
            <span className="absolute -top-6 right-0 rotate-[-6deg] font-serif text-sm text-clay italic">
              lowest payment
            </span>
            <div className="flex rounded-xl border border-line bg-[#ece6e0] p-1 text-sm">
              {([20, 30] as const).map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`rounded-lg px-4 py-1.5 font-medium transition-all duration-300 ${
                    years === y ? "bg-cream text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {y} years
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((p, i) => {
            const payment = monthlyPayment(price * (1 - p.down), p.apr, years);
            return (
              <Reveal key={p.name} delay={400 + i * 150}>
                <article
                  className={`h-full rounded-[28px] border border-line p-8 transition-all duration-500 ${
                    p.featured
                      ? "bg-[#f7f3ef] shadow-[0_30px_60px_-30px_rgba(90,50,30,0.35)] md:-translate-y-1"
                      : "bg-card hover:shadow-[0_24px_50px_-28px_rgba(90,50,30,0.3)]"
                  }`}
                >
                  <p className="font-serif text-sm tracking-wide text-muted uppercase">{p.name}</p>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="display text-5xl tabular-nums">
                      <Price value={payment} />
                    </span>
                    <span className="text-muted">/month est.</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f.t} className="flex items-center gap-3 text-[15px] text-ink/85">
                        {f.ok ? (
                          <Check className="h-4 w-4 shrink-0 text-sage" />
                        ) : (
                          <Cross className="h-4 w-4 shrink-0 text-muted" />
                        )}
                        {f.t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="group mt-8 flex items-center justify-center gap-2 rounded-full bg-clay py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-dark"
                  >
                    Get pre-qualified
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <p className="mt-3 text-center text-sm text-muted">
                    Sample {p.apr}% APR, {p.down * 100}% down.
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" delay={200} className="mt-8 text-center text-xs text-muted/80">
          Estimates use sample rates for illustration and are not a loan offer. Actual terms depend on credit, lender and
          home.
        </Reveal>
      </div>
    </section>
  );
}

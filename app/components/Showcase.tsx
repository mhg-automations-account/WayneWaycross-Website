"use client";

import { useState } from "react";
import { monthlyPayment, usd } from "../lib/site";
import Reveal, { useInView } from "./Reveal";
import Scene from "./Scene";

// Example loan used to illustrate the charts
const PRICE = 120_000;
const APR = 8;
const YEARS = 25;

const tiles = [
  { label: "Home styles", value: "3", note: "Single · Double · Triple" },
  { label: "Top brands", value: "2", note: "Live Oak · TownHomes" },
  { label: "Example payment", value: `${usd(monthlyPayment(PRICE, APR, YEARS))}`, note: "per month, $120k · 25 yrs" },
  { label: "Wall framing", value: "2×6", note: "available on select models" },
];

const sizes = [
  { label: "Singlewide 14′", v: 900 },
  { label: "Singlewide 16′", v: 1200 },
  { label: "Doublewide 24′", v: 1500 },
  { label: "Doublewide 32′", v: 2000 },
  { label: "Triplewide", v: 2600 },
];

const payments = [60_000, 90_000, 120_000, 160_000, 200_000].map((p) => ({
  label: usd(p).replace(",000", "k"),
  v: Math.round(monthlyPayment(p, APR, YEARS)),
}));

/** Balance, equity and interest paid for each year of the example loan. */
function amortization() {
  const r = APR / 100 / 12;
  const pmt = monthlyPayment(PRICE, APR, YEARS);
  let bal = PRICE;
  let interest = 0;
  const rows = [{ year: 0, balance: bal, equity: 0, interest: 0 }];
  for (let m = 1; m <= YEARS * 12; m++) {
    const i = bal * r;
    interest += i;
    bal -= pmt - i;
    if (m % 12 === 0) rows.push({ year: m / 12, balance: Math.max(bal, 0), equity: PRICE - Math.max(bal, 0), interest });
  }
  return rows;
}

const ROWS = amortization();

const W = 900;
const H = 220;
const PAD = { l: 52, r: 16, t: 12, b: 28 };

function LineChart({ visible }: { visible: boolean }) {
  const rows = ROWS;
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...rows.map((r) => Math.max(r.balance, r.interest)));
  const x = (i: number) => PAD.l + (i / (rows.length - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - v / max) * (H - PAD.t - PAD.b);
  const path = (k: "balance" | "equity" | "interest") =>
    rows.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(r[k]).toFixed(1)}`).join(" ");
  const series = [
    { k: "balance" as const, c: "#3d7322", name: "Loan balance" },
    { k: "equity" as const, c: "#8cc152", name: "Equity" },
    { k: "interest" as const, c: "#d4a94a", name: "Interest paid" },
  ];

  return (
    <div className="rounded-2xl border border-line bg-[#f5f9ef] p-4">
      <p className="text-sm font-medium text-ink">Your loan over time · {usd(PRICE)} home</p>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-2 w-full"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (rows.length - 1));
            setHover(Math.min(rows.length - 1, Math.max(0, i)));
          }}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t} className="chart-fade">
              <line x1={PAD.l} x2={W - PAD.r} y1={y(max * t)} y2={y(max * t)} stroke="#dbe5d0" strokeDasharray="3 4" />
              <text x={PAD.l - 8} y={y(max * t) + 4} textAnchor="end" fontSize="11" fill="#7d8a74">
                ${Math.round((max * t) / 1000)}k
              </text>
            </g>
          ))}
          {rows.map((r, i) =>
            i % 5 === 0 ? (
              <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#7d8a74" className="chart-fade">
                Yr {r.year}
              </text>
            ) : null,
          )}
          {series.map((s, i) => (
            <path
              key={s.k}
              d={path(s.k)}
              pathLength={1}
              fill="none"
              stroke={s.c}
              strokeWidth="2.4"
              strokeLinejoin="round"
              className="chart-line"
              style={{ animationDelay: `${500 + i * 200}ms` }}
            />
          ))}
          {hover !== null && visible && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b} stroke="#bccbb0" />
              {series.map((s) => (
                <circle key={s.k} cx={x(hover)} cy={y(rows[hover][s.k])} r="4" fill="#fff" stroke={s.c} strokeWidth="2" />
              ))}
            </g>
          )}
        </svg>
        {hover !== null && visible && (
          <div
            className="pointer-events-none absolute top-2 rounded-xl border border-line bg-white/90 px-3 py-2 text-xs shadow-sm backdrop-blur"
            style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > rows.length / 2 ? "-110%" : "10%"})` }}
          >
            <p className="font-medium text-ink">Year {rows[hover].year}</p>
            {series.map((s) => (
              <p key={s.k} style={{ color: s.c }}>
                {s.name}: {usd(rows[hover][s.k])}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="chart-fade mt-1 flex justify-center gap-5 text-xs text-muted" style={{ transitionDelay: "900ms" }}>
        {series.map((s) => (
          <span key={s.k} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: s.c }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function BarChart({
  title,
  data,
  color,
  format,
  delay,
}: {
  title: string;
  data: { label: string; v: number }[];
  color: string;
  format: (n: number) => string;
  delay: number;
}) {
  const max = Math.max(...data.map((d) => d.v)) * 1.1;
  return (
    <div className="rounded-2xl border border-line bg-[#f5f9ef] p-4">
      <p className="text-sm font-medium text-ink">{title}</p>
      <div className="mt-4 space-y-2.5">
        {data.map((d, i) => (
          <div key={d.label} className="group flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-[11px] leading-tight text-muted">{d.label}</span>
            <div className="relative h-6 flex-1">
              <div
                className="chart-bar h-full rounded-[4px] transition-opacity group-hover:opacity-80"
                style={{ width: `${(d.v / max) * 100}%`, background: color, transitionDelay: `${delay + i * 90}ms` }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 pl-2 text-[11px] text-muted opacity-0 transition-opacity group-hover:opacity-100"
                style={{ left: `${(d.v / max) * 100}%` }}
              >
                {format(d.v)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  const [ref, visible] = useInView<HTMLDivElement>(0.12);

  return (
    <section id="showcase" className="relative scroll-mt-24 overflow-hidden pt-28 pb-32">
      {/* Soft landscape behind the window, fading up from the page */}
      <div className="pointer-events-none absolute inset-0">
        <Scene className="h-full w-full scale-110 opacity-60 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/40 to-cream" />
      </div>

      <div className="relative px-4 text-center">
        <Reveal as="h2" className="display text-[clamp(2.6rem,5.5vw,4rem)]">
          Clear numbers, no surprises
        </Reveal>
        <Reveal as="p" delay={120} className="mt-4 text-lg text-muted">
          See exactly what you&rsquo;re getting, from floor plans to payments.
        </Reveal>
      </div>

      <div ref={ref} className={`reveal-window ${visible ? "is-visible" : ""} relative mx-auto mt-16 max-w-[1000px] px-4`}>
        <div className="rounded-[28px] border border-white/70 bg-[#e9f0e0]/90 p-3 shadow-[0_40px_80px_-30px_rgba(40,70,30,0.35)] backdrop-blur-md">
          <div className="flex gap-1.5 px-2 pt-1 pb-3">
            <span className="h-3 w-3 rounded-full bg-[#e0907c]" />
            <span className="h-3 w-3 rounded-full bg-[#e3be73]" />
            <span className="h-3 w-3 rounded-full bg-[#9dbb8f]" />
          </div>
          <div className="space-y-3 rounded-[20px] bg-[#e3ebd9] p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {tiles.map((t, i) => (
                <div
                  key={t.label}
                  className="chart-fade rounded-2xl border border-line bg-[#f5f9ef] p-4 text-left"
                  style={{ transitionDelay: `${250 + i * 90}ms` }}
                >
                  <p className="text-xs text-muted">{t.label}</p>
                  <p className="display mt-1 text-3xl">{t.value}</p>
                  <p className="mt-1 text-xs text-sage">{t.note}</p>
                </div>
              ))}
            </div>
            <div className="chart-fade" style={{ transitionDelay: "450ms" }}>
              <LineChart visible={visible} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="chart-fade" style={{ transitionDelay: "700ms" }}>
                <BarChart
                  title="Typical floor plans (sq ft)"
                  data={sizes}
                  color="#7cb342"
                  format={(n) => `${n.toLocaleString()} sq ft`}
                  delay={900}
                />
              </div>
              <div className="chart-fade" style={{ transitionDelay: "850ms" }}>
                <BarChart
                  title="Estimated monthly payment by price"
                  data={payments}
                  color="#d4a94a"
                  format={(n) => `${usd(n)}/mo`}
                  delay={1050}
                />
              </div>
            </div>
            <p className="px-1 text-[11px] text-muted/80">
              Illustrative only: sizes are typical ranges; payments assume {APR}% APR over {YEARS} years with no down
              payment. Your actual numbers depend on the home, lender and credit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { homes, type Home } from "../lib/homes";
import HomeCard from "./HomeCard";

const bedFilters = [
  { label: "All", test: () => true },
  { label: "1–2 beds", test: (b: number) => b <= 2 },
  { label: "3 beds", test: (b: number) => b === 3 },
  { label: "4 beds", test: (b: number) => b === 4 },
  { label: "5 beds", test: (b: number) => b >= 5 },
];

const sorts: Record<string, { label: string; fn: (a: Home, b: Home) => number }> = {
  name: { label: "Name", fn: (a, b) => a.name.localeCompare(b.name) },
  small: { label: "Smallest first", fn: (a, b) => a.sqft - b.sqft },
  large: { label: "Largest first", fn: (a, b) => b.sqft - a.sqft },
};

/** Filterable grid of every home model on the lot. */
export default function HomesBrowser() {
  const [beds, setBeds] = useState(0);
  const [sort, setSort] = useState("name");

  const list = useMemo(
    () => homes.filter((h) => bedFilters[beds].test(h.beds)).sort(sorts[sort].fn),
    [beds, sort],
  );

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 border-b border-line pb-6 md:flex-row">
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by bedrooms">
          {bedFilters.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setBeds(i)}
              aria-pressed={beds === i}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                beds === i ? "bg-clay text-white" : "border border-line bg-card text-ink/80 hover:border-clay/40 hover:text-clay"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>
            {list.length} {list.length === 1 ? "home" : "homes"}
          </span>
          <label className="sr-only" htmlFor="sort">
            Sort homes
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-line bg-card px-4 py-2 font-medium text-ink outline-none focus:border-clay"
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((h) => (
          <HomeCard key={h.slug} home={h} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
        ))}
      </div>
    </>
  );
}

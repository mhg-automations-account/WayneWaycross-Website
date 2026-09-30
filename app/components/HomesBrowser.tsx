"use client";

import { useMemo, useState } from "react";
import { homes, type Home, type Section } from "../lib/homes";
import HomeCard from "./HomeCard";
import { SearchIcon } from "./Icons";

const bedFilters = [
  { label: "All", test: () => true },
  { label: "1–2 beds", test: (b: number) => b <= 2 },
  { label: "3 beds", test: (b: number) => b === 3 },
  { label: "4 beds", test: (b: number) => b === 4 },
  { label: "5 beds", test: (b: number) => b >= 5 },
];

type Option<T> = { label: string; test: (v: T) => boolean };

const sectionFilters: Option<Section>[] = [
  { label: "Any type", test: () => true },
  { label: "Single wide", test: (s) => s === "Single wide" },
  { label: "Double wide", test: (s) => s === "Double wide" },
  { label: "Triple wide", test: (s) => s === "Triple wide" },
];

const bathFilters: Option<number>[] = [
  { label: "Any baths", test: () => true },
  { label: "1 bath", test: (b) => b < 2 },
  { label: "2–2.5 baths", test: (b) => b >= 2 && b < 3 },
  { label: "3+ baths", test: (b) => b >= 3 },
];

const sqftFilters: Option<number>[] = [
  { label: "Any size", test: () => true },
  { label: "Under 1,000 sq ft", test: (s) => s < 1000 },
  { label: "1,000–1,499 sq ft", test: (s) => s >= 1000 && s < 1500 },
  { label: "1,500–1,999 sq ft", test: (s) => s >= 1500 && s < 2000 },
  { label: "2,000+ sq ft", test: (s) => s >= 2000 },
];

const selectClass =
  "rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink outline-none focus:border-clay";

/** Pill-shaped dropdown for one filter; index 0 is always "any". */
function FilterSelect<T>({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: Option<T>[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${selectClass} ${value ? "border-clay text-clay" : ""}`}
      >
        {options.map((o, i) => (
          <option key={o.label} value={i}>
            {o.label}
          </option>
        ))}
      </select>
    </>
  );
}

/** Lowercase letters and digits only, so "jlow" finds "J-Low". */
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const sorts: Record<string, { label: string; fn: (a: Home, b: Home) => number }> = {
  name: { label: "Name", fn: (a, b) => a.name.localeCompare(b.name) },
  small: { label: "Smallest first", fn: (a, b) => a.sqft - b.sqft },
  large: { label: "Largest first", fn: (a, b) => b.sqft - a.sqft },
};

/** Filterable grid of every home model on the lot. */
export default function HomesBrowser() {
  const [query, setQuery] = useState("");
  const [beds, setBeds] = useState(0);
  const [section, setSection] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [sort, setSort] = useState("name");

  const list = useMemo(() => {
    const q = normalize(query);
    return homes
      .filter(
        (h) =>
          normalize(h.name).includes(q) &&
          bedFilters[beds].test(h.beds) &&
          sectionFilters[section].test(h.section) &&
          bathFilters[baths].test(h.baths) &&
          sqftFilters[sqft].test(h.sqft),
      )
      .sort(sorts[sort].fn);
  }, [query, beds, section, baths, sqft, sort]);

  const filtered = query || beds || section || baths || sqft;
  const clear = () => {
    setQuery("");
    setBeds(0);
    setSection(0);
    setBaths(0);
    setSqft(0);
  };

  return (
    <>
      <div className="mx-auto mb-6 max-w-xl">
        <label className="sr-only" htmlFor="search">
          Search homes by name
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by home name"
            autoComplete="off"
            className="w-full rounded-full border border-line bg-card py-3 pr-4 pl-11 text-ink outline-none placeholder:text-muted focus:border-clay"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-b border-line pb-6 lg:flex-row">
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
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="More filters">
          <FilterSelect id="section" label="Filter by home type" options={sectionFilters} value={section} onChange={setSection} />
          <FilterSelect id="baths" label="Filter by bathrooms" options={bathFilters} value={baths} onChange={setBaths} />
          <FilterSelect id="sqft" label="Filter by square feet" options={sqftFilters} value={sqft} onChange={setSqft} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 text-sm text-muted">
        <div className="flex items-center gap-3">
          <span aria-live="polite">
            {list.length} {list.length === 1 ? "home" : "homes"}
          </span>
          {filtered ? (
            <button onClick={clear} className="font-medium text-clay underline-offset-4 hover:underline">
              Clear filters
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="sort">
            Sort homes
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={selectClass}
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {list.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => (
            <HomeCard key={h.slug} home={h} heading="h2" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">
          No homes match those filters.{" "}
          <button onClick={clear} className="font-medium text-clay underline-offset-4 hover:underline">
            Clear filters
          </button>
        </p>
      )}
    </>
  );
}

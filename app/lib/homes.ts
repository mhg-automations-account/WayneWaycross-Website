/**
 * Home models on the lot, scraped from waynefrierwaycross.com (size and series pages).
 * Photos are self-hosted under /public/homes/<slug>/. `section` is only set for homes the
 * dealership lists on its Singlewides, Doublewides or Triplewides pages.
 */
import raw from "./homes.json";
import { lotSlugs } from "./lot";

export type Section = "Single wide" | "Double wide" | "Triple wide";

export const SERIES = [
  "Plantation Series",
  "XT Series",
  "Extreme Series",
  "Signature Oak Series",
  "Classic Oaks",
  "Suwannee Valley",
  "Runner SS",
  "Runner Series",
] as const;

export type Series = (typeof SERIES)[number];

export type Home = {
  slug: string;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  section: Section | null;
  series: Series[];
  /** Listing photos; the first is the cover. */
  images: string[];
  /** Matterport 3D tour id, when the dealership has one for this model. */
  tour: string | null;
  /** Clearance markdown in dollars, from the dealership's Specials page. */
  markdown?: number;
  /** True when this model is on the lot to tour right now (see lot.ts). */
  onLot: boolean;
};

const MARKDOWNS: Record<string, number> = { tundra: 8000, horizon: 6500 };

export const homes: Home[] = (raw as Omit<Home, "markdown" | "onLot">[]).map((h) => ({
  ...h,
  markdown: MARKDOWNS[h.slug],
  onLot: lotSlugs.has(h.slug),
}));

/** Homes marked down on the Specials page. */
export const clearance = homes.filter((h) => h.markdown);

export const getHome = (slug: string) => homes.find((h) => h.slug === slug);

export const cover = (h: Home) => h.images[0];

export const specs = (h: Home) => `${h.beds} bed · ${h.baths} bath · ${h.sqft.toLocaleString("en-US")} sq ft`;

/** Descriptive alt text for a home's listing photo. */
export const homeAlt = (h: Home) =>
  `The ${h.name}, a ${h.beds}-bedroom, ${h.baths}-bath, ${h.sqft.toLocaleString("en-US")} sq ft manufactured home`;

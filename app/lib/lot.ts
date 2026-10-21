/**
 * Homes on the Waycross lot that can be toured today, from the dealership's lot map dated October 13, 2026.
 * This is only part of the inventory. `slug` links to the matching model in homes.json; it is null for
 * models we don't have a listing page for yet. Bed/bath counts and sizes come from the lot map.
 */
import type { Section } from "./homes";

export type LotHome = {
  name: string;
  slug: string | null;
  beds: number;
  baths: number;
  /** Width x length in feet, as printed on the lot map. */
  size: string;
  section: Section;
};

export const LOT_UPDATED = "October 13, 2026";

const sectionOf = (size: string): Section => {
  const width = Number(size.split("x")[0]);
  return width >= 40 ? "Triple wide" : width >= 24 ? "Double wide" : "Single wide";
};

const rows: [name: string, slug: string | null, beds: number, baths: number, size: string][] = [
  ["Ace", "ace", 3, 2, "16x80"],
  ["Big Tex", null, 5, 3, "32x84"],
  ["Buck Creek", "buck-creek", 3, 2, "16x80"],
  ["Cobblestone", "cobblestone", 4, 3, "48x68"],
  ["Daytona", null, 4, 2, "32x56"],
  ["Dash2", null, 2, 2, "16x70"],
  ["Defender", "defender", 3, 2, "28x54"],
  ["Dogwood", "dogwood", 4, 2, "32x76"],
  ["Dolly", null, 3, 2, "32x64"],
  ["Earnhart", "earnhardt", 4, 2, "28x64"],
  ["Flex", null, 4, 2, "16x80"],
  ["Gametime", "gametime", 4, 3, "32x80"],
  ["GA Giant", "georgia-giant", 5, 3, "32x84"],
  ["Hamilton", "hamilton", 3, 2, "28x48"],
  ["Heritage", "heritage", 3, 2, "32x70"],
  ["High Country", "high-country", 4, 3, "32x80"],
  ["Highlander", null, 4, 3, "32x80"],
  ["Horizon", "horizon", 3, 2, "32x60"],
  ["Laramie", "laramie", 3, 2, "32x64"],
  ["Maverick", "maverick", 3, 2, "28x48"],
  ["Quail Ridge", "quail-ridge", 4, 3, "32x80"],
  ["Raven", "raven", 3, 2, "28x52"],
  ["Riverbend", null, 3, 2, "28x60"],
  ["Silverado", "silverado", 3, 2, "28x56"],
  ["Slugger", "slugger", 3, 2, "16x80"],
  ["Sterling", null, 2, 2, "16x70"],
  ["Titan", null, 2, 2, "16x64"],
  ["Tremor", "tremor", 4, 3, "28x80"],
  ["Vin Diesel", "vin-diesel", 3, 2, "16x80"],
  ["5K", "5k", 5, 3, "32x76"],
];

export const lot: LotHome[] = rows.map(([name, slug, beds, baths, size]) => ({
  name,
  slug,
  beds,
  baths,
  size,
  section: sectionOf(size),
}));

/** Slugs of catalog models that are on the lot right now. */
export const lotSlugs = new Set(lot.flatMap((h) => (h.slug ? [h.slug] : [])));

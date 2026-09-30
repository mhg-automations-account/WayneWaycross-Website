/**
 * Home models on the lot, sourced from familyhomecentercrestview.com/our-homes/.
 * `photo` is the path under the source site's /wp-content/uploads/.
 */
export type Section = "Single wide" | "Double wide" | "Triple wide";

export type Home = {
  slug: string;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  section: Section;
  photo: string;
  source: string;
};

const UPLOADS = "https://familyhomecentercrestview.com/wp-content/uploads/";
const PROJECT = "https://familyhomecentercrestview.com/project/";

// [name, beds, baths, sqft, photo, source slug]
const raw: [string, number, number, number, string, string][] = [
  ["5K", 5, 3, 2136, "2020/06/JWL_0759.jpg", "5k"],
  ["Ace", 3, 2, 1130, "2020/06/JWL_9230.jpg", "ace"],
  ["Apache", 2, 2, 1130, "2020/06/JWL_0287-1.jpg", "apache"],
  ["Arlington", 4, 3, 2692, "2025/03/JWL_0659.jpg", "arlington"],
  ["Big Horn", 4, 2, 2017, "2022/08/JWLeePhoto-7848.jpg", "big-horn"],
  ["Big Kahuna", 4, 2, 2254, "2020/06/JWL_1227.jpg", "big-kahuna"],
  ["Biltmore", 3, 2, 2340, "2020/06/JWLeePhoto-7717.jpg", "biltmore"],
  ["Blakely", 4, 2, 2273, "2022/09/Z72_5403.jpg", "blakely"],
  ["Blitz", 4, 3, 1976, "2025/04/JWLeeMedia-8267-Edit.jpg", "blitz"],
  ["Blue Ridge", 3, 2, 1720, "2020/12/JWLeeMedia2501167181-Edit.jpg", "blue-ridge"],
  ["Boulder", 3, 2, 1720, "2025/04/JWLeeMedia-2.jpg", "boulder"],
  ["Brunswick", 2, 2, 890, "2020/06/JWL_9286.jpg", "brunswick"],
  ["Buckhead", 3, 2, 1720, "2020/06/JWLeePhoto-8052.jpg", "buckhead"],
  ["Canyon", 3, 2.5, 1560, "2025/04/JWLeeMedia2501167090-Edit.jpg", "canyon-3-bed-2-5-bath-1560-sq-ft"],
  ["Cardinal", 3, 2, 1248, "2025/04/JWLeeMedia-189.jpg", "cardinal"],
  ["Cedar River", 1, 1, 520, "2022/08/WK1_4117.jpg", "cedar-river"],
  ["Charger", 3, 2, 1958, "2020/06/JWLeeMedia-139.jpg", "charger"],
  ["Colorado", 3, 2, 1127, "2020/12/JWL_0575.jpg", "colorado"],
  ["Costner", 4, 2, 1768, "2025/04/JWLeeMedia-61.jpg", "costner-4-bed-2-bath-1768-sq-ft"],
  ["Curry", 3, 2, 1352, "2025/04/JWLeeMedia-27.jpg", "curry"],
  ["Denali", 3, 2, 1456, "2025/04/JWLeeMedia-121.jpg", "denali"],
  ["Dogwood", 4, 2, 2136, "2025/04/untitled-2-556-Edit.jpg", "dogwood"],
  ["Double Pantry", 3, 2, 1456, "2020/06/JWL_8110.jpg", "double-pantry"],
  ["Earnhardt", 4, 2, 1560, "2025/04/JWLeeMedia-52.jpg", "earnhardt"],
  ["Elevation", 3, 2, 1560, "2025/04/JWLeeMedia-8195-Edit.jpg", "elevation"],
  ["Escalade", 3, 2, 1130, "2025/03/JWLeeMedia-77-1.jpg", "escalade"],
  ["Fancy", 4, 3, 2254, "2025/04/JWL_8350.jpg", "fancy"],
  ["Gametime", 4, 3, 2254, "2025/04/JWL_8828.jpg", "gametime"],
  ["Georgia Giant", 5, 3, 2373, "2025/04/Georgia-Giant-6.jpg", "georgia-giant"],
  ["Gladiator", 4, 2, 2254, "2022/09/JWL_8899.jpg", "gladiator"],
  ["Guardian", 4, 2, 1768, "2025/04/untitled-2-166-Edit.jpg", "guardian"],
  ["Hamilton", 3, 2, 1144, "2020/06/JWL_9079.jpg", "hamilton"],
  ["Heritage", 3, 2, 1888, "2022/09/JWL_8413.jpg", "heritage"],
  ["Highlander", 4, 3, 2254, "2020/12/JWL_8296.jpg", "highlander"],
  ["Hilton", 3, 2, 1795, "2022/09/JWLeePhoto-9660-1.jpg", "hilton"],
  ["Horizon", 3, 2, 1661, "2025/04/The-Horizon-7.jpg", "horizon"],
  ["J-Low", 1, 1, 520, "2025/03/IMG_8069.jpg", "jlow"],
  ["Lakeview", 3, 2, 1792, "2025/04/JWLeeMedia-178.jpg", "lakeview"],
  ["Lexi", 2, 2, 1130, "2025/03/untitled-2-449-Edit.jpg", "lexi"],
  ["Lone Star", 4, 3, 2491, "2025/03/JWLeeMedia-13.jpg", "lone-star"],
  ["Madison", 3, 2.5, 1664, "2025/04/JWLeeMedia-150.jpg", "madison"],
  ["Mahomes", 2, 2, 979, "2025/03/JWLeeMedia-45.jpg", "mahomes"],
  ["Messi", 5, 3, 1898, "2025/04/WK1_7827.jpg", "messi"],
  ["Miguel", 2, 2, 1092, "2025/04/WK2_3013.jpg", "miguel"],
  ["Mill Creek", 3, 2, 1040, "2025/04/JWLeeMedia-130.jpg", "mill-creek"],
  ["MJ", 4, 3, 1976, "2025/04/JWLeePhoto-4178.jpg", "mj"],
  ["Monster Mansion", 5, 3, 2136, "2020/06/JWL_9746.jpg", "monster-mansion-2"],
  ["Naples", 3, 2, 1127, "2020/06/JWL_9275.jpg", "naples"],
  ["Nitro", 3, 2, 1560, "2025/04/untitled-2-230-Edit.jpg", "nitro"],
  ["Oxford", 3, 2, 1795, "2020/12/Z72_5361.jpg", "oxford"],
  ["Patriot", 4, 2, 2254, "2020/06/JWL_9613.jpg", "patriot"],
  ["Pistol", 3, 2, 1144, "2025/04/JWL_8071.jpg", "pistol"],
  ["Ponderosa", 3, 2, 2013, "2022/09/Z72_0349-1.jpg", "ponderosa"],
  ["Predator", 4, 2, 1820, "2025/04/JWLeeMedia-102.jpg", "predator"],
  ["Quail Ridge", 4, 3.5, 2254, "2025/04/JWLeeMedia2501167044-Edit.jpg", "quail-ridge"],
  ["Raptor", 4, 2, 1542, "2020/06/The-Raptor-4.jpg", "raptor"],
  ["Raven", 3, 2, 1260, "2025/04/JWLeeMedia2501167156-Edit.jpg", "raven"],
  ["Rock", 5, 3, 2136, "2025/04/JWLeeMedia-92.jpg", "rock"],
  ["Rockport", 4, 2, 2273, "2022/09/Z72_0104_1-1.jpg", "rockport"],
  ["Rocky Mountain", 5, 3, 2076, "2020/12/JWL_8638.jpg", "rocky-mountain"],
  ["Savannah", 4, 2, 2034, "2020/06/JWL_8605.jpg", "savannah"],
  ["Shelby", 3, 2, 1760, "2025/04/JWL_9320.jpg", "shelby"],
  ["Silverado", 3, 2, 1352, "2020/06/JWLeeMedia2501167130-Edit.jpg", "silverado"],
  ["Sling Shot", 2, 2, 830, "2022/08/JWL_5765_34.jpg", "sling-shot"],
  ["Slugger", 3, 2, 1130, "2025/03/untitled-2-116-Edit.jpg", "slugger-3-bed-2-bath-1130-sq-ft"],
  ["Southern Charm", 3, 2, 1040, "2022/08/JWL_7198.jpg", "southern-charm"],
  ["Telford", 4, 2, 1525, "2020/06/JWL_9362.jpg", "telford"],
  ["Tremor", 4, 3, 1976, "2025/04/JWLeeMedia2501167207-Edit.jpg", "tremor"],
  ["Trenton", 3, 2, 1352, "2020/12/JWL_9040.jpg", "trenton"],
  ["Troy", 3, 2, 1127, "2020/12/JWL_9407-1.jpg", "troy"],
  ["TSwift", 2, 2, 728, "2020/06/Lightning-Living.jpg", "tswift"],
  ["Tundra", 4, 2, 1780, "2020/06/JWLeePhoto-4363.jpg", "tundra"],
  ["Veranda", 3, 2, 1795, "2025/04/WK1_4083.jpg", "veranda-3-bed-2-bath-1795-sq-ft"],
  ["Victorian", 4, 2, 2254, "2020/06/JWL_0819.jpg", "victorian"],
  ["Vin Diesel", 3, 2, 1128, "2025/03/JWLeePhoto-4309.jpg", "vin-diesel"],
  ["Whitney", 4, 2, 2273, "2025/04/JWLeeMedia-200.jpg", "whitney"],
  ["Yellow Jacket", 2, 2, 830, "2020/12/JWL_9155.jpg", "yellow-jacket"],
  ["Yellowstone", 4, 2, 1958, "2025/04/JWL_8021.jpg", "yellowstone"],
  ["Yukon", 4, 3, 1976, "2020/12/JWL_0501.jpg", "yukon"],
];

// Section per source slug, from the source site's singlewides/triplewides categories; everything else is a double wide.
const singleWides = new Set([
  "ace", "apache", "brunswick", "cedar-river", "colorado", "escalade", "jlow", "lexi",
  "mahomes", "naples", "sling-shot", "slugger-3-bed-2-bath-1130-sq-ft", "troy", "tswift", "vin-diesel", "yellow-jacket",
]);
const tripleWides = new Set(["arlington", "biltmore", "lone-star", "ponderosa"]);

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const homes: Home[] = raw.map(([name, beds, baths, sqft, photo, source]) => ({
  slug: slugify(name),
  name,
  beds,
  baths,
  sqft,
  section: singleWides.has(source) ? "Single wide" : tripleWides.has(source) ? "Triple wide" : "Double wide",
  photo: UPLOADS + photo,
  source: PROJECT + source + "/",
}));

/** Hand-picked for the home page: a spread of sizes, newest photography. */
export const featured = ["arlington", "lone-star", "horizon", "georgia-giant", "cardinal"].map(
  (slug) => homes.find((h) => h.slug === slug)!,
);

export const getHome = (slug: string) => homes.find((h) => h.slug === slug);

export const specs = (h: Home) => `${h.beds} bed · ${h.baths} bath · ${h.sqft.toLocaleString("en-US")} sq ft`;

/** Descriptive alt text for a home's listing photo. */
export const homeAlt = (h: Home) =>
  `The ${h.name}, a ${h.beds}-bedroom, ${h.baths}-bath, ${h.sqft.toLocaleString("en-US")} sq ft manufactured home`;

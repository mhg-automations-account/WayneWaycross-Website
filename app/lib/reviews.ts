import snapshot from "./reviews-snapshot.json";

/** Google Business Profile for Wayne Frier Home Center of Waycross. */
export const GOOGLE_PLACE_ID = "ChIJ6_LAhZrw74gRlsozxxEppxg";
export const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;
export const googleWriteReviewUrl = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export const MIN_RATING = 4;

export type Review = {
  author: string;
  avatar: string | null;
  rating: number;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  text: string;
};

export type ReviewSummary = {
  reviews: Review[];
  rating: number | null;
  total: number | null;
};

const DAY = 60 * 60 * 24;

// The dealership's review widget mirrors every Google review for the listing, unlike the
// Places API which only ever returns 5, so it's the main live source.
const FEED_URL = "https://www.localmarketingmanager.com/api/reviews/wayne-frier-home-center-waycross-review-widget?pageSize=1000";

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const isoDate = (s: string) => {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

async function fromFeed(): Promise<Review[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: DAY } });
  if (!res.ok) return [];
  const html = await res.text();
  const body = html.slice(html.indexOf("<body")).replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, "");
  return body
    .split('class="review-card"')
    .slice(1)
    .map((card) => {
      const pick = (re: RegExp) => card.match(re)?.[1] ?? "";
      return {
        author: decode(pick(/class="reviewer-name">([\s\S]*?)<\/div>/)),
        avatar: pick(/<img src="([^"]+)"[^>]*class="reviewer-avatar"/) || null,
        rating: card.match(/class="star filled"/g)?.length ?? 0,
        date: isoDate(decode(pick(/class="review-date">([\s\S]*?)<\/div>/))),
        text: decode(pick(/class="review-comment">([\s\S]*?)<\/div>/)),
      };
    })
    .filter((r) => r.author && r.date);
}

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    publishTime: string;
    originalText?: { text: string };
    text?: { text: string };
    authorAttribution?: { displayName: string; photoUri?: string };
  }[];
};

/** Google Places API (New). Needs GOOGLE_PLACES_API_KEY; supplies the overall rating and newest reviews. */
async function fromPlaces(): Promise<{ reviews: Review[]; rating: number | null; total: number | null }> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { reviews: [], rating: null, total: null };
  const res = await fetch(`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=en`, {
    headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
    next: { revalidate: DAY },
  });
  if (!res.ok) return { reviews: [], rating: null, total: null };
  const data: PlaceResponse = await res.json();
  return {
    rating: data.rating ?? null,
    total: data.userRatingCount ?? null,
    reviews: (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google user",
      avatar: r.authorAttribution?.photoUri ?? null,
      rating: r.rating,
      date: r.publishTime.slice(0, 10),
      text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
    })),
  };
}

/** All 4+ star Google reviews that have written comments, newest first. */
export async function getReviews(): Promise<ReviewSummary> {
  const [feed, places] = await Promise.all([fromFeed().catch(() => []), fromPlaces().catch(() => null)]);

  const seen = new Set<string>();
  const reviews = [...(places?.reviews ?? []), ...feed, ...(snapshot as Review[])]
    .filter((r) => r.rating >= MIN_RATING && r.text)
    .filter((r) => {
      const k = `${r.author.toLowerCase()}|${r.text.slice(0, 40).toLowerCase()}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return { reviews, rating: places?.rating ?? null, total: places?.total ?? null };
}

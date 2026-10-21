export const site = {
  name: "Wayne Frier of Waycross",
  fullName: "Wayne Frier Home Center of Waycross",
  phone: "(912) 283-6062",
  phoneHref: "tel:+19122836062",
  facebook: "https://www.facebook.com/waynefrierwaycross/",
  instagram: "https://www.instagram.com/waynefrierwaycross/",
  youtube: "https://www.youtube.com/channel/UCVfQF78pz2sam57aGj9zqoA",
  twitter: "https://twitter.com/waynefrierhomes",
  city: "Waycross, GA",
  /** Canonical origin used for metadata, the sitemap and structured data. Set NEXT_PUBLIC_SITE_URL to override (e.g. a www host). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://waynefrierwaycross.com").replace(/\/+$/, ""),
  address: {
    street: "2072 Brunswick Hwy",
    city: "Waycross",
    region: "GA",
    postalCode: "31503",
  },
  geo: { lat: 31.2047639, lng: -82.3276334 },
  mapUrl: "https://www.google.com/maps/place/Wayne+Frier+Home+Center+Waycross/data=!4m2!3m1!1s0x0:0x18a72911c733ca96",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
    { days: ["Saturday"], opens: "09:00", closes: "15:00" },
  ],
  /** Human-readable hours for the footer and contact page. */
  hoursText: [
    ["Mon–Fri", "8:30 am – 5:30 pm"],
    ["Sat", "9:00 am – 3:00 pm"],
    ["Sun", "Closed"],
  ] as const,
};

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

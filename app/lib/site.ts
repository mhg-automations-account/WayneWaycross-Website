export const site = {
  name: "Family Homes",
  fullName: "Family Homes of Crestview",
  phone: "(850) 683-1777",
  phoneHref: "tel:+18506831777",
  facebook: "https://www.facebook.com/familyhomecentercrestview/",
  city: "Crestview, FL",
  /** Canonical origin used for metadata, the sitemap and structured data. Set NEXT_PUBLIC_SITE_URL to override (e.g. a www host). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://familyhomesofcrestview.com").replace(/\/+$/, ""),
  address: {
    street: "5350 S Ferdon Blvd",
    city: "Crestview",
    region: "FL",
    postalCode: "32536",
  },
  geo: { lat: 30.7010868, lng: -86.5717609 },
  mapUrl: "https://www.google.com/maps/place/Family+Home+Center/data=!4m2!3m1!1s0x0:0x64527220b340aa9b",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:30" },
    { days: ["Saturday"], opens: "09:00", closes: "16:30" },
  ],
};

/** Standard amortized monthly payment. */
export function monthlyPayment(principal: number, aprPercent: number, years: number) {
  const r = aprPercent / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

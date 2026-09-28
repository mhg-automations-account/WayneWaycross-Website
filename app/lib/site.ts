export const site = {
  name: "Family Homes",
  fullName: "Family Homes of Crestview",
  phone: "(850) 683-1777",
  phoneHref: "tel:+18506831777",
  facebook: "https://www.facebook.com/familyhomecentercrestview/",
  city: "Crestview, FL",
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

/** Small deterministic PRNG so server and client render identical artwork. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

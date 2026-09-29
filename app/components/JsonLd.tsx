import { absoluteUrl } from "../lib/seo";
import { site } from "../lib/site";

/** Renders schema.org structured data. `<` is escaped so the payload can't close the script tag. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const businessId = `${site.url}/#business`;

/** The dealership itself, shown on every page. */
export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileHomeDealer",
      "@id": businessId,
      name: site.fullName,
      alternateName: "Family Home Center of Crestview",
      url: absoluteUrl("/"),
      telephone: "+1-850-683-1777",
      image: absoluteUrl("/og-image.jpg"),
      logo: absoluteUrl("/FHC-CRESTVIEW-logo10_alt-325-rev2-copy.png"),
      description:
        "Mobile and manufactured home dealer in Crestview, Florida selling single, double and triple-wide Live Oak Homes and TownHomes, with land/home packages, financing, delivery and setup.",
      foundingDate: "1998",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
      hasMap: site.mapUrl,
      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: [
        { "@type": "City", name: "Crestview" },
        { "@type": "AdministrativeArea", name: "Okaloosa County" },
        { "@type": "AdministrativeArea", name: "Northwest Florida" },
        { "@type": "AdministrativeArea", name: "South Alabama" },
      ],
      sameAs: [site.facebook],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: absoluteUrl("/"),
      name: site.fullName,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
  ],
};

/** Breadcrumb trail; the home page is always the first crumb. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

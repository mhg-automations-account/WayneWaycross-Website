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
      alternateName: "Wayne Frier of Waycross",
      url: absoluteUrl("/"),
      telephone: "+1-912-283-6062",
      image: absoluteUrl("/og-image.jpg"),
      logo: absoluteUrl("/WFHC-WAYCROSS-logo.png"),
      description:
        "Mobile and manufactured home dealer in Waycross, Georgia and the exclusive Live Oak Homes retailer in Waycross, selling singlewide, doublewide and triplewide homes with delivery and setup.",
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
        { "@type": "City", name: "Waycross" },
        { "@type": "AdministrativeArea", name: "Georgia" },
        { "@type": "AdministrativeArea", name: "Florida" },
        { "@type": "AdministrativeArea", name: "South Carolina" },
      ],
      sameAs: [site.facebook, site.instagram, site.youtube, site.twitter],
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

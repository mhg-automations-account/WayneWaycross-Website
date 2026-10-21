import type { MetadataRoute } from "next";
import { homes } from "./lib/homes";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), images: [absoluteUrl("/og-image.jpg")] },
    { url: absoluteUrl("/homes") },
    { url: absoluteUrl("/about") },
    { url: absoluteUrl("/specials") },
    { url: absoluteUrl("/upgrades") },
    { url: absoluteUrl("/contact") },
    ...homes.map((h) => ({ url: absoluteUrl(`/homes/${h.slug}`), images: [absoluteUrl(h.images[0])] })),
  ];
}

import type { MetadataRoute } from "next";
import { homes } from "./lib/homes";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), images: [absoluteUrl("/og-image.jpg")] },
    { url: absoluteUrl("/homes") },
    { url: absoluteUrl("/about") },
    ...homes.map((h) => ({ url: absoluteUrl(`/homes/${h.slug}`), images: [h.photo] })),
  ];
}

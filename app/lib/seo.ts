import type { Metadata } from "next";
import { site } from "./site";

/** Default social share image in /public, 1200×630. */
export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${site.fullName} logo over the living room of a model home`,
};

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter tags.
 * Next merges metadata shallowly, so every page sets the full `openGraph` object here
 * rather than relying on the root layout's.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  const images = [image ?? ogImage];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.fullName,
      locale: "en_US",
      url: path,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;

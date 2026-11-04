import type { Metadata } from "next";

/**
 * Public address of the site, used for canonical URLs, Open Graph tags and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL to the real domain (e.g. https://whyvote.ng) in production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "whyVote";
export const SITE_TAGLINE = "2027 general election guide";
export const SITE_DESCRIPTION =
  "Plain, nonpartisan answers for young Nigerians: why to vote, what is on your 2027 ballot, every candidate from INEC’s final list, and how to get ready for 16 January and 6 February 2027.";
export const PUBLISHER = "PoliZ";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "whyvote: a plain, nonpartisan guide to Nigeria’s 2027 general election",
};

/**
 * Standard metadata for a page: title, description, canonical URL, Open Graph and Twitter tags.
 * Open Graph and Twitter blocks replace the parent's, so every page sets its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  noIndex = false,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  /** Set when the route has its own opengraph-image file. */
  ownImage?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_NG",
      url: path,
      title: fullTitle,
      description,
      ...(ownImage ? {} : { images: [DEFAULT_OG_IMAGE] }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(ownImage ? {} : { images: [DEFAULT_OG_IMAGE.url] }) },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Schema.org JSON-LD, rendered as a script tag. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}

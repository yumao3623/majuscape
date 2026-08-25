import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const siteName = "Majuscape";
export const defaultTitle = "Capitalization Games for Kids | Majuscape";
export const defaultDescription =
  "Play free capitalization games for kids. Repair sentences, sort words, and practice proper nouns, names, places, days, months, titles, and capitalization rules online.";

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Majuscape - free capitalization games for kids",
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

import type { Metadata } from "next";
import type { Seo } from "@/content/types";
import { routing, type Locale } from "@/i18n/routing";
import { urlFor } from "@/sanity/image";
import { tr } from "./content";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://intematrading.com")
).replace(/\/$/, "");

const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

/** `path` is locale-less and starts with "/" ("/" for home, "/services", …). */
export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, path)])),
    "x-default": localizedPath(routing.defaultLocale, path),
  };
}

export function buildMetadata({
  locale,
  path,
  seo,
  siteName,
  fallbackTitle,
}: {
  locale: Locale;
  path: string;
  seo?: Seo;
  siteName: string;
  fallbackTitle: string;
}): Metadata {
  const title = tr(seo?.title, locale) || fallbackTitle;
  const description = tr(seo?.description, locale) || undefined;
  const url = localizedPath(locale, path);
  const ogImage = seo?.ogImage?.asset
    ? [{ url: urlFor(seo.ogImage).width(1200).height(630).fit("crop").url(), width: 1200, height: 630 }]
    : undefined; // otherwise the opengraph-image route supplies one

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

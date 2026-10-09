import "server-only";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import * as fallback from "@/content/fallback";
import type {
  AboutPage,
  Brand,
  ContactPage,
  ExportItem,
  HomePage,
  LocaleString,
  Partner,
  ProducedItem,
  ServicesPage,
  SiteSettings,
  TeamMember,
  TeamPage,
  Testimonial,
} from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";

/** Cache tag the Sanity webhook (/api/revalidate) invalidates on publish. */
export const SANITY_TAG = "sanity";

// Production caches CMS reads for up to an hour (the publish webhook refreshes
// them immediately). In development, always read fresh so edits in the Studio
// show up on the next page load.
const REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 3600;

async function fetchOr<T>(query: string, fallbackValue: T): Promise<T> {
  if (!isSanityConfigured) return fallbackValue;
  let result: T | null;
  try {
    result = await client.fetch<T | null>(query, {}, {
      next: { revalidate: REVALIDATE, tags: [SANITY_TAG] },
    });
  } catch (error) {
    // Sanity unreachable (network blip, outage): show the built-in content
    // rather than failing the whole page.
    console.error("[content] Sanity fetch failed; using fallback content.", error);
    return fallbackValue;
  }
  // A singleton that hasn't been created in the Studio yet comes back null.
  if (result == null || (Array.isArray(result) && result.length === 0)) return fallbackValue;
  return result;
}

const settingsQuery = defineQuery(`*[_id == "siteSettings"][0]`);
const homeQuery = defineQuery(`*[_id == "homePage"][0]`);
const servicesQuery = defineQuery(`*[_id == "servicesPage"][0]`);
const brandsQuery = defineQuery(
  `*[_type == "brand"] | order(coalesce(order, 999) asc, name asc){ _id, name, category, subBrands, description, image, featured }`,
);
const teamPageQuery = defineQuery(`*[_id == "teamPage"][0]`);
const teamMembersQuery = defineQuery(
  `*[_type == "teamMember"] | order(coalesce(order, 999) asc, name.en asc){ _id, name, role, group, bio, photo }`,
);
const partnersQuery = defineQuery(`*[_type == "partner"] | order(coalesce(order, 999) asc, name asc){ _id, name, logo, website }`);
const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]`);
const producedItemsQuery = defineQuery(
  `*[_type == "producedItem"] | order(coalesce(order, 999) asc, name.en asc){ _id, name, category, description, image }`,
);
const exportItemsQuery = defineQuery(
  `*[_type == "exportItem"] | order(coalesce(order, 999) asc, name asc){ _id, name, description, image }`,
);
const aboutPageQuery = defineQuery(`*[_id == "aboutPage"][0]`);
const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc){ _id, quote, name, role, company, photo }`,
);

// The header eyebrow falls back to the default copy while the CMS field is empty.
const withEyebrow = <T extends { eyebrow?: LocaleString }>(page: T, defaults: T): T => ({ ...page, eyebrow: page.eyebrow ?? defaults.eyebrow });

export const getSiteSettings = cache(() => fetchOr<SiteSettings>(settingsQuery, fallback.siteSettings));
export const getHomePage = cache(() => fetchOr<HomePage>(homeQuery, fallback.homePage));
export const getServicesPage = cache(async () => withEyebrow(await fetchOr<ServicesPage>(servicesQuery, fallback.servicesPage), fallback.servicesPage));
export const getBrands = cache(() => fetchOr<Brand[]>(brandsQuery, fallback.brands));
export const getPartners = cache(() => fetchOr<Partner[]>(partnersQuery, fallback.partners));
export const getTeamPage = cache(async () => withEyebrow(await fetchOr<TeamPage>(teamPageQuery, fallback.teamPage), fallback.teamPage));
export const getTeamMembers = cache(() => fetchOr<TeamMember[]>(teamMembersQuery, fallback.teamMembers));
export const getProducedItems = cache(() => fetchOr<ProducedItem[]>(producedItemsQuery, fallback.producedItems));
export const getExportItems = cache(() => fetchOr<ExportItem[]>(exportItemsQuery, fallback.exportItems));
export const getContactPage = cache(() => fetchOr<ContactPage>(contactPageQuery, fallback.contactPage));
export const getAboutPage = cache(async () => withEyebrow(await fetchOr<AboutPage>(aboutPageQuery, fallback.aboutPage), fallback.aboutPage));

/**
 * Real testimonials from Sanity. The labelled samples are shown only while
 * Sanity isn't connected, so they can never reach a site that has real content.
 */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!isSanityConfigured) return fallback.testimonials;
  try {
    return await client.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { revalidate: REVALIDATE, tags: [SANITY_TAG] } });
  } catch (error) {
    // Never the samples here: just no testimonials section this time.
    console.error("[content] Sanity fetch failed; hiding testimonials.", error);
    return [];
  }
});

/** Picks the value for `locale`, falling back to English when a translation is missing. */
export function tr(value: LocaleString | undefined | null, locale: Locale): string {
  if (!value) return "";
  return (locale === "fr" && value.fr?.trim()) || value.en;
}

import "server-only";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import * as fallback from "@/content/fallback";
import type {
  AboutPage,
  Brand,
  ContactPage,
  HomePage,
  LocaleString,
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

async function fetchOr<T>(query: string, fallbackValue: T): Promise<T> {
  if (!isSanityConfigured) return fallbackValue;
  const result = await client.fetch<T | null>(query, {}, {
    next: { revalidate: 3600, tags: [SANITY_TAG] },
  });
  // A singleton that hasn't been created in the Studio yet comes back null.
  if (result == null || (Array.isArray(result) && result.length === 0)) return fallbackValue;
  return result;
}

const settingsQuery = defineQuery(`*[_id == "siteSettings"][0]`);
const homeQuery = defineQuery(`*[_id == "homePage"][0]`);
const servicesQuery = defineQuery(`*[_id == "servicesPage"][0]`);
const brandsQuery = defineQuery(
  `*[_type == "brand"] | order(coalesce(order, 999) asc, name asc){ _id, name, category, subBrands, description, image, logo }`,
);
const teamPageQuery = defineQuery(`*[_id == "teamPage"][0]`);
const teamMembersQuery = defineQuery(
  `*[_type == "teamMember"] | order(coalesce(order, 999) asc, name.en asc){ _id, name, role, group, bio, photo }`,
);
const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]`);
const aboutPageQuery = defineQuery(`*[_id == "aboutPage"][0]`);
const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc){ _id, quote, name, role, company, photo }`,
);

export const getSiteSettings = cache(() => fetchOr<SiteSettings>(settingsQuery, fallback.siteSettings));
export const getHomePage = cache(() => fetchOr<HomePage>(homeQuery, fallback.homePage));
export const getServicesPage = cache(() => fetchOr<ServicesPage>(servicesQuery, fallback.servicesPage));
export const getBrands = cache(() => fetchOr<Brand[]>(brandsQuery, fallback.brands));
export const getTeamPage = cache(() => fetchOr<TeamPage>(teamPageQuery, fallback.teamPage));
export const getTeamMembers = cache(() => fetchOr<TeamMember[]>(teamMembersQuery, fallback.teamMembers));
export const getContactPage = cache(() => fetchOr<ContactPage>(contactPageQuery, fallback.contactPage));
export const getAboutPage = cache(() => fetchOr<AboutPage>(aboutPageQuery, fallback.aboutPage));

/**
 * Real testimonials from Sanity. The labelled samples are shown only while
 * Sanity isn't connected, so they can never reach a site that has real content.
 */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!isSanityConfigured) return fallback.testimonials;
  return client.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { revalidate: 3600, tags: [SANITY_TAG] } });
});

/** Picks the value for `locale`, falling back to English when a translation is missing. */
export function tr(value: LocaleString | undefined | null, locale: Locale): string {
  if (!value) return "";
  return (locale === "am" && value.am?.trim()) || value.en;
}

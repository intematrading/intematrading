// Loads the site's built-in copy (src/content/fallback.ts) into Sanity, so the
// Studio starts filled in rather than empty.
//
//   npm run seed
//
// Safe to re-run: documents that already exist are left untouched, so edits
// made in the Studio are never overwritten. Images are not uploaded — empty
// image fields keep showing the stock placeholders until a real photo is added.
// Sample testimonials are created as unpublished drafts: templates in the
// Studio that never appear on the site until someone fills them in and publishes.

import { createClient } from "@sanity/client";
import * as fallback from "../src/content/fallback.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });

// Sanity needs a _type on inline objects in arrays, and a _key on every array item.
const arrayItemType: Record<string, string> = {
  stats: "stat",
  facts: "stat",
  entryCards: "entryCard",
  processSteps: "titledText",
  departments: "titledText",
  socialLinks: "socialLink",
  commitmentPoints: "commitmentPoint",
  keysToSuccess: "localeString",
  exportMarkets: "titledText",
  sourcingRegions: "titledText",
  marketStats: "stat",
  routeSteps: "titledText",
  foodCategories: "localeString",
  nonFoodCategories: "localeString",
  whoWeAre: "localeText",
};

function prepare(value: unknown, field = ""): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      if (item === null || typeof item !== "object") return item;
      const obj = prepare(item) as Record<string, unknown>;
      return {
        _key: (obj._key as string) ?? `${field || "item"}-${i}`,
        ...(arrayItemType[field] && !obj._type ? { _type: arrayItemType[field] } : {}),
        ...obj,
      };
    });
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).filter(([, v]) => v !== undefined).map(([k, v]) => [k, prepare(v, k)]),
    );
  }
  return value;
}

const singletons: [string, object][] = [
  ["siteSettings", fallback.siteSettings],
  ["homePage", fallback.homePage],
  ["aboutPage", fallback.aboutPage],
  ["servicesPage", fallback.servicesPage],
  ["teamPage", fallback.teamPage],
  ["contactPage", fallback.contactPage],
];

const docs = [
  ...singletons.map(([type, data]) => ({ _id: type, _type: type, ...data })),
  ...fallback.brands.map((b, i) => ({ ...b, _type: "brand", order: i + 1 })),
  ...fallback.teamMembers.map((m, i) => ({ ...m, _type: "teamMember", order: i + 1 })),
  ...fallback.producedItems.map((p, i) => ({ ...p, _type: "producedItem", order: i + 1 })),
  ...fallback.exportItems.map((e, i) => ({ ...e, _type: "exportItem", order: i + 1 })),
  ...fallback.partners.map((p, i) => ({ ...p, _type: "partner", order: i + 1 })),
  // `sample` and `_id` are dropped: samples become numbered Studio drafts.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...fallback.testimonials.map(({ sample: _sample, _id, ...t }, i) => ({
    ...t,
    _id: `drafts.testimonial-sample-${i + 1}`,
    _type: "testimonial",
    order: i + 1,
  })),
].map((d) => prepare(d) as { _id: string; _type: string });

const existing = new Set<string>(await client.fetch(`*[_id in $ids]._id`, { ids: docs.map((d) => d._id) }));
const toCreate = docs.filter((d) => !existing.has(d._id));

if (toCreate.length) {
  const tx = client.transaction();
  for (const doc of toCreate) tx.createIfNotExists(doc);
  await tx.commit();
}

console.log(`Created ${toCreate.length} document(s); ${existing.size} already existed and were left unchanged.`);
for (const d of toCreate) console.log(`  + ${d._type.padEnd(13)} ${d._id}`);

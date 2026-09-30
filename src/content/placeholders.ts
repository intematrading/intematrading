// Temporary stock photography (Unsplash License — free to use, no attribution
// required; credits kept in public/placeholders/CREDITS.md). Shown only where
// no image has been uploaded in Sanity yet. To retire one, upload the real
// photo in the Studio; delete this file and public/placeholders/ once all are replaced.

export type Placeholder = { src: string; position?: string };

export const placeholders = {
  hero: { src: "/placeholders/hero-port.jpg", position: "50% 60%" },
  import: { src: "/placeholders/import-ship.jpg" },
  produce: { src: "/placeholders/produce-candles.jpg", position: "70% 100%" },
  export: { src: "/placeholders/export-coffee.jpg" },
  commitment: { src: "/placeholders/commitment-truck.jpg", position: "60% 50%" },
  contactBand: { src: "/placeholders/contact-band.jpg", position: "65% 40%" },
  partnerCta: { src: "/placeholders/partner-cta.jpg" },
} satisfies Record<string, Placeholder>;

// Product-card stand-ins: stock category shots, not the actual products.
// Keyed by brand document id (imports) or item key (produce / export).
const product = (file: string, position?: string): Placeholder => ({ src: `/placeholders/products/${file}.jpg`, position });
export const productPlaceholders: Record<string, Placeholder> = {
  "brand-reckitt": product("reckitt"),
  "brand-queen-elisabeth": product("queen-elisabeth"),
  "brand-clere": product("clere"),
  "brand-fa": product("fa"),
  "brand-vatika": product("vatika"),
  "brand-nido": product("nido"),
  "brand-heinz": product("heinz"),
  "brand-campbells": product("campbells"),
  "brand-international-collection": product("international-collection"),
  "brand-power-horse": product("power-horse"),
  "brand-irn-bru": product("irn-bru"),
  abay: { src: "/placeholders/abay-candles.jpg", position: "25% 100%" },
  skor: product("soap-1"),
  cool: product("soap-2"),
  mama: product("soap-3"),
  abu: product("soap-1", "30% 50%"),
  kanna: product("soap-2", "70% 50%"),
  pass: product("soap-3", "20% 60%"),
  seedcup: { src: "/placeholders/about-coffee.jpg" },
  bella: { src: "/placeholders/export-coffee.jpg" },
};

export const heroPlaceholders = {
  about: { src: "/placeholders/hero-about.jpg", position: "60% 50%" },
  services: { src: "/placeholders/import-ship.jpg" },
  team: { src: "/placeholders/hero-team.jpg" },
  contact: { src: "/placeholders/hero-contact.jpg", position: "80% 50%" },
} satisfies Record<string, Placeholder>;

// Avatars for the labelled sample testimonials only (keyed by sample id).
export const testimonialPlaceholders: Record<string, Placeholder> = {
  "sample-1": { src: "/placeholders/testimonial-1.jpg" },
  "sample-2": { src: "/placeholders/testimonial-2.jpg" },
  "sample-3": { src: "/placeholders/testimonial-3.jpg" },
};

export const galleryPlaceholders: Record<string, Placeholder> = {
  warehouse: { src: "/placeholders/about-warehouse.jpg" },
  fleet: { src: "/placeholders/about-fleet.jpg" },
  retail: { src: "/placeholders/about-retail.jpg" },
  port: { src: "/placeholders/hero-port.jpg", position: "50% 60%" },
  candles: { src: "/placeholders/produce-candles.jpg", position: "70% 100%" },
  coffee: { src: "/placeholders/about-coffee.jpg" },
  training: { src: "/placeholders/about-training.jpg" },
};

export const teamSectionPlaceholders = {
  leadership: { src: "/placeholders/team-leadership.jpg" },
  sales: { src: "/placeholders/team-sales.jpg", position: "50% 35%" },
} satisfies Record<string, Placeholder>;

// Stock portraits standing in for named team members, keyed by the fallback
// document ids. These are NOT photos of the people named — replace every one
// with a real photo in the Studio before launch.
export const teamPlaceholders: Record<string, Placeholder> = {
  "team-bedru": { src: "/placeholders/team-1.jpg", position: "50% 20%" },
  "team-eliyas": { src: "/placeholders/team-2.jpg", position: "50% 20%" },
  "team-tesfaye": { src: "/placeholders/team-3.jpg", position: "50% 20%" },
  "team-kalid": { src: "/placeholders/team-4.jpg", position: "50% 20%" },
};

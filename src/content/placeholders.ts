// Temporary stock photography (Unsplash License — free to use, no attribution
// required; credits kept in public/placeholders/CREDITS.md). Shown only where
// no image has been uploaded in Sanity yet. To retire one, upload the real
// photo in the Studio; delete this file and public/placeholders/ once all are replaced.

export type Placeholder = { src: string; position?: string };

export const placeholders = {
  hero: { src: "/placeholders/hero-port.jpg", position: "50% 60%" },
  import: { src: "/placeholders/import-ship.jpg" },
  produce: { src: "/placeholders/produce-stick-candles.jpg", position: "50% 100%" },
  export: { src: "/placeholders/export-coffee.jpg" },
  stats: { src: "/placeholders/about-fleet.jpg" },
  commitment: { src: "/placeholders/commitment-truck.jpg", position: "60% 50%" },
  contactBand: { src: "/placeholders/contact-handshake.jpg", position: "60% 45%" },
  vision: { src: "/placeholders/about-warehouse.jpg" },
  keys: { src: "/placeholders/about-retail.jpg" },
  produceBand: { src: "/placeholders/produce-factory.jpg" },
  partnerCta: { src: "/placeholders/partner-cta.jpg" },
  ambassador: { src: "/placeholders/abay-candles.jpg", position: "25% 100%" },
  // Home: Meet our team
  teamBand: { src: "/placeholders/about-training.jpg" },
} satisfies Record<string, Placeholder>;

// Product-card stand-ins: stock category shots, not the actual products.
// Keyed by document id.
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
  "brand-loreal-professionnel": { src: "/placeholders/nonfood-haircare.jpg", position: "60% 50%" },
  "produce-abay": { src: "/placeholders/abay-candles.jpg", position: "25% 100%" },
  "export-seedcup": { src: "/placeholders/about-coffee.jpg" },
  "export-bella": { src: "/placeholders/export-coffee.jpg" },
};

export const heroPlaceholders = {
  about: { src: "/placeholders/hero-about.jpg", position: "60% 50%" },
  services: { src: "/placeholders/import-ship.jpg" },
  team: { src: "/placeholders/hero-team.jpg" },
} satisfies Record<string, Placeholder>;

// Avatars for the labelled sample testimonials only (keyed by sample id).
// Stand-in avatars for testimonials without a photo, used in rotation.
export const testimonialPlaceholders: Placeholder[] = [
  { src: "/placeholders/testimonial-1.jpg" },
  { src: "/placeholders/testimonial-2.jpg" },
  { src: "/placeholders/testimonial-3.jpg" },
];

// Stock portraits standing in for named team members, keyed by the fallback
// document ids. These are NOT photos of the people named — replace every one
// with a real photo in the Studio before launch.
export const teamPlaceholders: Record<string, Placeholder> = {
  "team-bedru": { src: "/placeholders/team-1.jpg", position: "50% 20%" },
  "team-eliyas": { src: "/placeholders/team-2.jpg", position: "50% 20%" },
  "team-seid": { src: "/placeholders/team-3.jpg", position: "50% 20%" },
  "team-noah": { src: "/placeholders/team-4.jpg", position: "50% 20%" },
  "team-abdu": { src: "/placeholders/team-5.jpg", position: "50% 20%" },
  "team-amira": { src: "/placeholders/team-6.jpg", position: "50% 20%" },
  "team-sebrina": { src: "/placeholders/team-7.jpg", position: "50% 25%" },
  "team-beza": { src: "/placeholders/team-8.jpg", position: "50% 25%" },
  "team-seada": { src: "/placeholders/team-9.jpg", position: "50% 20%" },
  "team-neima": { src: "/placeholders/team-11.jpg", position: "50% 20%" },
};

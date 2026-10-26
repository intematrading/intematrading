// Temporary stock photography (Unsplash License — free to use, no attribution
// required; credits kept in public/placeholders/CREDITS.md). Shown only where
// no image has been uploaded in Sanity yet. To retire one, upload the real
// photo in the Studio; delete this file and public/placeholders/ once all are replaced.

export type Placeholder = { src: string; position?: string };

export const placeholders = {
  hero: { src: "/placeholders/hero-ship.jpg", position: "50% 55%" },
  import: { src: "/placeholders/import-ship.jpg" },
  produce: { src: "/placeholders/produce-stick-candles.jpg", position: "50% 100%" },
  export: { src: "/placeholders/export-coffee.jpg" },
  commitment: { src: "/placeholders/commitment-truck.jpg", position: "60% 50%" },
  contactBand: { src: "/placeholders/contact-handshake.jpg", position: "60% 45%" },
  vision: { src: "/placeholders/about-warehouse.jpg" },
  keys: { src: "/placeholders/about-retail.jpg" },
  produceBand: { src: "/placeholders/produce-factory.jpg" },
  // Services: closing value proposition band
  valueBand: { src: "/placeholders/about-retail.jpg" },
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
  contact: { src: "/placeholders/contact-handshake.jpg", position: "60% 45%" },
} satisfies Record<string, Placeholder>;


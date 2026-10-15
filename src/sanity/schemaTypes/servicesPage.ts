import { PackageIcon } from "@sanity/icons/Package";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt, statList, titledTextList } from "./shared";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Our Services page",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "market", title: "Why Ethiopia?", default: true },
    { name: "import", title: "We Import" },
    { name: "distribution", title: "We Distribute" },
    { name: "produce", title: "We Produce" },
    { name: "export", title: "We Export" },
    { name: "route", title: "Our route (end of page)" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "eyebrow",
      title: "Header eyebrow",
      type: "localeString",
      description: "Short label above the page title. Leave empty to use the default.",
    }),
    defineField({ name: "intro", type: "localeText" }),
    imageWithAlt("heroImage", "Header photo"),

    // We Import — the brand logos themselves are "Brand" documents.
    // Why Ethiopia?
    defineField({ name: "marketHeading", title: "Heading", type: "localeString", group: "market" }),
    defineField({ name: "marketIntro", title: "Intro", type: "localeText", group: "market" }),
    statList("marketStats", "Market figures", "market"),
    defineField({ name: "marketSource", title: "Sources line", type: "localeString", group: "market", description: "Shown in small print under the figures." }),

    defineField({ name: "importHeading", type: "localeString", group: "import" }),
    defineField({ name: "importIntro", type: "localeText", group: "import" }),
    defineField({ name: "nonFoodIntro", title: "Non-food category description", type: "localeText", group: "import" }),
    defineField({ name: "foodIntro", title: "Food category description", type: "localeText", group: "import" }),

    titledTextList("sourcingRegions", "Where we source", "import"),

    // We Distribute — empty fields fall back to the Distribution step (Home page → From port to shelf).
    defineField({ name: "distributionHeading", type: "localeString", group: "distribution", description: 'Leave empty for "We Distribute".' }),
    defineField({ name: "distributionIntro", type: "localeText", group: "distribution", description: "Leave empty to use the Distribution step's short line (Home page → From port to shelf)." }),
    defineField({ name: "distributionBody", title: "Details", type: "localeText", group: "distribution", description: "Under the map. Leave empty to use the Distribution step's details." }),
    defineField({
      name: "distributionStores",
      title: "Stores on the map",
      type: "array",
      group: "distribution",
      description: "The supermarkets on the map's first five pins, in order: 1 far left, 2 lower middle, 3 top middle, 4 right of centre, 5 bottom right (the sixth pin, top right, is always \"…\" with \"And much more\"). The name shows in the bubble, the logo inside the pin. Leave empty to use the logos in public/supermarket-logos.",
      of: [
        defineArrayMember({
          type: "object",
          name: "mapStore",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "logo", type: "image", description: "Shown inside the pin's circle; a square or round logo on a transparent or white background works best." }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
      validation: (r) => r.max(5),
    }),
    defineField({ name: "distributionGalleryIntro", title: "Photos intro", type: "localeText", group: "distribution", description: "Under the On the shelves heading." }),
    defineField({
      name: "distributionGallery",
      title: "Photos (On the shelves)",
      type: "array",
      group: "distribution",
      description: "Aisles and shelves in the stores we supply. The first photo is shown largest; 5 fill the layout neatly.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", type: "localeString", description: 'The store or place, e.g. "Shoa Supermarket, Bole".' }),
            defineField({ name: "alt", title: "Alt text", type: "localeString" }),
          ],
        }),
      ],
    }),

    // We Produce
    defineField({ name: "produceHeading", type: "localeString", group: "produce" }),
    defineField({ name: "produceIntro", type: "localeText", group: "produce" }),
    imageWithAlt("produceImage", "Background photo", "produce"),
    defineField({
      name: "productsIntro",
      title: "Products description",
      type: "localeText",
      group: "produce",
      description: 'The products themselves are managed under "Produced products".',
    }),

    // We Export
    defineField({ name: "exportHeading", type: "localeString", group: "export" }),
    defineField({ name: "exportIntro", type: "localeText", group: "export" }),
    defineField({ name: "exportBody", type: "localeText", group: "export" }),
    defineField({
      name: "exportBrandsIntro",
      title: "Export brands description",
      type: "localeText",
      group: "export",
      description: 'The brands themselves are managed under "Export brands".',
    }),
    titledTextList("exportMarkets", "Target markets", "export"),

    defineField({ name: "routeHeading", title: "Heading", type: "localeString", group: "route", description: "The steps themselves are edited on the Home page (From port to shelf)." }),
    defineField({ name: "routeIntro", title: "Intro", type: "localeText", group: "route" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Our Services page" }) },
});


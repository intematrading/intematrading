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
    { name: "value", title: "Value proposition (closing)" },
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
    titledTextList("marketPoints", "Reasons to enter Ethiopia", "market"),
    defineField({ name: "marketSource", title: "Sources line", type: "localeString", group: "market", description: "Shown in small print under the figures." }),

    defineField({ name: "importHeading", type: "localeString", group: "import" }),
    defineField({ name: "importTagline", title: "Tagline", type: "localeString", group: "import", description: "A short statement under the heading." }),
    defineField({ name: "importIntro", type: "localeText", group: "import" }),
    defineField({ name: "nonFoodIntro", title: "Non-food category description", type: "localeText", group: "import" }),
    defineField({ name: "foodIntro", title: "Food category description", type: "localeText", group: "import" }),


    // We Distribute — empty fields fall back to the Distribution step (Home page → From port to shelf).
    defineField({ name: "distributionHeading", type: "localeString", group: "distribution", description: 'Leave empty for "We Distribute".' }),
    defineField({ name: "distributionTagline", title: "Tagline", type: "localeString", group: "distribution", description: "A short statement under the heading." }),
    defineField({ name: "distributionIntro", type: "localeText", group: "distribution", description: "Leave empty to use the Distribution step's short line (Home page → From port to shelf)." }),
    defineField({ name: "distributionBody", title: "Details", type: "localeText", group: "distribution", description: "Under the map. Leave empty to use the Distribution step's details." }),
    defineField({
      name: "distributionStores",
      title: "Stores on the map",
      type: "array",
      group: "distribution",
      description: "The supermarkets on the map's first five pins, in order: 1 far left, 2 lower middle, 3 top middle, 4 right of centre, 5 bottom right (the sixth pin, top right, is always \"…\" with \"And much more\"). The name shows in the bubble, the logo inside the pin.",
      of: [
        defineArrayMember({
          type: "object",
          name: "mapStore",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "logo", type: "image", description: "Shown inside the pin's circle; a square or round logo works best." }),
            defineField({
              name: "cover",
              title: "Fill the circle",
              type: "boolean",
              initialValue: false,
              description: "For logos on a coloured background: fill the circle edge to edge instead of showing the logo with a white margin.",
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: "distributionFacts",
      title: "Distribution figures",
      type: "array",
      group: "distribution",
      description: "The scale of the operation, shown as figures under the map. A figure with no value is hidden, so fill each one in when you have it.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", description: 'e.g. "4,500 m²", "12", "1,200+". Leave empty to hide this figure.' }),
            defineField({ name: "label", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "note", type: "localeString" }),
          ],
          preview: { select: { title: "label.en", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "distributionPoints",
      title: "Distribution network",
      type: "array",
      group: "distribution",
      description: "Warehouses, depots and distribution partners, shown on a map of Ethiopia with Addis Ababa. Hidden until at least one is added.",
      of: [
        defineArrayMember({
          type: "object",
          name: "distributionPoint",
          fields: [
            defineField({ name: "city", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "kind",
              type: "string",
              options: {
                list: [
                  { title: "Warehouse", value: "warehouse" },
                  { title: "Depot", value: "depot" },
                  { title: "Distribution partner", value: "partner" },
                ],
                layout: "radio",
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "lat", title: "Latitude", type: "number", description: "e.g. 9.03 for Addis Ababa (from Google Maps).", validation: (r) => r.required().min(3).max(15) }),
            defineField({ name: "lng", title: "Longitude", type: "number", description: "e.g. 38.74 for Addis Ababa.", validation: (r) => r.required().min(33).max(48) }),
          ],
          preview: { select: { title: "city", subtitle: "kind" } },
        }),
      ],
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
    defineField({ name: "valueHeading", title: "Heading", type: "localeString", group: "value", description: "The closing band at the end of the page, with a Contact button. Leave empty to hide it." }),
    defineField({ name: "valueBody", title: "Text", type: "localeText", group: "value" }),
    imageWithAlt("valueImage", "Background photo", "value"),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Our Services page" }) },
});


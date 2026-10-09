import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";
import { imageWithAlt, statList, titledTextList } from "./shared";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Our Services page",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "market", title: "Why Ethiopia?", default: true },
    { name: "import", title: "We Import" },
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


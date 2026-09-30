import { PackageIcon } from "@sanity/icons/Package";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt } from "./shared";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Our Services page",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "import", title: "We Import", default: true },
    { name: "produce", title: "We Produce" },
    { name: "export", title: "We Export" },
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
    defineField({ name: "importHeading", type: "localeString", group: "import" }),
    defineField({ name: "importIntro", type: "localeText", group: "import" }),
    defineField({ name: "nonFoodIntro", title: "Non-food category description", type: "localeText", group: "import" }),
    defineField({ name: "foodIntro", title: "Food category description", type: "localeText", group: "import" }),

    // We Produce
    defineField({ name: "produceHeading", type: "localeString", group: "produce" }),
    defineField({ name: "produceIntro", type: "localeText", group: "produce" }),
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
    defineField({
      name: "exportMarkets",
      title: "Target markets",
      type: "array",
      group: "export",
      of: [defineArrayMember({ type: "localeString" })],
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Our Services page" }) },
});


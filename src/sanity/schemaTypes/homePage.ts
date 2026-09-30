import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Snapshot strip" },
    { name: "cards", title: "Entry cards" },
    { name: "commitment", title: "Commitment band" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      type: "localeString",
      group: "hero",
      description: "Text before the \" — \" dash appears as the small line above the headline. Wrap words in *asterisks* to show them in red.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroSubheadline", type: "localeText", group: "hero" }),
    defineField({ name: "heroImage", type: "image", group: "hero", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })] }),
    defineField({
      name: "stats",
      title: "Snapshot stats",
      type: "array",
      group: "stats",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", description: 'e.g. "2014", "170M"', validation: (r) => r.required() }),
            defineField({ name: "label", type: "localeString", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label.en" } },
        }),
      ],
    }),
    defineField({
      name: "entryCards",
      title: "Entry cards",
      description: "Each card links to its section on the Our Services page.",
      type: "array",
      group: "cards",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "entryCard",
          fields: [
            defineField({
              name: "section",
              type: "string",
              options: { list: ["import", "produce", "export"], layout: "radio" },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "description", type: "localeString" }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
            }),
          ],
          preview: { select: { title: "title.en", subtitle: "section", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "commitmentEyebrow", title: "Small label", type: "localeString", group: "commitment" }),
    defineField({ name: "commitmentHeadline", title: "Headline", type: "localeString", group: "commitment", description: "Wrap words in *asterisks* to show them in red." }),
    defineField({ name: "commitmentBody", title: "Paragraph", type: "localeText", group: "commitment" }),
    defineField({
      name: "commitmentImage",
      title: "Photo",
      type: "image",
      group: "commitment",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({
      name: "commitmentPoints",
      title: "Points (red panel)",
      type: "array",
      group: "commitment",
      validation: (r) => r.max(3),
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({
      name: "contactImage",
      title: "Get in touch photo",
      type: "image",
      group: "commitment",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

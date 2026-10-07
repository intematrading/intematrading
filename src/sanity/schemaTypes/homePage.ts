import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";
import { titledTextList } from "./shared";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Snapshot strip" },
    { name: "cards", title: "What we do" },
    { name: "route", title: "From port to shelf" },
    { name: "commitment", title: "Commitment band" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      type: "localeString",
      group: "hero",
      description: "Text before the \" — \" dash appears as the small line above the headline.",
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
            defineField({ name: "note", title: "Short description", type: "localeString" }),
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
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "entryCard",
          fields: [
            defineField({
              name: "section",
              title: "Kind",
              type: "string",
              options: {
                list: [
                  { title: "Food & FMCG distribution", value: "food" },
                  { title: "Non-food & professional personal care", value: "nonFood" },
                  { title: "We Produce", value: "produce" },
                  { title: "We Export", value: "export" },
                  { title: "We Import (both platforms)", value: "import" },
                ],
                layout: "radio",
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "description", type: "localeString" }),
            defineField({
              name: "categories",
              description: "Shown as chips on the card. Leave empty to list the brands or products instead.",
              type: "array",
              of: [defineArrayMember({ type: "localeString" })],
            }),
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
    defineField({
      name: "whatWeDoIntro",
      title: "What we do intro",
      type: "localeText",
      group: "cards",
      description: "Paragraph beside the What we do cards.",
    }),
    defineField({ name: "routeHeading", title: "Heading", type: "localeString", group: "route" }),
    defineField({ name: "routeIntro", title: "Intro", type: "localeText", group: "route" }),
    titledTextList("routeSteps", "Steps", "route"),
    defineField({ name: "commitmentEyebrow", title: "Small label", type: "localeString", group: "commitment" }),
    defineField({ name: "commitmentHeadline", title: "Headline", type: "localeString", group: "commitment" }),
    defineField({ name: "commitmentBody", title: "Paragraph", type: "localeText", group: "commitment" }),
    defineField({ name: "mission", title: "Mission (glass card)", type: "localeText", group: "commitment", description: "Short, Ethiopia-only. Falls back to the About page mission." }),
    defineField({ name: "vision", title: "Vision (glass card)", type: "localeText", group: "commitment", description: "Short, Ethiopia-only. Falls back to the About page vision." }),
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
      title: "Points (glass panel)",
      type: "array",
      group: "commitment",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "commitmentPoint",
          fields: [
            defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Short description", type: "localeText" }),
          ],
          preview: { select: { title: "title.en", subtitle: "description.en" } },
        }),
      ],
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

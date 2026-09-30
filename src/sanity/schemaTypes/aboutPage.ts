import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt, statList, titledTextList } from "./shared";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us page",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    { name: "story", title: "Who we are", default: true },
    { name: "gallery", title: "Gallery" },
    { name: "vision", title: "Vision & mission" },
    { name: "process", title: "Our process" },
    { name: "partners", title: "Partners" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "localeString", group: "story", validation: (r) => r.required() }),
    defineField({ name: "intro", type: "localeText", group: "story" }),
    imageWithAlt("heroImage", "Header photo", "story"),
    defineField({ name: "whoWeAreHeading", type: "localeString", group: "story" }),
    defineField({
      name: "whoWeAre",
      title: "Who we are (paragraphs)",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "localeText" })],
    }),
    statList("stats", "Company snapshot", "story"),
    defineField({
      name: "gallery",
      title: "Image carousel",
      type: "array",
      group: "gallery",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
            }),
            defineField({ name: "caption", type: "localeString", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "caption.en", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "visionHeading", type: "localeString", group: "vision" }),
    defineField({ name: "vision", type: "localeText", group: "vision" }),
    defineField({ name: "missionHeading", type: "localeString", group: "vision" }),
    defineField({ name: "mission", type: "localeText", group: "vision" }),
    defineField({ name: "processHeading", type: "localeString", group: "process" }),
    defineField({ name: "processIntro", type: "localeText", group: "process" }),
    titledTextList("processSteps", "Process steps", "process"),
    defineField({ name: "keysHeading", title: "Keys to success heading", type: "localeString", group: "process" }),
    defineField({
      name: "keysToSuccess",
      title: "Keys to success",
      type: "array",
      group: "process",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({ name: "partnersHeading", type: "localeString", group: "partners" }),
    defineField({
      name: "partnersIntro",
      type: "localeText",
      group: "partners",
      description: "The partner logos themselves come from the Imported brands list.",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Us page" }) },
});

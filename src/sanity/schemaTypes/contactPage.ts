import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./shared";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  description: "Contact details themselves live in Site settings.",
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
    defineField({ name: "formHeading", type: "localeString" }),
    defineField({ name: "formIntro", type: "localeText" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});

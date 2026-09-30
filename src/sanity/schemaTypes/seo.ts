import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "localeString",
      description: "Shown in the browser tab and search results (~60 characters).",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "localeText",
      description: "Shown under the title in search results (~155 characters).",
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "1200 × 630 recommended.",
    }),
  ],
});

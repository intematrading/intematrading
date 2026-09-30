import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./shared";

export const exportItem = defineType({
  name: "exportItem",
  title: "Export brand",
  type: "document",
  description: "A registered export brand (Seedcup, Bella…), shown under We Export.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "localeString" }),
    imageWithAlt("image", "Product photo"),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "description.en", media: "image" } },
});

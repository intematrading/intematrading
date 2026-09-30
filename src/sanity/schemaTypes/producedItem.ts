import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./shared";

export const producedItem = defineType({
  name: "producedItem",
  title: "Produced product",
  type: "document",
  description: "One of our own products (Abay candles, the legacy soap line…), shown under We Produce.",
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "category", type: "localeString", description: 'Small label, e.g. "Candles" or "Soap".' }),
    defineField({ name: "description", type: "localeString" }),
    imageWithAlt("image", "Product photo"),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name.en", subtitle: "category.en", media: "image" } },
});

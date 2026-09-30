import { TagIcon } from "@sanity/icons/Tag";
import { defineArrayMember, defineField, defineType } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Imported brand",
  type: "document",
  icon: TagIcon,
  description: "A brand partner shown in the We Import logo grid.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Food", value: "food" },
          { title: "Non-food", value: "nonFood" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subBrands",
      title: "Sub-brands",
      description: 'Optional, e.g. Reckitt → "Durex", "KY", "Veet".',
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "description", type: "localeString", description: 'Short line under the name, e.g. "Powdered milk".' }),
    defineField({
      name: "image",
      title: "Product photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "Transparent PNG or SVG. Without a logo, the name is shown instead.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});

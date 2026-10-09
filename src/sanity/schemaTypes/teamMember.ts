import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "role", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Sales & marketing", value: "sales" },
          { title: "Administration & finance", value: "admin" },
          { title: "Operations", value: "operations" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "bio", type: "localeText" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name.en", subtitle: "role.en", media: "photo" } },
});

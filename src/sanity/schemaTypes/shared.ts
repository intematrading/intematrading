import { defineArrayMember, defineField } from "sanity";

export const imageWithAlt = (name: string, title?: string, group?: string) =>
  defineField({
    name,
    title,
    group,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
  });

export const statList = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    group,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "stat",
        fields: [
          defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          defineField({ name: "label", type: "localeString", validation: (r) => r.required() }),
          defineField({ name: "note", type: "localeString" }),
        ],
        preview: { select: { title: "value", subtitle: "label.en" } },
      }),
    ],
  });

export const titledTextList = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title,
    group,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "titledText",
        fields: [
          defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
          defineField({ name: "body", type: "localeText" }),
        ],
        preview: { select: { title: "title.en", subtitle: "body.en" } },
      }),
    ],
  });

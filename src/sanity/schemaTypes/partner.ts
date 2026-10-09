import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner company",
  type: "document",
  icon: CaseIcon,
  description: "A company shown in the partner logo strip (Home and About). Separate from imported brands, so a partner needs no product.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      type: "image",
      description: "Transparent PNG or SVG. Without a logo, the name is shown instead.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "localeString" })],
    }),
    defineField({ name: "website", type: "url", description: "Optional. The logo links here." }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "website", media: "logo" } },
});

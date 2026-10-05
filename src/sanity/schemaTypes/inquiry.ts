import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

// Written by the contact form API route; read-only for editors.
export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  icon: CommentIcon,
  readOnly: true,
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "inquiryType", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "locale", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: { select: { title: "name", subtitle: "email", date: "submittedAt" } },
});

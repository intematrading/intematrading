import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings & contact details",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "companyName", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "address", type: "localeString", description: "Street / sub-city address." }),
    defineField({ name: "poBox", title: "P.O. Box", type: "localeString" }),
    defineField({ name: "email", title: "Main email", type: "string", validation: (r) => r.required().email() }),
    defineField({
      name: "otherEmails",
      title: "More email addresses",
      description: "Listed under the main email on the Contact page and in the footer.",
      type: "array",
      of: [defineArrayMember({ type: "string", validation: (r) => r.email() })],
    }),
    defineField({ name: "website", type: "url" }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "inquiryRecipient",
      title: "Inquiry form recipient",
      type: "string",
      description: "Where contact-form submissions are emailed. Defaults to the email above.",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      description: "Shown in the footer. Leave empty to hide.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "WhatsApp (https://wa.me/<number>)", value: "whatsapp" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "seo", title: "Default SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings & contact details" }) },
});

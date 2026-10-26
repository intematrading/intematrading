import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./shared";

// Texts for the Contact page (header, form, map) and the footer's Get in touch band.
// The contact details themselves (address, phone, email) live in Site settings.
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Header", default: true },
    { name: "form", title: "Inquiry form" },
    { name: "map", title: "Map" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Page title", type: "localeString", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "eyebrow", title: "Header eyebrow", type: "localeString", group: "hero", description: "Short label above the title. Leave empty for the default." }),
    defineField({ name: "intro", title: "Header intro", type: "localeText", group: "hero", description: "Also shown in the footer's Get in touch band." }),
    imageWithAlt("heroImage", "Header photo", "hero"),
    defineField({ name: "formHeading", title: "Form heading", type: "localeString", group: "form", description: "Above the inquiry form." }),
    defineField({ name: "formIntro", title: "Form intro", type: "localeText", group: "form" }),
    defineField({ name: "mapHeading", title: "Map heading", type: "localeString", group: "map" }),
    defineField({ name: "mapIntro", title: "Map intro", type: "localeText", group: "map" }),
    defineField({
      name: "mapLocation",
      title: "Map location",
      type: "string",
      group: "map",
      description: "Search query sent to Google Maps (e.g. 'Bole Sub City, Addis Ababa, Ethiopia'). Defaults to the address in Site settings.",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});

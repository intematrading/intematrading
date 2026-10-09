import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

// Texts for the Contact page (header intro, inquiry form) and the footer's Get in touch band.
// The contact details themselves live in Site settings.
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact form",
  type: "document",
  icon: EnvelopeIcon,
  description: "Contact details themselves live in Site settings.",
  fields: [
    defineField({ name: "formHeading", title: "Form heading", type: "localeString", description: "Above the inquiry form on the Contact page." }),
    defineField({ name: "formIntro", title: "Form intro", type: "localeText" }),
    defineField({ name: "intro", title: "Get in touch text", type: "localeText", description: "The Contact page intro, also shown in the footer's Get in touch band." }),
  ],
  preview: { prepare: () => ({ title: "Contact form" }) },
});

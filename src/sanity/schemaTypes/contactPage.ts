import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";

// Texts for the inquiry form in the footer and the "Get in touch" panels.
// The contact details themselves live in Site settings.
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact form",
  type: "document",
  icon: EnvelopeIcon,
  description: "Contact details themselves live in Site settings.",
  fields: [
    defineField({ name: "formHeading", title: "Form heading", type: "localeString", description: "Above the inquiry form in the footer." }),
    defineField({ name: "formIntro", title: "Form intro", type: "localeText" }),
    defineField({ name: "intro", title: "Get in touch text", type: "localeText", description: 'Shown in the "Get in touch" panels at the end of About and Our Services.' }),
  ],
  preview: { prepare: () => ({ title: "Contact form" }) },
});

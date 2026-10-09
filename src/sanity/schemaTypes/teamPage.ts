import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";
import { imageWithAlt, statList, titledTextList } from "./shared";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "leadership", title: "Leadership", default: true },
    { name: "heads", title: "Department heads" },
    { name: "ambassador", title: "Brand ambassador" },
    { name: "more", title: "Facts, departments & training" },
    { name: "partner", title: "Partner call-to-action" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "localeString", group: "leadership", validation: (r) => r.required() }),
    defineField({
      name: "eyebrow",
      title: "Header eyebrow",
      type: "localeString",
      group: "leadership",
      description: "Short label above the page title. Leave empty to use the default.",
    }),
    defineField({ name: "intro", type: "localeText", group: "leadership" }),
    imageWithAlt("heroImage", "Header photo", "leadership"),
    defineField({ name: "leadershipHeading", type: "localeString", group: "leadership" }),
    defineField({ name: "leadershipIntro", type: "localeText", group: "leadership" }),
    defineField({ name: "headsHeading", title: "Heading", type: "localeString", group: "heads" }),
    defineField({ name: "headsIntro", title: "Intro", type: "localeText", group: "heads" }),
    defineField({ name: "ambassadorName", type: "localeString", group: "ambassador" }),
    defineField({ name: "ambassadorRole", type: "localeString", group: "ambassador" }),
    defineField({ name: "ambassadorBio", title: "Ambassador description", type: "localeText", group: "ambassador" }),
    imageWithAlt("ambassadorImage", "Ambassador photo", "ambassador"),
    imageWithAlt("ambassadorBackground", "Panel background photo", "ambassador"),
    statList("facts", "Team facts", "more"),
    titledTextList("departments", "Departments", "more"),
    defineField({ name: "trainingHeading", type: "localeString", group: "more" }),
    defineField({ name: "training", type: "localeText", group: "more" }),
    defineField({ name: "partnerHeading", type: "localeString", group: "partner" }),
    defineField({ name: "partnerBody", type: "localeText", group: "partner" }),
    imageWithAlt("partnerImage", "Photo", "partner"),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Team page" }) },
});

import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("INTEMA content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Home"),
              singleton(S, "aboutPage", "About Us"),
              singleton(S, "servicesPage", "Our Services"),
              singleton(S, "teamPage", "Team"),
              singleton(S, "contactPage", "Contact form"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("brand").title("Imported brands"),
      S.documentTypeListItem("producedItem").title("Produced products"),
      S.documentTypeListItem("exportItem").title("Export brands"),
      S.documentTypeListItem("teamMember").title("Team members"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      singleton(S, "siteSettings", "Site settings & contact details"),
      S.documentTypeListItem("inquiry").title("Inquiries (from contact form)"),
    ]);

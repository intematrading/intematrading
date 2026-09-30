import { defineField, defineType } from "sanity";

// Field-level localisation: one document holds both languages, so editors
// manage English and Amharic side by side in a single entry.
const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "am", title: "Amharic (አማርኛ)", isDefault: false },
] as const;

function localeFields(type: "string" | "text") {
  return languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type,
      ...(type === "text" ? { rows: 4 } : {}),
      validation: (rule) =>
        lang.isDefault
          ? rule.required()
          : rule.required().warning("Amharic translation missing — English will be shown."),
    }),
  );
}

export const localeString = defineType({
  name: "localeString",
  title: "Localised text",
  type: "object",
  options: { columns: 2 },
  fields: localeFields("string"),
});

export const localeText = defineType({
  name: "localeText",
  title: "Localised paragraph",
  type: "object",
  fields: localeFields("text"),
});

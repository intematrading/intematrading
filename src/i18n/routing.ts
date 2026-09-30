import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "am"],
  defaultLocale: "en",
  localePrefix: "always",
  // First visit with no locale in the URL: use the NEXT_LOCALE cookie, then
  // the Accept-Language header, then fall back to English.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

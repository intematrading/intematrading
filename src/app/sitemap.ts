import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedPath, SITE_URL } from "@/lib/metadata";

// Add each page here as it's built.
const pages = ["/", "/about", "/services", "/team"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([l, p]) => [l, `${SITE_URL}${p}`]),
        ),
      },
    })),
  );
}

import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Anton, Archivo_Black, Noto_Sans_Ethiopic } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TawkChat } from "@/components/TawkChat";
import { routing } from "@/i18n/routing";
import { getSiteSettings, tr } from "@/lib/content";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

// Type roles (see globals.css):
//   headers → Anton
//   titles  → Arial Black (system font; Archivo Black stands in where it's missing)
//   body    → SF Pro Text (system font on Apple devices; not licensed for web
//             embedding, so other platforms get their own system UI font)
// None of these cover Ethiopic: Amharic body text uses Noto Sans Ethiopic,
// and Amharic headings/titles use Nokia Pure Headline (below).
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
// Not preloaded: only downloaded on devices without Arial Black.
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
  preload: false,
});
// Nokia Pure Headline Bold (Dalton Maag for Nokia) for Amharic headings and
// titles. The file is subset to Ethiopic code points, so Latin words and
// numbers in those headings keep Anton / Arial Black, and English pages never
// download it.
// LICENSE: the font says "© 2011 Nokia. All rights reserved" with no licence
// grant; confirm web-font permission before deploying.
const nokia = localFont({
  src: [{ path: "../../../fonts/NokiaPureHeadline-Bold-Ethiopic.woff2", weight: "700" }],
  variable: "--font-nokia",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+1200-139F, U+2D80-2DDF, U+AB00-AB2F, U+1E7E0-1E7FF" }],
});
const ethiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const settings = await getSiteSettings();
  const siteName = tr(settings.companyName, locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: siteName, template: `%s | ${siteName}` },
    description: tr(settings.seo?.description, locale) || undefined,
    applicationName: siteName,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [settings, t] = await Promise.all([getSiteSettings(), getTranslations("Common")]);

  return (
    <html lang={locale} className={`${anton.variable} ${archivoBlack.variable} ${nokia.variable} ${ethiopic.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only z-50 bg-paper px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 font-semibold text-black"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader companyName={tr(settings.companyName, locale)} />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter settings={settings} locale={locale} />
          <TawkChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

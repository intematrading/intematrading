import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Anton, Noto_Sans_Ethiopic, Poppins } from "next/font/google";
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
//   titles  → Poppins Bold
//   body    → SF Pro Text (system font on Apple devices; not licensed for web
//             embedding, so other platforms get their own system UI font)
// None of these cover Ethiopic, so Noto Sans Ethiopic is in every font stack
// for the occasional Amharic word in the copy (e.g. "Abay (አባይ ሻማ)").
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const poppins = Poppins({ weight: "700", subsets: ["latin"], variable: "--font-poppins", display: "swap" });
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
    // The "Int" mark from the logo (public/favicon.png)
    icons: { icon: { url: "/favicon.png", type: "image/png" }, apple: "/favicon.png" },
  };
}

export default async function LocaleLayout({ children, drawer, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [settings, t] = await Promise.all([getSiteSettings(), getTranslations("Common")]);

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${anton.variable} ${poppins.variable} ${ethiopic.variable} antialiased`}>
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
          {/* About, Our Services and Contact open in a drawer over the home page */}
          {drawer}
          <TawkChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

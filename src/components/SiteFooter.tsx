import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getContactPage, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";
import { SocialLinks } from "./SocialLinks";

const serviceKeys = ["serviceFood", "serviceNonFood", "serviceProduce", "serviceExport", "serviceLogistics", "serviceMarket"] as const;

/**
 * Dark footer: a Get in touch band (heading, the Contact page intro and a
 * Contact CTA), then
 * four columns (logo, short description and social links; useful links;
 * services; contact details) and the copyright line.
 */
export async function SiteFooter({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const [t, nav, home, common, contactPage] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Home"),
    getTranslations("Common"),
    getContactPage(),
  ]);
  const companyName = tr(settings.companyName, locale);
  const headingClass = "font-title-heading text-base tracking-wider text-paper";
  const linkClass = "text-paper/80 transition-colors hover:text-paper";

  return (
    <footer className="on-dark bg-steel-600 text-paper">
      {/* Get in touch: heading and the Contact page intro, with the Contact CTA */}
      <Container className="flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow onDark>{common("contactUs")}</Eyebrow>
          <p className="font-display-heading mt-4 text-4xl sm:text-5xl">{home("getInTouch").replace(/\*/g, "")}</p>
          {contactPage.intro && <p className="mt-4 max-w-2xl text-paper/80 sm:text-lg">{tr(contactPage.intro, locale)}</p>}
        </div>
        <ButtonLink href="/contact" variant="white" className="shrink-0 self-start lg:self-auto">
          {common("contactUs")}
        </ButtonLink>
      </Container>

      <div className="border-t border-white/15">
        <Container className="grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-12 lg:gap-10">
          {/* Logo, description, social links */}
          <div className="lg:col-span-4">
            <Logo alt={companyName} tone="white" className="h-16 w-auto" />
            <p className="mt-6 max-w-xs leading-relaxed text-paper/80">{t("about")}</p>
            <SocialLinks links={settings.socialLinks} onDark className="mt-6" />
          </div>

          <nav aria-label={t("links")} className="lg:col-span-2">
            <h2 className={headingClass}>{t("links")}</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("services")} className="lg:col-span-3">
            <h2 className={headingClass}>{t("services")}</h2>
            <ul className="mt-5 space-y-3">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link href="/services" className={linkClass}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>{t("contact")}</h2>
            <address className="mt-5 space-y-5 not-italic">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                  <Mail aria-hidden="true" className="size-4 text-paper/80" />
                  {t("emailLabel")}
                </p>
                <a href={`mailto:${settings.email}`} className={`mt-1 block break-all ${linkClass}`}>
                  {settings.email}
                </a>
              </div>
              {settings.phones?.length ? (
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                    <Phone aria-hidden="true" className="size-4 text-paper/80" />
                    {t("phoneLabel")}
                  </p>
                  <ul className="mt-1 space-y-0.5 tabular-nums">
                    {settings.phones.slice(0, 3).map((phone) => (
                      <li key={phone}>
                        <a href={`tel:${phone.replace(/\s+/g, "")}`} className={`whitespace-nowrap ${linkClass}`}>
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {(settings.address || settings.poBox) && (
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                    <MapPin aria-hidden="true" className="size-4 text-paper/80" />
                    {t("addressLabel")}
                  </p>
                  <p className="mt-1 text-paper/80">
                    {settings.address && <span className="block">{tr(settings.address, locale)}</span>}
                    {settings.poBox && <span className="block">{tr(settings.poBox, locale)}</span>}
                  </p>
                </div>
              )}
            </address>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/15">
        <Container className="py-6">
          <p className="text-sm text-paper/80">
            © {new Date().getFullYear()} {companyName} {t("rights")}
          </p>
        </Container>
      </div>
    </footer>
  );
}

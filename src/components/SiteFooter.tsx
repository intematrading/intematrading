import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { getContactPage, tr } from "@/lib/content";
import { InquiryForm } from "./InquiryForm";
import { Logo } from "./Logo";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks, SocialRail } from "./SocialLinks";

/**
 * Footer, and the site's contact section (#contact, "Contact" in the side
 * nav): the inquiry form on the left, logo and contact details on the right,
 * and on desktop the social links as a vertical rail on the right edge
 * (mirroring the side nav; a row under the contact details on phones). Exactly one screen tall on desktop.
 */
export async function SiteFooter({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const [contactPage, t, contact] = await Promise.all([getContactPage(), getTranslations("Footer"), getTranslations("Contact")]);
  const companyName = tr(settings.companyName, locale);
  const headingClass = "label-caps text-black";
  const iconClass = "mt-0.5 size-4 shrink-0 text-red";

  return (
    <footer id="contact" data-nav-section="/contact" className="relative isolate flex flex-col overflow-hidden border-t border-line bg-paper text-muted lg:h-svh lg:min-h-[40rem]">
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-14 px-4 pt-20 pb-14 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-[var(--rail-pad)] lg:pt-8 lg:pb-[4.5rem]">
        {/* Logo, contact details and (phones) social links: above the form
            on phones, to its right on desktop */}
        <div className="flex flex-col gap-10 lg:col-span-4">
          <Logo alt={companyName} className="h-24 w-auto self-start sm:h-28" />

          <div>
            <h2 className={headingClass}>{t("contact")}</h2>
            <address className="mt-5 flex flex-col gap-4 text-sm not-italic">
              {(settings.address || settings.poBox) && (
                <p className="flex gap-3">
                  <MapPin aria-hidden="true" className={iconClass} />
                  <span>
                    {settings.address && <span className="block">{tr(settings.address, locale)}</span>}
                    {settings.poBox && <span className="block">{tr(settings.poBox, locale)}</span>}
                  </span>
                </p>
              )}
              <p className="flex gap-3">
                <Mail aria-hidden="true" className={iconClass} />
                <span className="sr-only">{t("email")}: </span>
                <a href={`mailto:${settings.email}`} className="break-all transition-colors hover:text-red-ink">
                  {settings.email}
                </a>
              </p>
              {settings.phones?.length ? (
                <div className="flex gap-3">
                  <Phone aria-hidden="true" className={iconClass} />
                  <span className="sr-only">{t("phone")}: </span>
                  <ul className="flex flex-col gap-1 tabular-nums">
                    {settings.phones.map((phone) => (
                      <li key={phone}>
                        <a href={`tel:${phone.replace(/\s+/g, "")}`} className="whitespace-nowrap transition-colors hover:text-red-ink">
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </address>
          </div>

          {settings.socialLinks?.length ? (
            <div className="lg:hidden">
              <h2 className={headingClass}>{t("follow")}</h2>
              <SocialLinks links={settings.socialLinks} className="mt-4" />
            </div>
          ) : null}
        </div>

        {/* Inquiry form */}
        <div className="rounded-[1.75rem] bg-steel-100 p-6 ring-1 ring-black/5 sm:rounded-[2rem] sm:p-10 lg:order-first lg:col-span-8 lg:p-8 xl:p-10 lg:[@media(max-height:800px)]:py-6">
          <SectionHeading eyebrow={contact("formEyebrow")} size="band">
            {tr(contactPage.formHeading, locale)}
          </SectionHeading>
          {contactPage.formIntro && <p className="mt-4 max-w-2xl text-muted">{tr(contactPage.formIntro, locale)}</p>}
          <div className="mt-6 lg:[@media(max-height:800px)]:mt-5">
            <InquiryForm />
          </div>
        </div>
      </div>

      <SocialRail
        links={settings.socialLinks}
        label={t("follow")}
        className="absolute top-1/2 right-4 hidden -translate-y-1/2 lg:block xl:right-6"
      />

      <div className="relative border-t border-line lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-7 text-center sm:px-6 lg:px-[var(--rail-pad)] lg:py-5">
          <p className="text-xs">
            © {new Date().getFullYear()} {companyName} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

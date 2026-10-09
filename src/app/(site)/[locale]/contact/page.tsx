import { ExternalLink, Mail, MapPin, Phone, Share2 } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { IconBox } from "@/components/IconBox";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { placeholders } from "@/content/placeholders";
import { getContactPage, getSiteSettings, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [settings, t] = await Promise.all([getSiteSettings(), getTranslations({ locale, namespace: "Contact" })]);
  return buildMetadata({ locale, path: "/contact", siteName: tr(settings.companyName, locale), fallbackTitle: t("title") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, settings, t] = await Promise.all([getContactPage(), getSiteSettings(), getTranslations("Contact")]);
  const cardClass = "flex gap-5 rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-black/5";
  const labelClass = "label-caps text-red-ink";
  // Map: the office address (English, for Google), no API key needed.
  const mapQuery = encodeURIComponent([settings.address?.en, "Ethiopia"].filter(Boolean).join(", ") || "Addis Ababa, Ethiopia");

  return (
    <div className="flex flex-col bg-paper">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={tr(page.intro, locale)}
        placeholder={placeholders.contactBand}
        locale={locale}
      />

      {/* ── Contact details and the inquiry form ──────────────────── */}
      <section aria-labelledby="details-heading" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="details-heading" eyebrow={t("detailsEyebrow")} size="band">
              {t("detailsHeading")}
            </SectionHeading>
            <address className="mt-10 grid gap-3 not-italic sm:gap-4">
              {(settings.address || settings.poBox) && (
                <div className={cardClass}>
                  <IconBox icon={MapPin} />
                  <div>
                    <p className={labelClass}>{t("address")}</p>
                    {settings.address && <p className="mt-2 text-ink">{tr(settings.address, locale)}</p>}
                    {settings.poBox && <p className="text-ink">{tr(settings.poBox, locale)}</p>}
                  </div>
                </div>
              )}
              <div className={cardClass}>
                <IconBox icon={Mail} />
                <div className="min-w-0">
                  <p className={labelClass}>{t("email")}</p>
                  <a href={`mailto:${settings.email}`} className="mt-2 block font-semibold break-all text-ink hover:text-red-ink hover:underline">
                    {settings.email}
                  </a>
                </div>
              </div>
              {settings.phones?.length ? (
                <div className={cardClass}>
                  <IconBox icon={Phone} />
                  <div>
                    <p className={labelClass}>{t("phone")}</p>
                    <ul className="mt-1 tabular-nums">
                      {settings.phones.map((phone) => (
                        <li key={phone}>
                          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="inline-block py-1 font-semibold whitespace-nowrap text-ink hover:text-red-ink hover:underline">
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
              {settings.socialLinks?.length ? (
                <div className={cardClass}>
                  <IconBox icon={Share2} />
                  <div>
                    <p className={labelClass}>{t("follow")}</p>
                    <SocialLinks links={settings.socialLinks} className="mt-3" />
                  </div>
                </div>
              ) : null}
            </address>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div id="inquiry" className="scroll-mt-24 rounded-[1.75rem] bg-paper p-6 shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] sm:p-10">
              <SectionHeading eyebrow={t("formEyebrow")} size="band">
                {tr(page.formHeading, locale)}
              </SectionHeading>
              {page.formIntro && <p className="mt-4 max-w-2xl text-muted">{tr(page.formIntro, locale)}</p>}
              <div className="mt-8">
                <InquiryForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Map ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="map-heading">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="map-heading" eyebrow={t("mapEyebrow")} size="band">
              {t("mapHeading")}
            </SectionHeading>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-red-ink hover:underline"
            >
              {t("openMap")}
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </Reveal>
        </Container>
        {/* Full width, square corners */}
        <Reveal className="mt-8">
          <iframe
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[24rem] w-full bg-steel-200 sm:h-[32rem]"
          />
        </Reveal>
      </section>
    </div>
  );
}

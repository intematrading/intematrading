import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { heroPlaceholders } from "@/content/placeholders";
import { Testimonials } from "@/components/Testimonials";
import { getContactPage, getSiteSettings, getTestimonials, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  return buildMetadata({
    locale,
    path: "/contact",
    seo: page.seo,
    siteName: tr(settings.companyName, locale),
    fallbackTitle: tr(page.title, locale),
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, settings, testimonials, t] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getTestimonials(),
    getTranslations("Contact"),
  ]);
  const cardClass = "flex gap-4 bg-paper p-6 shadow-sm ring-1 ring-line";
  const iconClass = "mt-0.5 size-6 shrink-0 text-red";
  const labelClass = "label-caps text-ink";

  return (
    <>
      <PageHero
        eyebrow={tr(page.eyebrow, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.contact}
        locale={locale}
      />

      <section className="texture-paper py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          {/* Contact details */}
          <div className="lg:col-span-4">
            <SectionHeading size="band">{t("details")}</SectionHeading>
            <address className="mt-8 grid gap-4 not-italic">
              {(settings.address || settings.poBox) && (
                <div className={cardClass}>
                  <MapPin aria-hidden="true" className={iconClass} />
                  <div>
                    <p className={labelClass}>{t("address")}</p>
                    {settings.address && <p className="mt-2 text-ink">{tr(settings.address, locale)}</p>}
                    {settings.poBox && <p className="text-ink">{tr(settings.poBox, locale)}</p>}
                  </div>
                </div>
              )}
              <div className={cardClass}>
                <Mail aria-hidden="true" className={iconClass} />
                <div>
                  <p className={labelClass}>{t("email")}</p>
                  <a href={`mailto:${settings.email}`} className="mt-2 block font-semibold break-all text-ink hover:text-red-ink hover:underline">
                    {settings.email}
                  </a>
                </div>
              </div>
              {settings.phones?.length ? (
                <div className={cardClass}>
                  <Phone aria-hidden="true" className={iconClass} />
                  <div>
                    <p className={labelClass}>{t("phone")}</p>
                    <ul className="mt-1">
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
            </address>
            {settings.socialLinks?.length ? (
              <div className={`${cardClass} mt-4`}>
                <Share2 aria-hidden="true" className={iconClass} />
                <div>
                  <p className={labelClass}>{t("followUs")}</p>
                  <SocialLinks links={settings.socialLinks} className="mt-3" />
                </div>
              </div>
            ) : null}
          </div>

          {/* Inquiry form */}
          <div id="inquiry" className="relative scroll-mt-[calc(var(--spacing-nav)+1rem)] bg-paper p-6 shadow-sm ring-1 ring-line sm:p-10 lg:col-span-8">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-red" />
            <h2 className="font-display-heading text-4xl text-black sm:text-5xl">{tr(page.formHeading, locale)}</h2>
            {page.formIntro && <p className="mt-4 max-w-2xl text-muted">{tr(page.formIntro, locale)}</p>}
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
        </Container>
      </section>

      <Testimonials items={testimonials} locale={locale} tone="dark" />
    </>
  );
}

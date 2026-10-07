import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAboutPage, getBrands, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { Marquee } from "./Marquee";
import { PartnerLogo } from "./PartnerLogo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * "Our partners": heading, intro and a Become-a-partner CTA, then a looping
 * strip of the brand logos (About). Text: About page → Partners.
 */
export async function Partners({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [page, t] = await Promise.all([getAboutPage(), getTranslations("About")]);
  return (
    <section aria-labelledby="partners-heading" className={className}>
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading id="partners-heading" eyebrow={t("partnersEyebrow")}>
              {tr(page.partnersHeading, locale)}
            </SectionHeading>
            {page.partnersIntro && <p className="mt-6 text-muted sm:text-lg">{tr(page.partnersIntro, locale)}</p>}
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink href="/contact?type=brand" variant="red">
              {t("partnerCta")}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
      <PartnerStrip locale={locale} className="mt-12" />
    </section>
  );
}

/** Just the looping strip of partner (brand) logos. */
export async function PartnerStrip({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [brands, t] = await Promise.all([getBrands(), getTranslations("About")]);
  if (!brands.length) return null;
  return (
    <div className={className}>
      <Marquee label={t("partnersLabel")} seconds={brands.length * 3.5} feather={12}>
        {brands.map((brand) => (
          <PartnerLogo key={brand._id} brand={brand} locale={locale} />
        ))}
      </Marquee>
    </div>
  );
}

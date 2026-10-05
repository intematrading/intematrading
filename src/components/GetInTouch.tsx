import { Handshake } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { placeholders } from "@/content/placeholders";
import type { Locale } from "@/i18n/routing";
import { getContactPage, getHomePage, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/**
 * "Get in touch" band: a full-bleed photo with a near-black fade, and a single Contact CTA.
 * Used at the end of the About and Our Services drawer pages; the photo is the Home page's
 * "Get in touch photo" in Sanity, the text the Contact page intro.
 */
export async function GetInTouch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [home, contactPage, t, common] = await Promise.all([
    getHomePage(),
    getContactPage(),
    getTranslations("Home"),
    getTranslations("Common"),
  ]);

  return (
    <section aria-labelledby="contact-heading" className={`on-dark relative isolate overflow-hidden text-paper ${className}`}>
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 -z-20">
        <PhotoFrame
          image={home.contactImage}
          placeholder={placeholders.contactBand}
          locale={locale}
          width={1920}
          height={1080}
          sizes="100vw"
          icon={Handshake}
          quality={90}
        />
      </div>
      {/* Even near-black tint on phones; a fade from the left on desktop that
          keeps the text readable and leaves the right side of the photo clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/55 lg:bg-transparent lg:bg-linear-to-r lg:from-black/75 lg:from-30% lg:via-black/45 lg:via-55% lg:to-black/0"
      />
      <Container className="py-12 sm:py-16">
        <div className="lg:max-w-[45%]">
          <SectionHeading id="contact-heading" eyebrow={common("contactUs")} onDark>
            {t("getInTouch")}
          </SectionHeading>
          {contactPage.intro && <p className="mt-5 max-w-md text-paper/90">{tr(contactPage.intro, locale)}</p>}
          <ButtonLink href="/#contact" variant="redOnDark" className="mt-8">
            {common("contactUs")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

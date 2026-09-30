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
 * Black "Get in touch" band with a slanted photo and a single Contact CTA.
 * Used on Home and at the end of Our Services; the photo is the Home page's
 * "Get in touch photo" in Sanity, the text the Contact page intro.
 */
export async function GetInTouch({ locale }: { locale: Locale }) {
  const [home, contactPage, t, common] = await Promise.all([
    getHomePage(),
    getContactPage(),
    getTranslations("Home"),
    getTranslations("Common"),
  ]);

  return (
    <section aria-labelledby="contact-heading" className="on-dark texture-dark relative overflow-hidden text-paper">
      {/* Desktop: red leading edge behind the slanted photo */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[46%] bg-red [clip-path:polygon(26%_0,100%_0,100%_100%,0_100%)] lg:block" />
      <Container className="relative py-16 sm:py-24">
        <div className="lg:max-w-[48%]">
          <SectionHeading id="contact-heading" eyebrow={common("contactUs")} onDark>
            {t("getInTouch")}
          </SectionHeading>
          {contactPage.intro && <p className="mt-5 max-w-md text-smoke">{tr(contactPage.intro, locale)}</p>}
          <ButtonLink href="/contact" variant="redOnDark" className="mt-8 ms-2">
            {common("contactUs")}
          </ButtonLink>
        </div>
      </Container>
      {/* One photo: a strip under the text on phones and tablets, the slanted right-hand panel on desktop. */}
      <div className="relative h-52 sm:h-64 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[45%]">
        <div aria-hidden="true" className="absolute inset-0 bg-red [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] lg:hidden" />
        <div className="absolute inset-0 [clip-path:polygon(0_26%,100%_4%,100%_100%,0_100%)] lg:[clip-path:polygon(27%_0,100%_0,100%_100%,1.5%_100%)]">
          <PhotoFrame
            image={home.contactImage}
            placeholder={placeholders.contactBand}
            locale={locale}
            width={900}
            height={600}
            sizes="(min-width: 1024px) 45vw, 100vw"
            icon={Handshake}
          />
        </div>
      </div>
    </section>
  );
}

import { Handshake } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";
import { SectionHeading } from "./SectionHeading";

/** Red call-to-action band with white text and a slanted photo (black leading edge). */
export function PartnerCta({
  heading,
  body,
  cta,
  href,
  image,
  placeholder,
  locale,
}: {
  heading: string;
  body?: string;
  cta: string;
  href: string;
  image?: SanityImage;
  placeholder?: Placeholder;
  locale: Locale;
}) {
  return (
    <section aria-labelledby="partner-heading" className="on-red relative overflow-hidden bg-red text-paper">
      {/* Desktop: black leading edge behind the slanted photo */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[40%] bg-black [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)] md:block" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-2xl md:max-w-[55%]">
          <SectionHeading id="partner-heading" onDark>
            {heading}
          </SectionHeading>
          {body && <p className="mt-5 text-lg font-medium text-paper">{body}</p>}
          <ButtonLink href={href} variant="blackOnRed" className="mt-8 ms-2">
            {cta}
          </ButtonLink>
        </div>
      </Container>
      {/* One photo: a strip under the text on phones, the slanted right-hand panel from md up. */}
      <div className="relative h-44 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[39%]">
        <div aria-hidden="true" className="absolute inset-0 bg-black [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] md:hidden" />
        <div className="absolute inset-0 [clip-path:polygon(0_26%,100%_4%,100%_100%,0_100%)] md:[clip-path:polygon(31%_0,100%_0,100%_100%,1.5%_100%)]">
          <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={900} height={600} sizes="(min-width: 768px) 40vw, 100vw" icon={Handshake} />
        </div>
      </div>
    </section>
  );
}

import { Handshake } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { Accent } from "./Accent";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { PhotoFrame } from "./PhotoFrame";

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
  const photo = (
    <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={900} height={600} sizes="(min-width: 768px) 40vw, 100vw" icon={Handshake} />
  );
  return (
    <section aria-labelledby="partner-heading" className="on-red relative overflow-hidden bg-red text-paper">
      {/* Desktop: slanted photo with a black leading edge */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[40%] bg-black [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)] md:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[39%] [clip-path:polygon(31%_0,100%_0,100%_100%,1.5%_100%)] md:block">{photo}</div>
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-2xl md:max-w-[55%]">
          <h2 id="partner-heading" className="font-display-heading text-5xl sm:text-6xl">
            <Accent text={heading} className="text-paper" />
          </h2>
          {body && <p className="mt-5 text-lg font-medium text-paper">{body}</p>}
          <ButtonLink href={href} variant="blackOnRed" className="mt-8 ms-2">
            {cta}
          </ButtonLink>
        </div>
      </Container>
      {/* Phones: photo strip under the text */}
      <div className="relative h-44 md:hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-black [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-0 [clip-path:polygon(0_26%,100%_4%,100%_100%,0_100%)]">{photo}</div>
      </div>
    </section>
  );
}

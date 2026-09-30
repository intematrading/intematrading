import { ImageIcon } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { PhotoFrame } from "./PhotoFrame";

/**
 * Black page-header band for every inner page, with a slanted photo on the
 * right (a strip under the title on phones) edged in brand red.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  placeholder,
  locale,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: SanityImage;
  placeholder?: Placeholder;
  locale: Locale;
}) {
  return (
    <section className="on-dark texture-dark relative overflow-hidden text-paper">
      {/* Desktop: red leading edge behind the slanted photo */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[40%] bg-red [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)] md:block" />

      <Container className="relative pt-[calc(var(--spacing-nav)+3rem)] pb-12 sm:pb-20">
        <div className="md:max-w-[56%]">
          {eyebrow && <Eyebrow onDark>{eyebrow}</Eyebrow>}
          <h1 className="font-display-heading mt-5 text-5xl sm:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-base text-smoke sm:text-lg">{intro}</p>}
        </div>
      </Container>

      {/* One photo, rendered once: a strip under the title on phones, the
          slanted right-hand panel from md up. */}
      <div className="relative h-44 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[39%]">
        <div aria-hidden="true" className="absolute inset-0 bg-red [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] md:hidden" />
        <div className="absolute inset-0 [clip-path:polygon(0_26%,100%_4%,100%_100%,0_100%)] md:[clip-path:polygon(31%_0,100%_0,100%_100%,1.5%_100%)]">
          <PhotoFrame
            image={image}
            placeholder={placeholder}
            locale={locale}
            width={900}
            height={600}
            sizes="(min-width: 768px) 40vw, 100vw"
            icon={ImageIcon}
            priority
          />
        </div>
      </div>
    </section>
  );
}

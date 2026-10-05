import { ImageIcon } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { PhotoFrame } from "./PhotoFrame";

/**
 * Header at the top of each drawer page: a shaded photo across the top with
 * the eyebrow, title and intro over its lower part.
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
    <header className="on-dark relative isolate flex min-h-[clamp(22rem,56svh,34rem)] items-end overflow-hidden text-paper">
      <div className="absolute inset-0 -z-20">
        <PhotoFrame
          image={image}
          placeholder={placeholder}
          locale={locale}
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 84rem, 100vw"
          icon={ImageIcon}
          priority
        />
      </div>
      {/* Darkest at the bottom where the text sits, plus darker edges */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55)_100%)]" />

      <Container className="pt-28 pb-10 sm:pb-14">
        <h1>
          {eyebrow && (
            <Eyebrow as="span" onDark>
              {eyebrow}
              <span className="sr-only"> — </span>
            </Eyebrow>
          )}
          <span className={`font-display-heading block text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] ${eyebrow ? "mt-4" : ""}`}>{title}</span>
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-base text-paper/90 sm:text-lg">{intro}</p>}
      </Container>
    </header>
  );
}

import { Quote } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { testimonialPlaceholders } from "@/content/placeholders";
import type { Testimonial } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { CmsImage } from "./CmsImage";
import { Container } from "./Container";
import { Marquee } from "./Marquee";
import { SectionHeading } from "./SectionHeading";

/** "What our partners say": heading, then a looping row of quote cards. */
export async function Testimonials({ items, locale }: { items: Testimonial[]; locale: Locale }) {
  if (!items.length) return null;
  const t = await getTranslations("Testimonials");

  const cardCount = Math.min(items.length, 8);
  // Card (26rem) + gap (1.5rem) = 440px; repeat until one pass covers 2600px.
  const repeat = Math.max(1, Math.ceil(2600 / (cardCount * 440)));
  const cards = items.slice(0, 8).map((item, i) => {
    const avatar = testimonialPlaceholders[i % testimonialPlaceholders.length];
    const initials = item.name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
    const meta = [tr(item.role, locale), item.company].filter(Boolean).join(", ");
    return (
      <li key={item._id} className="w-[80vw] max-w-[26rem] shrink-0 snap-start sm:w-[26rem]">
        <figure className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-paper p-6 text-ink shadow-sm ring-1 ring-black/5 sm:p-7">
          {/* Large faint quote mark in the background, top-right */}
          <Quote aria-hidden="true" className="pointer-events-none absolute -top-3 -right-2 -z-10 size-32 fill-red text-red opacity-[0.07]" strokeWidth={0} />
          <blockquote className="flex-1 text-base leading-relaxed">
            <p>{tr(item.quote, locale)}</p>
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            {item.photo?.asset ? (
              <CmsImage image={item.photo} locale={locale} width={48} height={48} sizes="48px" fallbackAlt="" className="size-10 shrink-0 rounded-full object-cover" />
            ) : avatar ? (
              <Image src={avatar.src} alt="" width={48} height={48} className="size-10 shrink-0 rounded-full object-cover ring-2 ring-paper" />
            ) : (
              <span aria-hidden="true" className="steel-gradient flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-paper">
                {initials}
              </span>
            )}
            <span>
              <span className="block text-sm font-bold text-ink">{item.name}</span>
              {meta && <span className="block text-xs text-muted">{meta}</span>}
            </span>
          </figcaption>
        </figure>
      </li>
    );
  });

  return (
    <section aria-labelledby="testimonials-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow={t("eyebrow")}>
          {t("heading")}
        </SectionHeading>
      </Container>
      {/* Full width with soft, wide faded edges. Short lists are repeated so
          one pass is wider than any screen and the first card always follows
          the last with no gap. */}
      <div className="mt-12">
        <Marquee label={t("eyebrow")} seconds={cardCount * repeat * 14} repeat={repeat} feather={[35, 25]}>
          {cards}
        </Marquee>
      </div>
    </section>
  );
}

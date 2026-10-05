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

export async function Testimonials({
  items,
  locale,
  showHeading = true,
  tone = "light",
  className = "",
}: {
  items: Testimonial[];
  locale: Locale;
  showHeading?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!items.length) return null;
  const t = await getTranslations("Testimonials");
  const dark = tone === "dark";

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
        <figure
          className={`relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-7 ${
            dark ? "bg-paper/[0.06] text-paper ring-1 ring-paper/15" : "bg-paper text-ink shadow-sm ring-1 ring-line"
          }`}
        >
          {/* Large faint quote mark in the background, top-right */}
          <Quote aria-hidden="true" className={`pointer-events-none absolute -top-3 -right-2 -z-10 size-32 opacity-[0.07] ${dark ? "fill-paper text-paper" : "fill-red text-red"}`} strokeWidth={0} />
          <blockquote className={`flex-1 text-base leading-relaxed ${dark ? "text-paper" : "text-ink"}`}>
            <p>{tr(item.quote, locale)}</p>
          </blockquote>
          <figcaption className={`mt-5 flex items-center gap-3 border-t pt-4 ${dark ? "border-paper/15" : "border-line"}`}>
            {item.photo?.asset ? (
              <CmsImage image={item.photo} locale={locale} width={48} height={48} sizes="48px" fallbackAlt="" className="size-10 shrink-0 rounded-full object-cover" />
            ) : avatar ? (
              <Image
                src={avatar.src}
                alt=""
                width={48}
                height={48}
                className={`size-10 shrink-0 rounded-full object-cover ring-2 ${dark ? "ring-paper/80" : "ring-paper"}`}
              />
            ) : (
              <span
                aria-hidden="true"
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  dark ? "bg-paper text-black" : "steel-gradient text-paper"
                }`}
              >
                {initials}
              </span>
            )}
            <span>
              <span className={`block text-sm font-bold ${dark ? "text-paper" : "text-black"}`}>{item.name}</span>
              {meta && <span className={`block text-xs ${dark ? "text-smoke" : "text-muted"}`}>{meta}</span>}
            </span>
          </figcaption>
        </figure>
      </li>
    );
  });

  return (
    <section
      aria-labelledby={showHeading ? "testimonials-heading" : undefined}
      aria-label={showHeading ? undefined : t("eyebrow")}
      className={`${dark ? "on-dark texture-dark text-paper" : ""} ${showHeading ? "py-16 sm:py-24" : "py-12 sm:py-16"} ${className}`}
    >
      {showHeading && (
        <Container>
          <SectionHeading id="testimonials-heading" eyebrow={t("eyebrow")} onDark={dark}>
            {t("heading")}
          </SectionHeading>
        </Container>
      )}
      {/* Bleeds to the page edges. */}
      {/* Full width with soft, wide faded edges. Short lists are repeated so
          one pass is wider than any screen and the first card always follows
          the last with no gap. */}
      <div className={showHeading ? "mt-12" : ""}>
        <Marquee label={t("eyebrow")} seconds={cardCount * repeat * 14} repeat={repeat} feather={[35, 25]}>
          {cards}
        </Marquee>
      </div>
    </section>
  );
}

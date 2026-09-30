import { Quote } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { testimonialPlaceholders } from "@/content/placeholders";
import type { Testimonial } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { Accent } from "./Accent";
import { CmsImage } from "./CmsImage";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Marquee } from "./Marquee";

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

  const cards = items.slice(0, 8).map((item) => {
    const initials = item.name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
    const meta = [tr(item.role, locale), item.company].filter(Boolean).join(", ");
    return (
      <li key={item._id} className="w-[85vw] max-w-[34rem] shrink-0 snap-start sm:w-[34rem]">
        <figure
          className={`relative flex h-full flex-col p-7 sm:p-9 ${
            dark ? "bg-paper/[0.06] text-paper ring-1 ring-paper/15" : "bg-paper text-ink shadow-sm ring-1 ring-line"
          }`}
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-red" />
          <Quote aria-hidden="true" className={`size-9 ${dark ? "fill-paper text-paper" : "fill-red text-red"}`} strokeWidth={0} />
          <blockquote className={`mt-4 flex-1 text-lg leading-relaxed ${dark ? "text-paper/90" : "text-ink"}`}>
            <p>{tr(item.quote, locale)}</p>
          </blockquote>
          <figcaption className={`mt-6 flex items-center gap-4 border-t pt-5 ${dark ? "border-paper/15" : "border-line"}`}>
            {item.photo?.asset ? (
              <CmsImage image={item.photo} locale={locale} width={48} height={48} sizes="48px" fallbackAlt="" className="size-12 rounded-full object-cover" />
            ) : testimonialPlaceholders[item._id] ? (
              <Image
                src={testimonialPlaceholders[item._id].src}
                alt=""
                width={48}
                height={48}
                className={`size-12 shrink-0 rounded-full object-cover ring-2 ${dark ? "ring-paper/80" : "ring-paper"}`}
              />
            ) : (
              <span
                aria-hidden="true"
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  dark ? "bg-paper text-black" : "bg-black text-paper"
                }`}
              >
                {initials}
              </span>
            )}
            <span>
              <span className={`block font-bold ${dark ? "text-paper" : "text-black"}`}>{item.name}</span>
              {meta && <span className={`block text-sm ${dark ? "text-smoke" : "text-muted"}`}>{meta}</span>}
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
          <Eyebrow onDark={dark}>{t("eyebrow")}</Eyebrow>
          <h2 id="testimonials-heading" className={`font-display-heading mt-4 text-5xl sm:text-6xl ${dark ? "text-paper" : "text-black"}`}>
            <Accent text={t("heading")} />
          </h2>
        </Container>
      )}
      {/* Bleeds to the page edges; the pause button stays on the content column. */}
      <div className={`px-4 sm:px-6 lg:px-8 ${showHeading ? "mt-12" : ""}`}>
        <Marquee label={t("eyebrow")} seconds={items.length * 14}>
          {cards}
        </Marquee>
      </div>
    </section>
  );
}

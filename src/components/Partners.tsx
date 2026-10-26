import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAboutPage, getPartners, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { DecorativeCopy } from "./DecorativeCopy";
import { Marquee } from "./Marquee";
import { PartnerLogo } from "./PartnerLogo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * "Our partners": heading, intro and a Become-a-partner CTA, then a looping
 * strip of the partner logos (About). Text: About page → Partners.
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

/**
 * Every brand logo (Partner companies in Sanity): the portfolio shown by its
 * brands rather than counted. On desktop, all at once in a grid; on phones
 * and tablets, a looping strip running edge to edge.
 */
export async function LogoWall({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [partners, t] = await Promise.all([getPartners(), getTranslations("About")]);
  if (!partners.length) return null;
  return (
    <div className={className}>
      {/* Phones and tablets: bleeds past the page padding (as Container's) */}
      <div className="-mx-4 sm:-mx-6 lg:hidden">
        <Marquee label={t("partnersLabel")} seconds={partners.length * 3.5} feather={12}>
          {partners.map((partner) => (
            <PartnerLogo key={partner._id} partner={partner} locale={locale} />
          ))}
        </Marquee>
      </div>
      <ul aria-label={t("partnersLabel")} className="hidden grid-cols-5 gap-4 lg:grid">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} locale={locale} className="w-full" />
        ))}
      </ul>
    </div>
  );
}

/**
 * The home hero's left panel (from lg): white, with the partner logos
 * scrolling endlessly upward, no tiles, split by faint lines that fade out at
 * both ends. Two
 * copies loop seamlessly (each logo carries its own bottom line); the top and
 * bottom fade into the white, hovering pauses it, and it stays still under
 * prefers-reduced-motion. Size it with className (e.g. its share of the hero).
 */
export async function LogoColumn({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [partners, t] = await Promise.all([getPartners(), getTranslations("About")]);
  if (!partners.length) return null;
  const tiles = partners.map((partner) => (
    <PartnerLogo
      key={partner._id}
      partner={partner}
      locale={locale}
      size="sm"
      plain
      // A faint line under each logo, fading out to white at both ends
      className="relative w-full after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-steel-200/70 after:to-transparent"
    />
  ));
  return (
    <aside className={`group relative hidden shrink-0 overflow-hidden bg-paper lg:block ${className}`}>
      <div
        style={{ animationDuration: `${partners.length * 3}s` }}
        className="animate-scroll-up absolute inset-x-0 top-0 flex flex-col group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <ul aria-label={t("partnersLabel")} className="flex flex-col">
          {tiles}
        </ul>
        <ul aria-hidden="true" className="flex flex-col">
          <DecorativeCopy>{tiles}</DecorativeCopy>
        </ul>
      </div>
      {/* The logos fade into the white at the top and bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-paper to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-paper to-transparent" />
    </aside>
  );
}

/**
 * The hero's logo band on phones and tablets (below lg): a white strip with
 * the partner logos sliding sideways, split by faint vertical lines that fade
 * out at both ends. Two copies loop seamlessly; hovering pauses it, and it
 * stays still under prefers-reduced-motion. Hidden from lg, where LogoColumn
 * takes over.
 */
export async function LogoRow({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [partners, t] = await Promise.all([getPartners(), getTranslations("About")]);
  if (!partners.length) return null;
  const tiles = partners.map((partner) => (
    <PartnerLogo
      key={partner._id}
      partner={partner}
      locale={locale}
      size="row"
      plain
      className="relative h-full w-40 shrink-0 after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-linear-to-b after:from-transparent after:via-steel-200/70 after:to-transparent"
    />
  ));
  return (
    <aside className={`group relative h-28 shrink-0 overflow-hidden bg-paper lg:hidden ${className}`}>
      <div
        style={{ animationDuration: `${partners.length * 3}s` }}
        className="animate-scroll-x absolute inset-y-0 left-0 flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <ul aria-label={t("partnersLabel")} className="flex h-full">
          {tiles}
        </ul>
        <ul aria-hidden="true" className="flex h-full">
          <DecorativeCopy>{tiles}</DecorativeCopy>
        </ul>
      </div>
      {/* The logos fade into the white at both ends */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-paper to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-paper to-transparent" />
    </aside>
  );
}

/** Just the looping strip of partner company logos (Partner companies in Sanity). */
export async function PartnerStrip({ locale, className = "" }: { locale: Locale; className?: string }) {
  const [partners, t] = await Promise.all([getPartners(), getTranslations("About")]);
  if (!partners.length) return null;
  return (
    <div className={className}>
      <Marquee label={t("partnersLabel")} seconds={partners.length * 3.5} feather={12}>
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} locale={locale} />
        ))}
      </Marquee>
    </div>
  );
}

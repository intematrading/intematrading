import { ArrowRight, BadgeCheck, Boxes, Flame, Globe, Handshake, Plane, ShieldCheck, Ship, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accent } from "@/components/Accent";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CursorSway } from "@/components/CursorSway";
import { Eyebrow } from "@/components/Eyebrow";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { IconBox } from "@/components/IconBox";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PinnedMorph } from "@/components/PinnedMorph";
import { ScrollStage } from "@/components/ScrollStage";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials } from "@/components/Testimonials";
import { placeholders } from "@/content/placeholders";
import type { ServiceSection } from "@/content/types";
import { Link } from "@/i18n/navigation";
import {
  getBrands,
  getExportItems,
  getHomePage,
  getProducedItems,
  getServicesPage,
  getSiteSettings,
  getTestimonials,
  tr,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const statIcons = [Globe, Boxes, Users];
const sectionIcons: Record<ServiceSection, typeof Ship> = { import: Ship, produce: Flame, export: Plane };
const pointIcons = [ShieldCheck, BadgeCheck, Handshake];


export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const siteName = tr(settings.companyName, locale);
  return buildMetadata({ locale, path: "/", seo: home.seo, siteName, fallbackTitle: siteName });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [home, services, testimonials, brands, producedItems, exportItems, t, common, svc] = await Promise.all([
    getHomePage(),
    getServicesPage(),
    getTestimonials(),
    getBrands(),
    getProducedItems(),
    getExportItems(),
    getTranslations("Home"),
    getTranslations("Common"),
    getTranslations("Services"),
  ]);

  // "The Quality Warehouse — Importing, …": the part before the dash is the
  // small line above the headline; both stay inside the one <h1>.
  const [brandLine, ...rest] = tr(home.heroHeadline, locale).split(/\s+—\s+/);
  const headline = rest.join(" — ");
  const cards = home.entryCards ?? [];

  const stats = home.stats ?? [];
  // Real brands/products shown as chips on each What we do panel.
  const itemsFor: Record<ServiceSection, { label: string; names: string[] }> = {
    import: { label: t("importedBrands"), names: brands.map((b) => b.name) },
    produce: { label: svc("ourProducts"), names: producedItems.map((p) => tr(p.name, locale)) },
    export: { label: svc("exportBrands"), names: exportItems.map((e) => e.name) },
  };

  return (
    <div className="flex flex-col bg-steel-100">
      {/* ── Hero: pinned while it grows from an inset rounded panel to the
          full screen (margins and corners shrink with scroll), then it
          scrolls away. Logo top-left, content centred. ───────────────── */}
      <ScrollStage reducedValue={0} className="relative h-[175svh] motion-reduce:h-auto">
        <div
          className="sticky top-0 h-svh [--gap:0.75rem] sm:[--gap:1rem] motion-reduce:static"
          style={{ padding: "calc(var(--gap) * (1 - var(--p)))" }}
        >
          <section
            className="on-dark relative isolate flex h-full min-h-[36rem] flex-col overflow-hidden text-paper"
            style={{ borderRadius: "calc(2rem * (1 - var(--p)))" }}
          >
            <div className="absolute inset-0 -z-20">
              <PhotoFrame
                image={home.heroImage}
                placeholder={placeholders.hero}
                locale={locale}
                width={1920}
                height={1080}
                sizes="100vw"
                icon={Ship}
                priority
              />
            </div>
            {/* Heavier overall shade, a dark vignette at the edges and a darker
                centre behind the text, so the photo stays in the background */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.75)_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.3)_0%,transparent_60%)]" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-black/50 to-black/0" />

            <Container className="flex flex-1 flex-col pt-6 pb-8 sm:pt-7 sm:pb-12">
              {/* Centred content */}
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <h1 className="max-w-4xl">
                  {headline ? (
                    <>
                      <Eyebrow as="span" onDark>
                        {brandLine}
                        <span className="sr-only"> — </span>
                      </Eyebrow>
                      <span className="font-display-heading mt-4 block text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] text-balance">
                        <Accent text={headline} />
                      </span>
                    </>
                  ) : (
                    <span className="font-display-heading block text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95]">
                      <Accent text={brandLine} />
                    </span>
                  )}
                </h1>
                {home.heroSubheadline && <p className="mt-6 max-w-xl text-base text-paper/90 sm:text-lg">{tr(home.heroSubheadline, locale)}</p>}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/services" variant="redOnDark">
                    {common("exploreServices")}
                  </ButtonLink>
                  <ButtonLink href="/#contact" variant="outline">
                    {common("contactUs")}
                  </ButtonLink>
                </div>
              </div>
            </Container>

            {/* Right edge: a thin vertical line mirroring the side nav's, with a
                dot travelling down it and "Scroll down" beneath */}
            <div aria-hidden="true" className="absolute top-1/2 right-[2.125rem] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:right-[2.625rem]">
              <span className="relative h-32 w-px bg-paper/15">
                <span className="animate-scroll-dot absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-paper/60 motion-reduce:hidden" />
              </span>
              <span className="text-[0.625rem] font-semibold tracking-[0.25em] text-paper/50 uppercase [writing-mode:vertical-rl]">
                {t("scrollDown")}
              </span>
            </div>
          </section>
        </div>
      </ScrollStage>

      {/* ── Snapshot: slides up, then pins while the stats animate in one
          by one (driven by scroll), then scrolls on. ────────────────── */}
      {stats.length ? (
        <ScrollStage className="relative h-[260svh] motion-reduce:h-auto">
          <section aria-labelledby="snapshot-heading" className="sticky top-0 flex h-svh items-center overflow-hidden py-[max(3rem,8svh)] text-ink motion-reduce:static motion-reduce:h-auto motion-reduce:py-16">
            {/* Container on a crane line, hanging from the top-left. Hidden
                above the section at first and lowered in while the section
                slides up, settling as it reaches the top. */}
            <div className="pointer-events-none absolute top-0 left-[max(0rem,calc((100vw-80rem)/2))] hidden w-[min(30rem,36vw)] lg:block" style={{ transform: "translateY(calc(-12% - 88% * (1 - var(--enter))))" }}>
              <CursorSway>
                <Image src="/img1.png" alt="" width={2000} height={2000} sizes="(min-width: 1024px) 30rem, 0px" className="w-full" />
              </CursorSway>
            </div>
            <Container className="grid w-full gap-12 lg:grid-cols-12 lg:items-center lg:gap-24">
              <div className="lg:col-span-5 lg:self-end lg:pb-4">
                <SectionHeading id="snapshot-heading" eyebrow={brandLine}>
                  {t("snapshotHeading")}
                </SectionHeading>
                <p className="mt-5 max-w-md text-muted sm:text-lg">{t("snapshotIntro")}</p>
                <ButtonLink href="/about" variant="red" className="mt-8">
                  {common("learnMore")}
                </ButtonLink>
              </div>
              <dl className="divide-y divide-steel-300 lg:col-span-6 lg:col-start-7">
                {stats.map((stat, i) => {
                  const Icon = statIcons[i % statIcons.length];
                  return (
                    <div
                      key={stat._key}
                      className="scroll-reveal flex items-start gap-5 py-7 first:pt-0 last:pb-0 sm:gap-8 sm:py-[clamp(1rem,4.5svh,2.5rem)]"
                      style={{ "--start": 0.05 + (i / stats.length) * 0.6, "--span": 0.18 } as React.CSSProperties}
                    >
                      <IconBox icon={Icon} size="lg" className="mt-1" />
                      {/* Number, then its label and description underneath */}
                      <div className="flex flex-col-reverse">
                        <dt className="mt-2">
                          <span className="block text-lg font-semibold text-ink">{tr(stat.label, locale)}</span>
                          {stat.note && <span className="mt-1.5 block max-w-md text-muted">{tr(stat.note, locale)}</span>}
                        </dt>
                        <dd className="font-display-heading text-steel-gradient text-5xl leading-none sm:text-[clamp(2.5rem,7svh,3.75rem)]" lang="en">
                          {stat.value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Container>
          </section>
        </ScrollStage>
      ) : null}

      {/* ── Commitment band: arrives as a plain full-width rectangle; once
          it fills the screen (edge to edge, full height) it holds while it
          shrinks to its content height and side margins and rounded corners
          grow in — the hero's expansion in reverse — then scrolls on. ─── */}
      {home.commitmentHeadline && (
        // "About" in the side nav
        <div id="about" data-nav-section="/about">
        <PinnedMorph>
          <div className="[--gap:0.75rem] sm:[--gap:1rem]" style={{ paddingInline: "calc(var(--gap) * var(--p))" }}>
            <section
              aria-labelledby="commitment-heading"
              className="on-dark relative isolate flex items-center overflow-hidden text-paper"
              style={{
                borderRadius: "calc(2rem * var(--p))",
                minHeight: "calc(var(--full, 0px) - (var(--full, 0px) - var(--nat, 0px)) * var(--p))",
              }}
            >
              <div className="absolute inset-0 -z-20">
                <PhotoFrame
                  image={home.commitmentImage}
                  placeholder={placeholders.commitment}
                  locale={locale}
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  icon={Handshake}
                />
              </div>
              {/* Even near-black tint on phones (stacked text over the photo); a fade
                  from the left on desktop, leaving the right side clear. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/55 lg:bg-transparent lg:bg-linear-to-r lg:from-black/75 lg:from-25% lg:via-black/45 lg:via-50% lg:to-black/5"
              />
              <div data-natural className="w-full">
              <Container className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-8">
                <div className="lg:col-span-5">
                  <SectionHeading id="commitment-heading" eyebrow={tr(home.commitmentEyebrow, locale)} size="band" onDark>
                    {tr(home.commitmentHeadline, locale)}
                  </SectionHeading>
                  {home.commitmentBody && <p className="mt-6 max-w-sm text-paper/90">{tr(home.commitmentBody, locale)}</p>}
                  <ButtonLink href="/about" variant="redOnDark" className="mt-8">
                    {t("aboutUs")}
                  </ButtonLink>
                </div>

                {home.commitmentPoints?.length ? (
                  <div className="rounded-3xl bg-white/12 p-6 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl backdrop-saturate-150 ring-inset sm:p-8 lg:col-span-6 lg:col-start-7 xl:p-10">
                    <ul className="w-full divide-y divide-white/20">
                      {home.commitmentPoints.map((point, i) => {
                        const Icon = pointIcons[i % pointIcons.length];
                        return (
                          <li key={point._key ?? point.title.en} className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
                            <IconBox icon={Icon} />
                            <div>
                              <h3 className="text-lg leading-snug font-bold text-paper">{tr(point.title, locale)}</h3>
                              {point.description && <p className="mt-1 text-sm text-paper/85 sm:text-base">{tr(point.description, locale)}</p>}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </Container>
              </div>
            </section>
          </div>
        </PinnedMorph>
        </div>
      )}

      {/* ── What we do: pinned, and scrolling down moves a row of large
          photo cards (shaded steel-to-black, real brands as chips)
          sideways, after an intro. ──────────────────────────────────── */}
      {cards.length ? (
        // "Services" in the side nav
        <section id="services" data-nav-section="/services" aria-labelledby="what-we-do">
          <HorizontalScroll>
            <div
              data-panel
              className="flex w-[min(28rem,85vw)] shrink-0 flex-col justify-center px-1 sm:px-6 lg:w-[30rem] lg:px-10"
              // Slides in from the left as the section scrolls up
              style={{ transform: "translateX(calc(-40vw * (1 - var(--enter))))", opacity: "var(--enter)" }}
            >
              {/* All steel gradient here: the starred red accent is dropped */}
              <SectionHeading id="what-we-do" eyebrow={t("ourServices")}>
                {t("whatWeDo").replace(/\*/g, "")}
              </SectionHeading>
              {services.intro && <p className="mt-6 text-muted">{tr(services.intro, locale)}</p>}
              {/* The three main services: icon, name and a short description */}
              <ul className="mt-8 space-y-5">
                {cards.map((card) => (
                  <li key={card._key} className="flex items-start gap-4">
                    <IconBox icon={sectionIcons[card.section]} />
                    <div>
                      <p className="text-lg leading-snug font-semibold text-ink">{tr(card.title, locale)}</p>
                      {card.description && <p className="mt-1 text-sm text-muted">{tr(card.description, locale)}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {cards.map((card, i) => {
              const Icon = sectionIcons[card.section];
              const items = itemsFor[card.section];
              return (
                <Link
                  key={card._key}
                  data-panel
                  href="/services"
                  style={{ transform: `translateX(calc(${30 + i * 15}vw * (1 - var(--enter))))` }}
                  className="group on-dark relative isolate flex h-[calc(100svh-6rem)] max-h-[40rem] w-[84vw] shrink-0 flex-col overflow-hidden rounded-[1.75rem] p-7 text-paper shadow-lg transition-shadow hover:shadow-2xl sm:rounded-[2rem] sm:p-10 lg:w-[58vw] lg:p-12"
                >
                  <div className="absolute inset-0 -z-20">
                    <PhotoFrame
                      image={card.image}
                      placeholder={placeholders[card.section]}
                      locale={locale}
                      width={1400}
                      height={1000}
                      sizes="(min-width: 1024px) 58vw, 84vw"
                      icon={Icon}
                      className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  {/* Steel-to-black shade rising from the bottom, where the text sits */}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-steel-800/55 via-50% to-steel-700/45" />
                  {/* Darker edges all round */}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.75)_100%)]" />

                  <span aria-hidden="true" className="font-display-heading self-end text-5xl text-paper/80 drop-shadow-lg sm:text-7xl" lang="en">
                    0{i + 1}
                  </span>

                  <div className="mt-auto grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12">
                    <div>
                      <h3 className="font-display-heading text-5xl text-paper sm:text-6xl xl:text-7xl">
                        {tr(card.title, locale)}
                      </h3>
                      {card.description && <p className="mt-4 max-w-sm text-lg text-paper/85">{tr(card.description, locale)}</p>}
                      <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-bold text-ink transition-colors group-hover:bg-steel-200 sm:text-base">
                        {common("learnMore")}
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    {items.names.length ? (
                      <div className="hidden sm:block">
                        <p className="label-caps text-paper/75">{items.label}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {items.names.slice(0, 8).map((name) => (
                            <li key={name} className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-paper ring-1 ring-white/25 backdrop-blur-md">
                              {name}
                            </li>
                          ))}
                          {items.names.length > 8 && (
                            <li className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-paper ring-1 ring-white/25 backdrop-blur-md">
                              {t("moreItems", { count: items.names.length - 8 })}
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </Link>
              );
            })}
            {/* Closing panel: "more services" note, right-aligned, with a
                vertical line and label echoing the hero's scroll cue */}
            <div data-panel className="flex w-[min(34rem,90vw)] shrink-0 items-center justify-end gap-14 px-4 sm:px-10 lg:w-[48rem] lg:gap-28 lg:px-20">
              <div className="flex flex-col items-end text-right">
                <SectionHeading id="what-we-do-outro" eyebrow={t("outroEyebrow")}>
                  {t("outroHeading")}
                </SectionHeading>
                <p className="mt-6 max-w-sm text-muted sm:text-lg">{t("outroBody")}</p>
                <ButtonLink href="/services" variant="red" className="mt-8">
                  {t("outroCta")}
                </ButtonLink>
              </div>
              <div aria-hidden="true" className="hidden flex-col items-center gap-4 sm:flex">
                <span className="relative h-32 w-px bg-steel-400/40">
                  <span className="animate-scroll-dot absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-steel-500 motion-reduce:hidden" />
                </span>
                <span className="text-[0.625rem] font-semibold tracking-[0.25em] text-steel-500 uppercase [writing-mode:vertical-rl]">
                  {t("outroSide")}
                </span>
              </div>
            </div>
          </HorizontalScroll>
        </section>
      ) : null}

      <Testimonials items={testimonials} locale={locale} />
    </div>
  );
}

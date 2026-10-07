import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Handshake,
  Plane,
  ShieldCheck,
  Ship,
  ShoppingBasket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accent } from "@/components/Accent";
import { BranchLines } from "@/components/BranchLines";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CursorSway } from "@/components/CursorSway";
import { Eyebrow } from "@/components/Eyebrow";
import { IconBox } from "@/components/IconBox";
import { PartnerStrip } from "@/components/Partners";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { PhotoFrame } from "@/components/PhotoFrame";
import { BrandGrid } from "@/components/ProductGrid";
import { ProductPreviewProvider } from "@/components/ProductPreview";
import { ScrollStage } from "@/components/ScrollStage";
import { SectionHeading } from "@/components/SectionHeading";
import { statIcon } from "@/components/stat-icons";
import { Reveal } from "@/components/Reveal";
import { RouteSteps } from "@/components/RouteSteps";
import { TeamCard } from "@/components/TeamCard";
import { Testimonials } from "@/components/Testimonials";
import { placeholders } from "@/content/placeholders";
import type { CardKind } from "@/content/types";
import { Link } from "@/i18n/navigation";
import {
  getAboutPage,
  getBrands,
  getExportItems,
  getHomePage,
  getProducedItems,
  getServicesPage,
  getSiteSettings,
  getTeamMembers,
  getTeamPage,
  getTestimonials,
  tr,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const cardIcons: Record<CardKind, LucideIcon> = {
  food: ShoppingBasket,
  nonFood: Sparkles,
  import: Ship,
  produce: Flame,
  export: Plane,
};
const pointIcons = [ShieldCheck, BadgeCheck, Handshake];
// What we do from xl: cards span two of five rows; the left column starts a
// row down, so each right card's middle lines up with a gap on the left
// (where its branch line passes).
const staggered = [
  "xl:col-start-1 xl:row-span-2 xl:row-start-2",
  "xl:col-start-2 xl:row-span-2 xl:row-start-1",
  "xl:col-start-1 xl:row-span-2 xl:row-start-4",
  "xl:col-start-2 xl:row-span-2 xl:row-start-3",
];
// Brands INTEMA is the main importer of (logos in public/).
const mainImporterLogos = [
  // Heights balanced by eye: L'Oréal's thin, wide wordmark vs Heinz's compact badge.
  { name: "L'Oréal", src: "/loreal-logo.svg", width: 800, height: 145, size: "h-9 sm:h-11" },
  { name: "Heinz", src: "/heinz-logo.svg", width: 1024, height: 459, size: "h-11 sm:h-14" },
];


export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const siteName = tr(settings.companyName, locale);
  return buildMetadata({ locale, path: "/", seo: home.seo, siteName, fallbackTitle: siteName });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [home, about, services, teamPage, teamMembers, testimonials, brands, producedItems, exportItems, t, common, svc] = await Promise.all([
    getHomePage(),
    getAboutPage(),
    getServicesPage(),
    getTeamPage(),
    getTeamMembers(),
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
  // Mission and vision cards: Home's short versions, else the About page's.
  const mission = tr(home.mission ?? about.mission, locale);
  const vision = tr(home.vision ?? about.vision, locale);
  const glass = "rounded-3xl bg-white/12 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl backdrop-saturate-150 ring-inset";
  const food = brands.filter((b) => b.category === "food");
  const nonFood = brands.filter((b) => b.category === "nonFood");
  // Chips on each What we do card: its categories when set in Sanity,
  // otherwise its real brands / products.
  const itemsFor = (card: (typeof cards)[number]): { label: string; names: string[] } => {
    if (card.categories?.length) return { label: t("categories"), names: card.categories.map((c) => tr(c, locale)) };
    switch (card.section) {
      case "food":
        return { label: t("importedBrands"), names: food.map((b) => b.name) };
      case "nonFood":
        return { label: t("importedBrands"), names: nonFood.map((b) => b.name) };
      case "produce":
        return { label: svc("ourProducts"), names: producedItems.map((p) => tr(p.name, locale)) };
      case "export":
        return { label: svc("exportBrands"), names: exportItems.map((e) => e.name) };
      default:
        return { label: t("importedBrands"), names: brands.map((b) => b.name) };
    }
  };

  return (
    <div className="flex flex-col bg-steel-100">
      {/* ── Hero: full screen from the start, content centred. The top
          bar slides in once the page is scrolled. ───────────────────── */}
      <section className="on-dark relative isolate flex h-svh min-h-[36rem] flex-col overflow-hidden text-paper">
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
                  <ButtonLink href="/contact" variant="outline">
                    {common("contactUs")}
                  </ButtonLink>
                </div>
              </div>
            </Container>

            {/* Right edge: a thin vertical line with a
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

      {/* ── Snapshot: slides up, then pins while the stats animate in one
          by one (driven by scroll), then scrolls on. ────────────────── */}
      {stats.length ? (
        // Phones and tablets: a normal section sized to its content, the
        // stats shown as they are (no pinning or scroll-driven reveal).
        <ScrollStage className="relative h-[260svh] motion-reduce:h-auto max-lg:h-auto">
          <section aria-labelledby="snapshot-heading" className="sticky top-0 flex h-svh items-center overflow-hidden py-[max(3rem,8svh)] text-ink motion-reduce:static motion-reduce:h-auto motion-reduce:py-16 max-lg:static max-lg:h-auto max-lg:py-16 sm:max-lg:py-20">
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
              {/* 2x2 grid, cells split by a faded cross */}
              <ul className="relative grid gap-y-10 sm:grid-cols-2 sm:gap-y-0 lg:col-span-7 lg:col-start-6 sm:before:absolute sm:before:inset-y-0 sm:before:left-1/2 sm:before:w-px sm:before:bg-linear-to-b sm:before:from-transparent sm:before:via-steel-300 sm:before:to-transparent sm:after:absolute sm:after:inset-x-0 sm:after:top-1/2 sm:after:h-px sm:after:bg-linear-to-r sm:after:from-transparent sm:after:via-steel-300 sm:after:to-transparent">
                {stats.map((stat, i) => {
                  const Icon = statIcon(stat._key);
                  return (
                    <li
                      key={stat._key}
                      className="scroll-reveal flex items-start gap-5 sm:p-[clamp(1.25rem,4svh,2.5rem)] max-lg:!opacity-100 max-lg:![transform:none]"
                      style={{ "--start": 0.05 + (i / stats.length) * 0.6, "--span": 0.18 } as React.CSSProperties}
                    >
                      <IconBox icon={Icon} size="lg" className="mt-1" />
                      {/* Number, then its label and description underneath */}
                      <div className="flex flex-col-reverse">
                        <p className="mt-2">
                          <span className="block text-lg font-semibold text-ink">{tr(stat.label, locale)}</span>
                          {stat.note && <span className="mt-1.5 block max-w-xs text-muted">{tr(stat.note, locale)}</span>}
                        </p>
                        <p className="font-display-heading text-steel-gradient text-5xl leading-none sm:text-[clamp(2.5rem,7svh,3.75rem)]" lang="en">
                          {stat.value}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
        </ScrollStage>
      ) : null}

      {/* ── Commitment band: full width and at least a screen tall. The
          headline and paragraph on the left; on the right, glass cards for
          the mission and vision above the three commitment points. ──── */}
      {home.commitmentHeadline && (
        <section id="about" aria-labelledby="commitment-heading" className="on-dark relative isolate flex min-h-svh items-center overflow-hidden text-paper">
          {/* Even near-black tint on phones (stacked text over the photo); a fade
              from the left on desktop, leaving the right side clear. */}
          <PhotoBackdrop
            image={home.commitmentImage}
            placeholder={placeholders.commitment}
            locale={locale}
            sizes="100vw"
            icon={Handshake}
            overlay="bg-black/55 lg:bg-transparent lg:bg-linear-to-r lg:from-black/75 lg:from-25% lg:via-black/45 lg:via-50% lg:to-black/5"
          />
          <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-8">
            <Reveal className="lg:col-span-5">
              <SectionHeading id="commitment-heading" eyebrow={tr(home.commitmentEyebrow, locale)} size="band" onDark>
                {tr(home.commitmentHeadline, locale)}
              </SectionHeading>
              {home.commitmentBody && <p className="mt-6 max-w-sm text-paper/90">{tr(home.commitmentBody, locale)}</p>}
              <ButtonLink href="/about" variant="redOnDark" className="mt-8">
                {t("aboutUs")}
              </ButtonLink>
            </Reveal>

            <div className="grid gap-4 sm:gap-5 lg:col-span-7 lg:col-start-6">
              {mission || vision ? (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {[
                    { key: "mission", title: t("mission"), text: mission },
                    { key: "vision", title: t("vision"), text: vision },
                  ].map(({ key, title, text }) =>
                    text ? (
                      <Reveal key={key} className="h-full">
                        <div className={`${glass} h-full p-6 sm:p-8`}>
                          <h3 className="text-lg font-bold text-paper">{title}</h3>
                          <p className="mt-2 text-sm text-paper/85 sm:text-base">{text}</p>
                        </div>
                      </Reveal>
                    ) : null,
                  )}
                </div>
              ) : null}
              {home.commitmentPoints?.length ? (
                <Reveal>
                  <ul className={`${glass} divide-y divide-white/20 p-6 sm:p-8 xl:p-10`}>
                    {home.commitmentPoints.map((point, i) => {
                      const Icon = pointIcons[i % pointIcons.length];
                      return (
                        <li key={point._key ?? point.title.en} className="flex max-w-xl items-start gap-5 py-5 first:pt-0 last:pb-0">
                          <IconBox icon={Icon} />
                          <div>
                            <h3 className="text-lg leading-snug font-bold text-paper">{tr(point.title, locale)}</h3>
                            {point.description && <p className="mt-1 text-sm text-paper/85 sm:text-base">{tr(point.description, locale)}</p>}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </section>
      )}

      {/* ── Brands we import: "main importer of …" highlight, then the
          food and non-food brands, each as text beside a loose grid of
          small product tiles (as on the Services page) */}
      {brands.length ? (
        <section aria-labelledby="brands-heading" className="py-16 sm:py-24">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <SectionHeading id="brands-heading" eyebrow={t("portfolioEyebrow")}>
                  {t("brandsHeading")}
                </SectionHeading>
                <p className="mt-6 max-w-xl text-muted sm:text-lg">{t("brandsIntro")}</p>
              </div>
              {/* "Main importers of": a fading rule, then the L'Oréal and Heinz logos side by side */}
              <div className="lg:col-span-5 lg:col-start-8 lg:self-center lg:text-right">
                <p className="label-caps text-red-ink">{t("mainImporter")}</p>
                <span aria-hidden="true" className="mt-4 block h-px bg-linear-to-r from-steel-400 to-transparent lg:bg-linear-to-l" />
                <ul className="mt-6 flex items-center gap-8 sm:gap-10 lg:justify-end">
                  {mainImporterLogos.map((logo) => (
                    <li key={logo.name}>
                      <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} unoptimized className={`w-auto object-contain ${logo.size}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
          {/* Partner logos, looping, above the food brands */}
          <PartnerStrip locale={locale} className="mt-12" />
          <ProductPreviewProvider>
            <div className="mt-12">
              <BrandGrid brands={food} icon={ShoppingBasket} label={svc("food")} intro={tr(cards.find((c) => c.section === "food")?.description, locale)} locale={locale} />
              <BrandGrid brands={nonFood} icon={Sparkles} label={svc("nonFood")} intro={tr(cards.find((c) => c.section === "nonFood")?.description, locale)} reverse locale={locale} />
            </div>
          </ProductPreviewProvider>
        </section>
      ) : null}

      {/* ── From port to shelf: the integrated route from supplier to
          the Ethiopian market, as seven numbered services ──────────── */}
      <RouteSteps locale={locale} white moreLink />

      {/* ── What we do: the intro beside the four photo cards (the two
          import platforms, produce, export): a 2x2 grid, and from xl two
          staggered columns with lines branching to them from a red dot
          under the intro ───────────────────────────────────────────── */}
      {cards.length ? (
        <section id="services" aria-labelledby="what-we-do" className="py-16 sm:py-24">
          <Container>
          <BranchLines className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-x-28">
            <Reveal className="lg:sticky lg:top-[calc(var(--bar-h)+3rem)] lg:col-span-4 lg:self-start xl:static xl:col-span-1 xl:self-center">
              <span data-branch-root aria-hidden="true" className="red-gradient mb-10 hidden size-12 rounded-full xl:block" />
              <SectionHeading id="what-we-do" eyebrow={t("ourServices")}>
                {t("whatWeDo")}
              </SectionHeading>
              {(home.whatWeDoIntro || services.intro) && <p className="mt-6 text-muted sm:text-lg">{tr(home.whatWeDoIntro ?? services.intro, locale)}</p>}
              <ButtonLink href="/services" variant="red" className="mt-8">
                {common("exploreServices")}
              </ButtonLink>
            </Reveal>
            <ul data-branch-list className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8 xl:col-span-1 xl:grid-rows-[repeat(5,11.5rem)] xl:gap-x-16 xl:gap-y-12">
              {cards.map((card, i) => {
                const Icon = cardIcons[card.section] ?? Ship;
                const items = itemsFor(card);
                return (
                  // Enters (fades and lifts in) once BranchLines marks it data-shown.
                  <li
                    key={card._key}
                    data-branch-leaf
                    className={`translate-y-12 opacity-0 transition-[opacity,translate] duration-700 ease-out data-shown:translate-y-0 data-shown:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${staggered[i] ?? ""}`}
                  >
                      <Link
                        href="/services"
                        className="group on-dark relative isolate flex h-full min-h-[24rem] flex-col overflow-hidden rounded-3xl p-6 text-paper shadow-lg transition-shadow hover:shadow-2xl sm:min-h-[26rem] sm:p-7"
                      >
                        <div className="absolute inset-0 -z-20">
                          <PhotoFrame
                            image={card.image}
                            placeholder={placeholders[card.section] ?? placeholders.import}
                            locale={locale}
                            width={900}
                            height={900}
                            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                            icon={Icon}
                            className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                          />
                        </div>
                        {/* Shade rising from the bottom, where the text sits, plus darker edges */}
                        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/55 via-55% to-black/25" />
                        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55)_100%)]" />

                        <span aria-hidden="true" className="font-display-heading self-end text-4xl text-paper/80" lang="en">
                          0{i + 1}
                        </span>
                        <div className="mt-auto">
                          <h3 className="font-display-heading text-3xl sm:text-4xl">{tr(card.title, locale)}</h3>
                          {card.description && <p className="mt-2 line-clamp-2 text-sm text-paper/85">{tr(card.description, locale)}</p>}
                          {items.names.length ? (
                            <ul className="mt-4 flex flex-wrap gap-1.5">
                              {items.names.slice(0, 4).map((name) => (
                                <li key={name} className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur-md">
                                  {name}
                                </li>
                              ))}
                              {items.names.length > 4 && (
                                <li className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold ring-1 ring-white/25 backdrop-blur-md">
                                  {t("moreItems", { count: items.names.length - 4 })}
                                </li>
                              )}
                            </ul>
                          ) : null}
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold">
                            {common("learnMore")}
                            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </Link>
                  </li>
                );
              })}
            </ul>
          </BranchLines>
          </Container>
        </section>
      ) : null}

      {/* ── Meet our team: heading and intro, the people, then a link to
          the Team page ─────────────────────────────────────────────── */}
      {teamMembers.length ? (
        <section id="team" aria-labelledby="team-heading" className="bg-paper py-16 sm:py-24">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <SectionHeading id="team-heading" eyebrow={t("ourTeam")}>
                  {t("meetTeam")}
                </SectionHeading>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {teamPage.intro && <p className="max-w-2xl text-muted sm:text-lg">{tr(teamPage.intro, locale)}</p>}
              </div>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {teamMembers.slice(0, 4).map((m) => (
                <li key={m._id}>
                  <Reveal className="h-full">
                    <TeamCard member={m} locale={locale} onWhite />
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/team" variant="red">
                {t("viewTeam")}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      <Testimonials items={testimonials} locale={locale} />
    </div>
  );
}

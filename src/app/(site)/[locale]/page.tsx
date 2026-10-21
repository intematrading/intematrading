import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Eye,
  FileSignature,
  Flame,
  Globe2,
  Handshake,
  Package,
  Plane,
  RefreshCw,
  ShieldCheck,
  Ship,
  ShoppingBasket,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accent } from "@/components/Accent";
import { BranchConnector } from "@/components/RegionTree";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CursorSway } from "@/components/CursorSway";
import { Eyebrow } from "@/components/Eyebrow";
import { IconBox } from "@/components/IconBox";
import { Logo } from "@/components/Logo";
import { LogoWall } from "@/components/Partners";
import { BrandGrid } from "@/components/ProductGrid";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { PhotoFrame } from "@/components/PhotoFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { statIcon } from "@/components/stat-icons";
import { Reveal } from "@/components/Reveal";
import { RouteStops } from "@/components/RouteSteps";
import { TeamCard } from "@/components/TeamCard";
import { placeholders } from "@/content/placeholders";
import type { ServiceSection } from "@/content/types";
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
  tr,
  withValues,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const cardIcons: Record<ServiceSection, LucideIcon> = {
  import: Ship,
  produce: Flame,
  export: Plane,
};
const pointIcons = [ShieldCheck, BadgeCheck, Handshake];
// Importing points in order (exclusive agency, supplier network, compliance, planning, trusted brands, categories), repeating.
const importIcons = [FileSignature, Globe2, ShieldCheck, RefreshCw, Award, Boxes];
// Brands INTEMA is the main importer of (logos in public/).
const mainImporterLogos = [
  // Heights balanced by eye: L'Oréal's wide wordmark (thickened, in loreal-logo-bold.svg) vs Heinz's compact badge.
  { name: "L'Oréal", src: "/loreal-logo-bold.svg", width: 808, height: 153, size: "h-12 sm:h-16" },
  { name: "Heinz", src: "/heinz-logo.svg", width: 1024, height: 459, size: "h-16 sm:h-24" },
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

  const [home, about, services, teamPage, teamMembers, settings, brands, producedItems, exportItems, t, common, svc] = await Promise.all([
    getHomePage(),
    getAboutPage(),
    getServicesPage(),
    getTeamPage(),
    getTeamMembers(),
    getSiteSettings(),
    getBrands(),
    getProducedItems(),
    getExportItems(),
    getTranslations("Home"),
    getTranslations("Common"),
    getTranslations("Services"),
  ]);

  // "Trusted Brands, Delivered — Importing, …": the part before the dash is the
  // small line above the headline; both stay inside the one <h1>.
  const [brandLine, ...rest] = tr(home.heroHeadline, locale).split(/\s+—\s+/);
  const headline = rest.join(" — ");
  const companyName = tr(settings.companyName, locale);
  const cards = home.entryCards ?? [];

  const stats = withValues(home.stats);
  // Mission and vision cards: Home's short versions, else the About page's.
  const mission = tr(home.mission ?? about.mission, locale);
  const vision = tr(home.vision ?? about.vision, locale);
  const glass = "rounded-3xl bg-white/12 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl backdrop-saturate-150 ring-inset";
  // Chips on each What we do card: its categories when set in Sanity,
  // otherwise its real brands / products.
  const itemsFor = (card: (typeof cards)[number]): { label: string; names: string[] } => {
    if (card.categories?.length) return { label: t("categories"), names: card.categories.map((c) => tr(c, locale)) };
    switch (card.section) {
      case "produce":
        return { label: svc("ourProducts"), names: producedItems.map((p) => tr(p.name, locale)) };
      case "export":
        return { label: svc("exportBrands"), names: exportItems.map((e) => e.name) };
      default:
        return { label: t("importedBrands"), names: brands.map((b) => b.name) };
    }
  };

  return (
    <div className="flex flex-col bg-paper">
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
            {/* A light overall shade, a soft vignette at the edges and a darker
                centre behind the text, so the photo stays bright but the text reads */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.45)_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.4)_0%,transparent_60%)]" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-black/50 to-black/0" />

            <Container className="flex flex-1 flex-col pt-6 pb-8 sm:pt-7 sm:pb-12">
              {/* Centred content */}
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <Logo alt={companyName} tone="white" priority className="mb-6 h-14 w-auto sm:mb-8 sm:h-20" />
                <h1 className="max-w-4xl">
                  {headline ? (
                    <>
                      <Eyebrow as="span" onDark>
                        {brandLine}
                        <span className="sr-only">. </span>
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

      {/* ── About INTEMA: sized to its content. The heading and intro under
          a container hanging on a crane line from the section's top edge;
          beside them (from md) the stats, which fade in one after another
          once in view: one column below xl, a 2x2 grid from xl. ────────── */}
      {stats.length ? (
          <section aria-labelledby="snapshot-heading" className="relative overflow-hidden py-16 text-ink sm:py-20 lg:py-24">
            <Container className="grid w-full gap-12 md:grid-cols-12 md:items-center md:gap-x-16 lg:gap-x-24">
              <div className="md:col-span-5">
                <div aria-hidden="true" className="pointer-events-none -mt-[9.5rem] mb-[-2rem] hidden w-[min(26rem,100%)] xl:block">
                  <CursorSway>
                    <Image src="/img1.png" alt="" width={2000} height={2000} sizes="(min-width: 1024px) 26rem, 0px" className="w-full" />
                  </CursorSway>
                </div>
                <SectionHeading id="snapshot-heading" eyebrow={t("snapshotHeading")}>
                  {t("biggestImporter")}
                </SectionHeading>
                <p className="mt-5 max-w-md text-muted sm:text-lg">{t("snapshotIntro")}</p>
                <ButtonLink href="/about" variant="red" className="mt-8">
                  {common("learnMore")}
                </ButtonLink>
              </div>
              {/* One column split by thin rules; from xl a 2x2 grid, cells split by a faded cross */}
              <ul className="relative grid divide-y divide-steel-200 md:col-span-7 md:col-start-6 xl:grid-cols-2 xl:divide-y-0 xl:before:absolute xl:before:inset-y-0 xl:before:left-1/2 xl:before:w-px xl:before:bg-linear-to-b xl:before:from-transparent xl:before:via-steel-300 xl:before:to-transparent xl:after:absolute xl:after:inset-x-0 xl:after:top-1/2 xl:after:h-px xl:after:bg-linear-to-r xl:after:from-transparent xl:after:via-steel-300 xl:after:to-transparent">
                {stats.map((stat, i) => {
                  const Icon = statIcon(stat._key);
                  return (
                    <li key={stat._key}>
                      <Reveal delay={i * 200} className="flex items-start gap-5 py-6 xl:px-8 xl:py-14">
                      <IconBox icon={Icon} size="lg" className="mt-1" />
                      {/* Number, then its label and description underneath */}
                      <div className="flex flex-col-reverse">
                        <p className="mt-2">
                          <span className="block text-lg font-semibold text-ink">{tr(stat.label, locale)}</span>
                          {stat.note && <span className="mt-1.5 block max-w-xs text-muted">{tr(stat.note, locale)}</span>}
                        </p>
                        <p className="font-display-heading text-steel-gradient text-5xl leading-none xl:text-[clamp(2.5rem,7svh,3.75rem)]" lang="en">
                          {stat.value}
                        </p>
                      </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </section>
      ) : null}

      {/* ── Importing: what INTEMA brings to brand owners, as cards, with a
          link to the import section of Services ─────────────────────── */}
      {home.importHeading && (
        <section aria-labelledby="importing-heading" className="bg-steel-50 py-16 sm:py-24">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SectionHeading id="importing-heading" eyebrow={t("importingEyebrow")}>
                  {tr(home.importHeading, locale)}
                </SectionHeading>
                {home.importIntro && <p className="mt-6 max-w-3xl text-muted sm:text-lg">{tr(home.importIntro, locale)}</p>}
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <ButtonLink href="/services#import" variant="red">
                  {t("importingCta")}
                </ButtonLink>
              </div>
            </Reveal>
            {home.importPoints?.length ? (
              <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {home.importPoints.map((point, i) => {
                  const Icon = importIcons[i % importIcons.length];
                  return (
                    <li key={point._key}>
                      <Reveal delay={(i % 3) * 120} className="h-full">
                        <div className="flex h-full flex-col rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-black/5 sm:p-7">
                          <IconBox icon={Icon} />
                          <h3 className="font-title-heading mt-6 text-lg text-ink">{tr(point.title, locale)}</h3>
                          {point.body && <p className="mt-2 leading-relaxed text-muted">{tr(point.body, locale)}</p>}
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </Container>
        </section>
      )}

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
                    { key: "mission", title: t("mission"), text: mission, icon: Target },
                    { key: "vision", title: t("vision"), text: vision, icon: Eye },
                  ].map(({ key, title, text, icon }) =>
                    text ? (
                      <Reveal key={key} className="h-full" glass>
                        <div className={`${glass} h-full p-6 sm:p-8`}>
                          <h3 className="flex items-center gap-4 text-lg font-bold text-paper">
                            <IconBox icon={icon} />
                            {title}
                          </h3>
                          <p className="mt-2 text-sm text-paper/85 sm:text-base">{text}</p>
                        </div>
                      </Reveal>
                    ) : null,
                  )}
                </div>
              ) : null}
              {home.commitmentPoints?.length ? (
                <Reveal glass>
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

      {/* ── What we do: heading and intro centred, the From port to shelf
          steps in a row, a line branching to the three business lines
          (import, produce, export) side by side, then the Services CTA ── */}
      {cards.length ? (
        <section id="services" aria-labelledby="what-we-do" className="py-16 sm:py-24">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <SectionHeading id="what-we-do" eyebrow={t("ourServices")}>
                {t("whatWeDo")}
              </SectionHeading>
              {(home.whatWeDoIntro || services.intro) && <p className="mt-6 text-muted sm:text-lg">{tr(home.whatWeDoIntro ?? services.intro, locale)}</p>}
            </Reveal>
            <Reveal>
              <RouteStops steps={home.routeSteps} locale={locale} className="mt-14" />
            </Reveal>
          </Container>
          {/* Wider than the page column so the three lines have room */}
          <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
            <BranchConnector className="mt-10 lg:mt-0" color="text-steel-300" />
            <ul className="mt-10 grid gap-14 sm:mt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-steel-200">
              {cards.map((card) => {
                const Icon = cardIcons[card.section] ?? Ship;
                const items = itemsFor(card);
                return (
                  <li key={card._key} className="sm:px-6 lg:px-12 xl:px-16">
                    <Reveal className="h-full">
                      <Link href={`/services#${card.section}`} className="group flex h-full flex-col items-center text-center">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                          <PhotoFrame
                            image={card.image}
                            placeholder={placeholders[card.section] ?? placeholders.import}
                            locale={locale}
                            width={720}
                            height={540}
                            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 30vw, 92vw"
                            icon={Icon}
                            className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                          />
                        </div>
                        <h3 className="font-display-heading text-steel-gradient mt-7 text-3xl sm:text-4xl">{tr(card.title, locale)}</h3>
                        {card.description && <p className="mt-2 max-w-xs text-sm text-muted sm:text-base">{tr(card.description, locale)}</p>}
                        {items.names.length ? (
                          <ul className="mt-5 flex flex-wrap justify-center gap-1.5">
                            {items.names.slice(0, 4).map((name) => (
                              <li key={name} className="rounded-full bg-steel-100 px-3 py-1 text-xs font-semibold text-ink">
                                {name}
                              </li>
                            ))}
                            {items.names.length > 4 && (
                              <li className="rounded-full bg-steel-100 px-3 py-1 text-xs font-semibold text-ink">{t("moreItems", { count: items.names.length - 4 })}</li>
                            )}
                          </ul>
                        ) : null}
                        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink group-hover:text-red-ink">
                          {common("learnMore")}
                          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
          <Container>
            <div className="mt-14 flex justify-center">
              <ButtonLink href="/services" variant="red">
                {common("exploreServices")}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Brands we import: "main importer of …" highlight, the brand
          logos, then food and non-food side by side with their categories */}
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
                <p className="font-title-heading text-lg text-red-ink sm:text-xl">{t("mainImporter")}</p>
                <span aria-hidden="true" className="mt-4 block h-px bg-linear-to-r from-steel-400 to-transparent lg:bg-linear-to-l" />
                <ul className="mt-6 flex items-center gap-10 sm:gap-14 lg:justify-end">
                  {mainImporterLogos.map((logo) => (
                    <li key={logo.name}>
                      <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} unoptimized className={`w-auto object-contain ${logo.size}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
          {/* The portfolio as its brand logos */}
          <Container className="mt-12 sm:mt-14">
            <Reveal>
              <LogoWall locale={locale} />
            </Reveal>
          </Container>
          {/* Food | Non-food: what each covers and its categories, side by
              side; one CTA to the Services page */}
          <Container className="mt-16 sm:mt-20">
            <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-steel-200">
              {[
                { key: "food", icon: ShoppingBasket, label: svc("food"), text: home.foodInfo, categories: home.foodCategories },
                { key: "nonFood", icon: Sparkles, label: svc("nonFood"), text: home.nonFoodInfo, categories: home.nonFoodCategories },
              ].map(({ key, icon, label, text, categories }) => {
                return (
                  <Reveal key={key} className="md:px-10 md:first:pl-0 md:last:pr-0 lg:px-14">
                    <h3 className="flex items-center gap-4">
                      <IconBox icon={icon} />
                      <span className="font-display-heading text-steel-gradient text-3xl sm:text-4xl">{label}</span>
                    </h3>
                    {text && <p className="mt-5 leading-relaxed text-muted sm:text-lg">{tr(text, locale)}</p>}
                    {categories?.length ? (
                      <>
                        <p className="label-caps mt-8 text-red-ink">{t("categories")}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {categories.map((c) => (
                            <li key={c.en} className="rounded-full bg-steel-100 px-3.5 py-1.5 text-sm font-semibold text-ink">
                              {tr(c, locale)}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </Reveal>
                );
              })}
            </div>
          </Container>
          {/* Product items: the imported brands' products, scrolling */}
          <div className="mt-20 sm:mt-24">
            <BrandGrid brands={brands} icon={Package} label={t("featuredProducts")} locale={locale} />
          </div>
          <div className="mt-14 flex justify-center">
            <ButtonLink href="/services#import" variant="red">
              {t("allProducts")}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {/* ── Meet our team: heading and intro, the people, then a link to
          the Team page ─────────────────────────────────────────────── */}
      {teamMembers.length ? (
        <section id="team" aria-labelledby="team-heading" className="on-dark relative isolate overflow-hidden py-16 text-paper sm:py-24">
          <PhotoBackdrop image={home.teamImage} placeholder={placeholders.teamBand} locale={locale} icon={Users} overlay="bg-black/70" vignette />
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <SectionHeading id="team-heading" eyebrow={t("ourTeam")} onDark>
                  {t("meetTeam")}
                </SectionHeading>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {teamPage.intro && <p className="max-w-2xl text-paper/85 sm:text-lg">{tr(teamPage.intro, locale)}</p>}
              </div>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {teamMembers.slice(0, 4).map((m) => (
                <li key={m._id}>
                  <Reveal className="h-full">
                    <TeamCard member={m} locale={locale} />
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/team" variant="redOnDark">
                {t("viewTeam")}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

    </div>
  );
}

import { Building2, Coffee, Flame, Globe2, Plane, Ship, ShoppingBasket, Sparkles, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { RegionTree } from "@/components/RegionTree";
import { Reveal } from "@/components/Reveal";
import { EthiopiaMap } from "@/components/EthiopiaMap";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { BrandGrid, ExportTiles, ProducedGrid } from "@/components/ProductGrid";
import { RouteSteps } from "@/components/RouteSteps";
import { DistributionSection } from "@/components/DistributionSection";
import { LogoWall } from "@/components/Partners";
import { highlightEthiopia, SectionHeading } from "@/components/SectionHeading";
import { statIcon } from "@/components/stat-icons";
import { heroPlaceholders, placeholders } from "@/content/placeholders";
import type { ServiceSection } from "@/content/types";
import { getBrands, getExportItems, getHomePage, getProducedItems, getServicesPage, getSiteSettings, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [page, settings] = await Promise.all([getServicesPage(), getSiteSettings()]);
  return buildMetadata({
    locale,
    path: "/services",
    seo: page.seo,
    siteName: tr(settings.companyName, locale),
    fallbackTitle: tr(page.title, locale),
  });
}

// INTEMA's warehouses besides Addis Ababa (the head office, the map's main
// marker), as in the company profile; labels placed clear of each other and
// of Addis Ababa's, inside the map at every width.
const warehouses = [
  { key: "adama", label: "Adama", lat: 8.54, lng: 39.27, labelAt: "right" },
  { key: "dire-dawa", label: "Dire Dawa", lat: 9.6, lng: 41.85, labelAt: "above" },
  { key: "hawassa", label: "Hawassa", lat: 7.06, lng: 38.48, labelAt: "above" },
] as const;

// Why Ethiopia? reasons in order (consumers, cities, growth, trade corridor, hub, region), repeating.
const marketIcons = [Users, Building2, TrendingUp, Ship, Plane, Globe2];

// Sections are linked to by #id (e.g. from the home page's service cards).
const sectionClass = "scroll-mt-4 py-16 sm:py-24";

function ServiceHeading({
  id,
  number,
  title,
  tagline,
  intro,
  onDark = false,
}: {
  id: string;
  number: string;
  title: string;
  /** A short statement under the title, e.g. "Your Trusted Partner for Market Entry in Ethiopia". */
  tagline?: string;
  intro?: string;
  onDark?: boolean;
}) {
  return (
    <Reveal>
      <header className="flex max-w-3xl gap-5 sm:gap-8">
        <span
          aria-hidden="true"
          className={`font-display-heading text-6xl leading-none sm:text-8xl ${onDark ? "text-paper/30" : "text-steel-gradient"}`}
          lang="en"
        >
          {number}
        </span>
        <div>
          <SectionHeading id={id} onDark={onDark}>
            {title}
          </SectionHeading>
          {tagline && <p className={`font-title-heading mt-4 text-lg sm:text-xl ${onDark ? "text-paper" : "text-ink"}`}>{highlightEthiopia(tagline)}</p>}
          {/* Blank lines in the Studio text start new paragraphs */}
          {intro && <p className={`mt-4 whitespace-pre-line sm:text-lg ${onDark ? "text-paper/80" : "text-muted"}`}>{intro}</p>}
        </div>
      </header>
    </Reveal>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, home, brands, producedItems, exportItems, t] = await Promise.all([
    getServicesPage(),
    getHomePage(),
    getBrands(),
    getProducedItems(),
    getExportItems(),
    getTranslations("Services"),
  ]);

  const nonFood = brands.filter((b) => b.category === "nonFood");
  const food = brands.filter((b) => b.category === "food");

  const sections: { id: ServiceSection | "distribution"; title: string }[] = [
    { id: "import", title: tr(page.importHeading, locale) || t("import") },
    { id: "distribution", title: tr(page.distributionHeading, locale) || t("distribute") },
    { id: "produce", title: tr(page.produceHeading, locale) || t("produce") },
    { id: "export", title: tr(page.exportHeading, locale) || t("export") },
  ];
  const [importSec, distributionSec, produceSec, exportSec] = sections;
  // We Distribute: its own fields, else the Distribution step's (Home page → From port to shelf).
  const distributionStep = home.routeSteps?.find((step) => step._key === "distribution");
  const distributionIntro = tr(page.distributionIntro ?? distributionStep?.body, locale);
  const distributionBody = tr(page.distributionBody ?? distributionStep?.details, locale);

  return (
    <div className="flex flex-col bg-paper">
      <PageHero
        eyebrow={tr(page.eyebrow, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.services}
        locale={locale}
      />

      {/* ── Why Ethiopia? Market figures, with sources ─────────────── */}
      {page.marketStats?.length ? (
        <section id="market" aria-labelledby="market-heading" className="scroll-mt-4 relative isolate overflow-hidden py-16 sm:py-24">
          {/* Big map of Ethiopia to the right of the intro: cropped by the
              section's top edge (under the hero), its lower part covered by
              the stat cards. On phones it sits under the intro instead. */}
          <EthiopiaMap
            label={t("addisAbabaHq")}
            points={[...warehouses]}
            className="absolute -z-10 hidden opacity-30 sm:top-40 sm:-right-24 sm:block sm:w-[44rem] lg:-top-28 lg:right-[max(-14rem,calc((100vw-80rem)/2-13rem))] lg:w-[52rem] lg:opacity-100 xl:-top-40 xl:w-[58rem]"
          />
          <Container>
            <Reveal className="max-w-3xl lg:max-w-[46%]">
              <SectionHeading id="market-heading" eyebrow={t("marketEyebrow")}>
                {tr(page.marketHeading, locale)}
              </SectionHeading>
              {page.marketIntro && <p className="mt-6 text-muted sm:text-lg">{tr(page.marketIntro, locale)}</p>}
              <EthiopiaMap label={t("addisAbabaHq")} points={[...warehouses]} className="mx-auto mt-10 w-full max-w-sm sm:hidden" />
            </Reveal>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {page.marketStats.map((stat) => {
                const Icon = statIcon(stat._key);
                return (
                  <li key={stat._key}>
                    <Reveal className="h-full">
                      <div className="flex h-full flex-col rounded-3xl bg-paper p-6 shadow-sm ring-1 ring-black/5 sm:p-7">
                        <IconBox icon={Icon} />
                        <p className="font-display-heading text-steel-gradient mt-6 text-5xl leading-none" lang="en">
                          {stat.value}
                        </p>
                        <p className="mt-3 font-semibold text-ink">{tr(stat.label, locale)}</p>
                        {stat.note && <p className="mt-1 text-sm text-muted">{tr(stat.note, locale)}</p>}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
            {page.marketSource && <p className="mt-6 text-center text-xs text-muted italic">{tr(page.marketSource, locale)}</p>}
            {/* Reasons to enter Ethiopia, under the figures, split by thin grid
                lines (the list's colour showing through 1px gaps) */}
            {page.marketPoints?.length ? (
              <ul className="mt-14 grid gap-px bg-steel-200 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
                {page.marketPoints.map((point, i) => {
                  const Icon = marketIcons[i % marketIcons.length];
                  return (
                    <li key={point._key} className="bg-paper">
                      <Reveal className="flex h-full gap-4 py-7 sm:p-8">
                        <IconBox icon={Icon} />
                        <div>
                          <h3 className="font-title-heading text-base text-ink">{tr(point.title, locale)}</h3>
                          {point.body && <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{tr(point.body, locale)}</p>}
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : null}


        {/* ── We Import ─────────────────────────────────────────────── */}
        <section id="import" aria-labelledby="import-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="import-heading" number="01" title={importSec.title} tagline={tr(page.importTagline, locale)} intro={tr(page.importIntro, locale)} />
            {/* The brands we import, as logos */}
            <Reveal>
              <LogoWall locale={locale} className="mt-12 sm:mt-16" />
            </Reveal>
          </Container>
          <div className="mt-20 sm:mt-28">
            <BrandGrid brands={nonFood} icon={Sparkles} label={t("nonFood")} intro={tr(page.nonFoodIntro, locale)} introEnd={t("someImports")} locale={locale} />
            <BrandGrid brands={food} icon={ShoppingBasket} label={t("food")} intro={tr(page.foodIntro, locale)} introEnd={t("someImports")} reverse locale={locale} />
          </div>
        </section>

        {/* ── We Distribute: the map of stores and the details, then photos from the stores ── */}
        <section id="distribution" aria-labelledby="distribution-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="distribution-heading" number="02" title={distributionSec.title} tagline={tr(page.distributionTagline, locale)} intro={distributionIntro} />
          </Container>
          <DistributionSection
            locale={locale}
            stores={page.distributionStores}
            facts={page.distributionFacts}
            points={page.distributionPoints}
            details={distributionBody}
            galleryIntro={tr(page.distributionGalleryIntro, locale)}
            gallery={page.distributionGallery}
            labels={{
              andMuchMore: t("andMuchMore"),
              onTheShelves: t("onTheShelves"),
              network: t("networkHeading"),
              headOffice: t("headOffice"),
              kinds: { warehouse: t("kindWarehouse"), depot: t("kindDepot"), partner: t("kindPartner") },
              gallery: { previous: t("galleryPrevious"), next: t("galleryNext"), close: t("galleryClose"), open: t("galleryOpen") },
            }}
          />
        </section>

        {/* ── We Produce ────────────────────────────────────────────── */}
        <section id="produce" aria-labelledby="produce-heading" className={`${sectionClass} on-dark relative isolate overflow-hidden text-paper`}>
          {/* Full-width background: a factory floor under a heavy near-black
              shade, so the text and products stay readable */}
          <PhotoBackdrop image={page.produceImage} placeholder={placeholders.produceBand} locale={locale} icon={Flame} overlay="bg-black/75" vignette />
          <Container>
            <ServiceHeading id="produce-heading" number="03" title={produceSec.title} intro={tr(page.produceIntro, locale)} onDark />
          </Container>
          <div className="mt-16 sm:mt-20">
            <ProducedGrid products={producedItems} icon={Flame} label={t("ourProducts")} intro={tr(page.productsIntro, locale)} onDark locale={locale} />
          </div>
        </section>

        {/* ── We Export ─────────────────────────────────────────────── */}
        <section id="export" aria-labelledby="export-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="export-heading" number="04" title={exportSec.title} intro={tr(page.exportIntro, locale)} />
          </Container>
          {/* Two columns: the export brands' heading, intro and the coffee story | the brand tiles */}
          <Container className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-[calc(var(--bar-h)+3rem)] lg:self-start">
              <h3 className="flex items-center gap-4">
                <IconBox icon={Coffee} />
                <span className="font-display-heading text-steel-gradient text-3xl sm:text-4xl">{t("exportBrands")}</span>
              </h3>
              {page.exportBrandsIntro && <p className="mt-5 text-muted sm:text-lg">{tr(page.exportBrandsIntro, locale)}</p>}
              {page.exportBody && <p className="mt-5 leading-relaxed text-muted">{tr(page.exportBody, locale)}</p>}
            </Reveal>
            <div className="lg:col-span-7">
              <ExportTiles brands={exportItems} label={t("exportBrands")} locale={locale} />
            </div>
          </Container>
          <Container>
            {/* Target markets: heading branching to each region's map (Figma: Frame 19) */}
            <RegionTree heading={t("targetMarkets")} regions={page.exportMarkets ?? []} locale={locale} className="mt-24 sm:mt-32" />
          </Container>
        </section>

      {/* ── The other services: the route from port to shelf ────────── */}
      <RouteSteps
        locale={locale}
        id="services-route-heading"
        eyebrow={t("routeEyebrow")}
        heading={tr(page.routeHeading, locale)}
        intro={tr(page.routeIntro, locale)}
        className="pt-0 sm:pt-0"
      />

      {/* ── Our value proposition: a closing band, centred over a shaded photo ── */}
      {page.valueHeading && (
        <section aria-labelledby="value-heading" className="pb-16 sm:pb-24">
          <Container>
            <Reveal>
              <div className="on-dark relative isolate overflow-hidden rounded-[1.75rem] px-6 py-16 text-center text-paper sm:rounded-[2rem] sm:px-12 sm:py-24 lg:px-16">
                <PhotoBackdrop image={page.valueImage} placeholder={placeholders.valueBand} locale={locale} icon={ShoppingBasket} overlay="bg-black/65" vignette />
                <div className="mx-auto max-w-3xl">
                  <SectionHeading id="value-heading" eyebrow={t("valueEyebrow")} onDark>
                    {tr(page.valueHeading, locale)}
                  </SectionHeading>
                  {page.valueBody && <p className="mx-auto mt-6 max-w-2xl text-paper/85 sm:text-lg">{tr(page.valueBody, locale)}</p>}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}
    </div>
  );
}

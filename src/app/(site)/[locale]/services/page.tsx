import { Coffee, Flame, ShoppingBasket, Sparkles } from "lucide-react";
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
import { ProductPreviewProvider } from "@/components/ProductPreview";
import { SectionHeading } from "@/components/SectionHeading";
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

// Sections are linked to by #id (e.g. from the home page's service cards).
const sectionClass = "scroll-mt-4 py-16 sm:py-24";

function ServiceHeading({
  id,
  number,
  title,
  intro,
  onDark = false,
}: {
  id: string;
  number: string;
  title: string;
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
          {intro && <p className={`mt-4 sm:text-lg ${onDark ? "text-paper/80" : "text-muted"}`}>{intro}</p>}
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
        <section aria-labelledby="market-heading" className="relative isolate overflow-hidden py-16 sm:py-24">
          {/* Big map of Ethiopia to the right of the intro: cropped by the
              section's top edge (under the hero), its lower part covered by
              the stat cards. On phones it sits under the intro instead. */}
          <EthiopiaMap
            label={t("addisAbaba")}
            className="absolute -z-10 hidden opacity-30 sm:top-40 sm:-right-24 sm:block sm:w-[44rem] lg:-top-28 lg:right-[max(-14rem,calc((100vw-80rem)/2-13rem))] lg:w-[52rem] lg:opacity-50 xl:w-[58rem]"
          />
          <Container>
            <Reveal className="max-w-3xl lg:max-w-[46%]">
              <SectionHeading id="market-heading" eyebrow={t("marketEyebrow")}>
                {tr(page.marketHeading, locale)}
              </SectionHeading>
              {page.marketIntro && <p className="mt-6 text-muted sm:text-lg">{tr(page.marketIntro, locale)}</p>}
              <EthiopiaMap label={t("addisAbaba")} className="mx-auto mt-10 w-full max-w-sm sm:hidden" />
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
          </Container>
        </section>
      ) : null}

      <ProductPreviewProvider>

        {/* ── We Import ─────────────────────────────────────────────── */}
        <section id="import" aria-labelledby="import-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="import-heading" number="01" title={importSec.title} intro={tr(page.importIntro, locale)} />
            {/* Where we source: heading branching to each region's map, as Target markets */}
            <RegionTree heading={t("sourcingHeading")} regions={page.sourcingRegions ?? []} locale={locale} className="mt-16 sm:mt-20" />
          </Container>
          <div className="mt-20 sm:mt-28">
            <BrandGrid brands={nonFood} icon={Sparkles} label={t("nonFood")} intro={tr(page.nonFoodIntro, locale)} locale={locale} />
            <BrandGrid brands={food} icon={ShoppingBasket} label={t("food")} intro={tr(page.foodIntro, locale)} reverse locale={locale} />
          </div>
        </section>

        {/* ── We Distribute: the map of stores and the details, then photos from the stores ── */}
        <section id="distribution" aria-labelledby="distribution-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="distribution-heading" number="02" title={distributionSec.title} intro={distributionIntro} />
          </Container>
          <DistributionSection
            locale={locale}
            stores={page.distributionStores}
            details={distributionBody}
            galleryIntro={tr(page.distributionGalleryIntro, locale)}
            gallery={page.distributionGallery}
            labels={{ andMuchMore: t("andMuchMore"), onTheShelves: t("onTheShelves") }}
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
      </ProductPreviewProvider>

      {/* ── The other services: the route from port to shelf ────────── */}
      <RouteSteps
        locale={locale}
        id="services-route-heading"
        eyebrow={t("routeEyebrow")}
        heading={tr(page.routeHeading, locale)}
        intro={tr(page.routeIntro, locale)}
        className="pt-0 sm:pt-0"
      />
    </div>
  );
}

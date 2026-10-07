import { Coffee, Flame, Globe2, Plane, ShoppingBasket, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { panel } from "@/components/panel";
import { Reveal } from "@/components/Reveal";
import { GetInTouch } from "@/components/GetInTouch";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { BrandGrid, ExportGrid, ProducedGrid } from "@/components/ProductGrid";
import { RouteSteps } from "@/components/RouteSteps";
import { ProductPreviewProvider } from "@/components/ProductPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { statIcon } from "@/components/stat-icons";
import { heroPlaceholders, placeholders } from "@/content/placeholders";
import type { ServiceSection } from "@/content/types";
import { getBrands, getExportItems, getProducedItems, getServicesPage, getSiteSettings, tr } from "@/lib/content";
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

function SubHeading({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <h3 className={`label-caps mb-5 flex items-center gap-3 ${onDark ? "text-paper" : "text-ink"}`}>
      <span aria-hidden="true" className="red-gradient size-2 rounded-full" />
      {children}
    </h3>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, brands, producedItems, exportItems, t] = await Promise.all([
    getServicesPage(),
    getBrands(),
    getProducedItems(),
    getExportItems(),
    getTranslations("Services"),
  ]);

  const nonFood = brands.filter((b) => b.category === "nonFood");
  const food = brands.filter((b) => b.category === "food");

  const sections: { id: ServiceSection; title: string }[] = [
    { id: "import", title: tr(page.importHeading, locale) || t("import") },
    { id: "produce", title: tr(page.produceHeading, locale) || t("produce") },
    { id: "export", title: tr(page.exportHeading, locale) || t("export") },
  ];
  const [importSec, produceSec, exportSec] = sections;

  return (
    <div className="flex flex-col bg-steel-100">
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
        <section aria-labelledby="market-heading" className="py-16 sm:py-24">
          <Container>
            <Reveal className="max-w-3xl">
              <SectionHeading id="market-heading" eyebrow={t("marketEyebrow")}>
                {tr(page.marketHeading, locale)}
              </SectionHeading>
              {page.marketIntro && <p className="mt-6 text-muted sm:text-lg">{tr(page.marketIntro, locale)}</p>}
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
            {page.marketSource && <p className="mt-6 text-xs text-muted">{tr(page.marketSource, locale)}</p>}
          </Container>
        </section>
      ) : null}

      <ProductPreviewProvider>

        {/* ── We Import ─────────────────────────────────────────────── */}
        <section id="import" aria-labelledby="import-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="import-heading" number="01" title={importSec.title} intro={tr(page.importIntro, locale)} />
            {/* Where we source: the regions brands are imported from */}
            {page.sourcingRegions?.length ? (
              <Reveal className="mt-10">
                <SubHeading>{t("sourcingHeading")}</SubHeading>
                <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                  {page.sourcingRegions.map((region) => (
                    <li key={region._key} className="flex items-start gap-4 rounded-3xl bg-paper p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
                      <IconBox icon={Globe2} />
                      <div>
                        <p className="font-title-heading text-lg text-ink">{tr(region.title, locale)}</p>
                        {region.body && <p className="mt-1 text-sm text-muted">{tr(region.body, locale)}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </Container>
          <div className="mt-12">
            <BrandGrid brands={nonFood} icon={Sparkles} label={t("nonFood")} intro={tr(page.nonFoodIntro, locale)} locale={locale} />
            <BrandGrid brands={food} icon={ShoppingBasket} label={t("food")} intro={tr(page.foodIntro, locale)} reverse locale={locale} />
          </div>
        </section>

        {/* ── We Produce ────────────────────────────────────────────── */}
        <div className="px-3 sm:px-4">
        <section id="produce" aria-labelledby="produce-heading" className={`${sectionClass} on-dark relative isolate text-paper ${panel}`}>
          {/* Background: a stocked supermarket aisle under a heavy near-black
              shade, so the text and product cards stay readable */}
          <PhotoBackdrop image={page.produceImage} placeholder={placeholders.produceBand} locale={locale} icon={Flame} overlay="bg-black/75" vignette />
          <Container>
            <ServiceHeading id="produce-heading" number="02" title={produceSec.title} intro={tr(page.produceIntro, locale)} onDark />
          </Container>
          <div className="mt-12">
            <ProducedGrid products={producedItems} icon={Flame} label={t("ourProducts")} intro={tr(page.productsIntro, locale)} onDark locale={locale} />
          </div>
        </section>
        </div>

        {/* ── We Export ─────────────────────────────────────────────── */}
        <section id="export" aria-labelledby="export-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="export-heading" number="03" title={exportSec.title} intro={tr(page.exportIntro, locale)} />
          </Container>
          <div className="mt-12">
            <ExportGrid brands={exportItems} icon={Coffee} label={t("exportBrands")} intro={tr(page.exportBrandsIntro, locale)} locale={locale} />
          </div>
          <Container className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 sm:mt-20">
            {page.exportBody && (
              <Reveal className="lg:col-span-6">
                <p className="text-base leading-relaxed text-muted sm:text-lg">{tr(page.exportBody, locale)}</p>
              </Reveal>
            )}
            {page.exportMarkets?.length ? (
              <Reveal className="lg:col-span-5 lg:col-start-8">
                <div className="rounded-[1.75rem] bg-paper p-7 shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] sm:p-9">
                  <SubHeading>{t("targetMarkets")}</SubHeading>
                  <ul className="divide-y divide-steel-200">
                    {page.exportMarkets.map((m) => (
                      <li key={m.en} className="flex items-center gap-4 py-4 text-lg font-bold text-ink first:pt-0 last:pb-0">
                        <IconBox icon={Plane} />
                        {tr(m, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </Container>
        </section>
      </ProductPreviewProvider>

      {/* ── The other services: the route from port to shelf ────────── */}
      <RouteSteps locale={locale} className="pt-0 sm:pt-0" />

      <Reveal className="px-3 pb-3 sm:px-4 sm:pb-4">
        <GetInTouch locale={locale} className={panel} />
      </Reveal>
    </div>
  );
}

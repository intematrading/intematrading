import { Coffee, Flame, Plane, ShoppingBasket, Sparkles, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PhotoFrame } from "@/components/PhotoFrame";
import { panel } from "@/components/panel";
import { Reveal } from "@/components/Reveal";
import { GetInTouch } from "@/components/GetInTouch";
import { IconBox } from "@/components/IconBox";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { ProductPreviewProvider } from "@/components/ProductPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { heroPlaceholders, placeholders, productPlaceholders } from "@/content/placeholders";
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
const sectionClass = "scroll-mt-4 py-20 sm:py-28";

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

// Card width (w-80) + gap, and the widest screen a single copy must cover.
const CARD_STEP = 344;
const MIN_COPY_WIDTH = 2000;

/**
 * A category: icon, title and description aligned to the right (so it reads
 * as a sub-level, clear of the left-hand section heading), then a full-bleed
 * row of auto-scrolling product cards. Short rows are repeated so the loop
 * never shows a gap; speed stays ~constant per card.
 */
function ProductRow({
  icon: Icon,
  label,
  intro,
  count,
  onDark = false,
  reverse = false,
  children,
}: {
  icon: LucideIcon;
  label: string;
  intro?: string;
  count: number;
  onDark?: boolean;
  /** Scroll this row towards the right. */
  reverse?: boolean;
  children: React.ReactNode;
}) {
  if (!count) return null;
  const repeat = Math.max(1, Math.ceil(MIN_COPY_WIDTH / (count * CARD_STEP)));
  return (
    <div className="mt-16 first:mt-0 sm:mt-20">
      <Container className="mb-8 flex flex-col items-end text-right">
        <h3 className="flex items-center gap-4">
          <IconBox icon={Icon} />
          <span className={`font-display-heading text-2xl sm:text-3xl ${onDark ? "text-paper" : "text-steel-gradient"}`}>{label}</span>
        </h3>
        {intro && <p className={`mt-3 max-w-xl text-base ${onDark ? "text-paper/75" : "text-muted"}`}>{intro}</p>}
      </Container>
      <Marquee label={label} seconds={count * repeat * 6} repeat={repeat} reverse={reverse} feather={8}>
        {children}
      </Marquee>
    </div>
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

      <ProductPreviewProvider>

        {/* ── We Import ─────────────────────────────────────────────── */}
        <section id="import" aria-labelledby="import-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="import-heading" number="01" title={importSec.title} intro={tr(page.importIntro, locale)} />
          </Container>
          <div className="mt-12">
            {[
              { key: "nonFood", label: t("nonFood"), intro: page.nonFoodIntro, list: nonFood, icon: Sparkles, reverse: false },
              { key: "food", label: t("food"), intro: page.foodIntro, list: food, icon: ShoppingBasket, reverse: true },
            ].map(({ key, label, intro, list, icon, reverse }) => (
              <ProductRow key={key} icon={icon} reverse={reverse} label={label} intro={tr(intro, locale)} count={list.length}>
                {list.map((brand) => (
                  <ProductCard
                    key={brand._id}
                    openLabel={t("viewItem", { name: brand.name })}
                    title={brand.name}
                    meta={brand.subBrands?.join(" · ")}
                    description={tr(brand.description, locale)}
                    image={brand.image}
                    placeholder={productPlaceholders[brand._id]}
                    locale={locale}
                  />
                ))}
              </ProductRow>
            ))}
          </div>
        </section>

        {/* ── We Produce ────────────────────────────────────────────── */}
        <div className="px-3 sm:px-4">
        <section id="produce" aria-labelledby="produce-heading" className={`${sectionClass} on-dark relative isolate text-paper ${panel}`}>
          {/* Background: a stocked supermarket aisle under a heavy near-black
              shade, so the text and product cards stay readable */}
          <div className="absolute inset-0 -z-20">
            <PhotoFrame
              image={undefined}
              placeholder={placeholders.produceBand}
              locale={locale}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 84rem, 100vw"
              icon={Flame}
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/75" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.6)_100%)]" />
          <Container>
            <ServiceHeading id="produce-heading" number="02" title={produceSec.title} intro={tr(page.produceIntro, locale)} onDark />
          </Container>
          <div className="mt-12">
            <ProductRow icon={Flame} label={t("ourProducts")} intro={tr(page.productsIntro, locale)} count={producedItems.length} onDark>
              {producedItems.map((item) => (
                <ProductCard
                  key={item._id}
                  openLabel={t("viewItem", { name: tr(item.name, locale) })}
                  title={tr(item.name, locale)}
                  label={tr(item.category, locale)}
                  description={tr(item.description, locale)}
                  image={item.image}
                  placeholder={productPlaceholders[item._id]}
                  locale={locale}
                  tone="dark"
                />
              ))}
            </ProductRow>
          </div>
        </section>
        </div>

        {/* ── We Export ─────────────────────────────────────────────── */}
        <section id="export" aria-labelledby="export-heading" className={sectionClass}>
          <Container>
            <ServiceHeading id="export-heading" number="03" title={exportSec.title} intro={tr(page.exportIntro, locale)} />
          </Container>
          <div className="mt-12">
            <ProductRow
              icon={Coffee}
              label={t("exportBrands")}
              intro={tr(page.exportBrandsIntro, locale)}
              count={exportItems.length}
            >
              {exportItems.map((b) => (
                <ProductCard
                  key={b._id}
                  openLabel={t("viewItem", { name: b.name })}
                  title={b.name}
                  description={tr(b.description, locale)}
                  image={b.image}
                  placeholder={productPlaceholders[b._id]}
                  locale={locale}
                />
              ))}
            </ProductRow>
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

      <Reveal className="px-3 pb-3 sm:px-4 sm:pb-4">
        <GetInTouch locale={locale} className={panel} />
      </Reveal>
    </div>
  );
}

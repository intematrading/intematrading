import { ArrowUpRight, Package, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { productPlaceholders, type Placeholder } from "@/content/placeholders";
import type { Brand, ExportItem, ProducedItem, SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { Container } from "./Container";
import { IconBox } from "./IconBox";
import { Marquee } from "./Marquee";
import { PhotoFrame } from "./PhotoFrame";
import { ProductPreviewTrigger } from "./ProductPreview";
import { Reveal } from "./Reveal";

type GridItem = {
  key: string;
  title: string;
  /** Small chip over the photo, e.g. "Soap". */
  label?: string;
  /** Extra line in the popup, e.g. sub-brands. */
  meta?: string;
  description?: string;
  image?: SanityImage;
  placeholder?: Placeholder;
};

/**
 * One product category (imported brands, produced items or export brands, on
 * Home and the Services page): its icon, title and description in
 * one column, and an even grid of small product tiles in the other, 3 across
 * (2 on phones), no scrolling, or with `carousel` (Services) the heading
 * above an auto-scrolling row (a plain row for 2–3 items, one large feature
 * for a single item). `reverse` puts the tiles on the left; `onDark`
 * styles the text for a dark panel. Tiles open the shared product popup
 * inside a ProductPreviewProvider.
 */
/**
 * One product, editorial style: a rounded photo with no card around it
 * (optional chip; a red arrow slides in on hover), then the item's number
 * and name under a thin rule. Opens the product popup. `onDark` lightens
 * the text for the dark We Produce panel.
 */
function ProductTile({ item, index, onDark, locale, viewLabel }: { item: GridItem; index: number; onDark: boolean; locale: Locale; viewLabel: string }) {
  return (
    <article className="group relative h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <PhotoFrame
          image={item.image}
          placeholder={item.placeholder}
          locale={locale}
          width={480}
          height={600}
          sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
          icon={Package}
          className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {item.label && (
          <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-paper uppercase ring-1 ring-white/25 backdrop-blur-md">
            {item.label}
          </span>
        )}
        <span aria-hidden="true" className="absolute top-3 right-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-red text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      {/* Rule fading out at both ends */}
      <span aria-hidden="true" className={`mt-4 block h-px bg-linear-to-r from-transparent to-transparent ${onDark ? "via-white/35" : "via-steel-300"}`} />
      <div className="mt-3 flex items-baseline gap-3">
        <span aria-hidden="true" className={`font-display-heading text-xl ${onDark ? "text-paper/60" : "text-steel-gradient"}`} lang="en">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h4 className={`font-title-heading text-base ${onDark ? "text-paper" : "text-ink"}`}>{item.title}</h4>
          {item.description && <p className={`mt-0.5 text-sm ${onDark ? "text-paper/75" : "text-muted"}`}>{item.description}</p>}
        </div>
      </div>
      <ProductPreviewTrigger
        label={viewLabel}
        data={{
          title: item.title,
          label: item.label,
          meta: item.meta,
          description: item.description,
          media: (
            <PhotoFrame
              image={item.image}
              placeholder={item.placeholder}
              locale={locale}
              width={900}
              height={675}
              sizes="(min-width: 768px) 28rem, 100vw"
              icon={Package}
            />
          ),
        }}
      />
    </article>
  );
}

export async function ProductGrid({
  items,
  icon: Icon,
  label,
  intro,
  reverse = false,
  onDark = false,
  carousel = false,
  locale,
}: {
  items: GridItem[];
  icon: LucideIcon;
  label: string;
  intro?: string;
  reverse?: boolean;
  onDark?: boolean;
  /** The heading above a full-width, auto-scrolling row of tiles instead of beside a grid (`reverse` flips the scroll direction). */
  carousel?: boolean;
  locale: Locale;
}) {
  if (!items.length) return null;
  const t = await getTranslations("Services");
  const heading = (
    <h3 className="flex items-center gap-4">
      <IconBox icon={Icon} />
      <span className={`font-display-heading text-3xl sm:text-4xl ${onDark ? "text-paper" : "text-steel-gradient"}`}>{label}</span>
    </h3>
  );
  if (carousel) {
    const tile = (item: GridItem, i: number) => (
      <ProductTile item={item} index={i} onDark={onDark} locale={locale} viewLabel={t("viewItem", { name: item.title })} />
    );
    return (
      <div className="mt-24 first:mt-0 sm:mt-32">
        {/* A single product stands on its own, without the group heading */}
        {items.length > 1 && (
          <Container>
            <Reveal className="max-w-2xl">
              {heading}
              {intro && <p className={`mt-5 sm:text-lg ${onDark ? "text-paper/80" : "text-muted"}`}>{intro}</p>}
            </Reveal>
          </Container>
        )}
        {items.length === 1 ? (
          // A single product: a large photo with its name and description beside it (no popup)
          <Container>
            <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-2xl sm:rounded-[2rem] lg:col-span-7">
                <PhotoFrame
                  image={items[0].image}
                  placeholder={items[0].placeholder}
                  locale={locale}
                  width={1200}
                  height={750}
                  sizes="(min-width: 1024px) 46rem, 100vw"
                  icon={Package}
                />
              </div>
              <div className="lg:col-span-5">
                {items[0].label && (
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${onDark ? "bg-white/15 text-paper ring-1 ring-white/25" : "bg-steel-100 text-ink"}`}>
                    {items[0].label}
                  </span>
                )}
                <h3 className={`font-display-heading mt-5 text-5xl sm:text-6xl ${onDark ? "text-paper" : "text-steel-gradient"}`}>{items[0].title}</h3>
                <span aria-hidden="true" className={`mt-6 block h-px w-24 ${onDark ? "bg-white/30" : "bg-steel-300"}`} />
                {items[0].description && <p className={`mt-6 max-w-lg leading-relaxed whitespace-pre-line sm:text-lg ${onDark ? "text-paper/85" : "text-muted"}`}>{items[0].description}</p>}
              </div>
            </Reveal>
          </Container>
        ) : items.length < 4 ? (
          // Too few to loop: a plain row at the same tile size
          <Container className="mt-12">
            <ul aria-label={label} className="flex flex-wrap gap-x-10 gap-y-12">
              {items.map((item, i) => (
                <li key={item.key} className="w-64 sm:w-72">
                  <Reveal className="h-full">{tile(item, i)}</Reveal>
                </li>
              ))}
            </ul>
          </Container>
        ) : (
          <div className="mt-12">
            {/* Short rows repeat so one pass is wider than the screen */}
            <Marquee
              label={label}
              seconds={items.length * 6}
              repeat={items.length < 6 ? 2 : 1}
              reverse={reverse}
              feather={6}
              gap="gap-8 sm:gap-10"
              separator={
                // Where the loop starts over: a wide gap with a small red diamond on a fading vertical line
                <li aria-hidden="true" className="flex w-16 shrink-0 items-center justify-center self-stretch sm:w-24">
                  <span className={`relative h-3/5 w-px bg-linear-to-b from-transparent to-transparent ${onDark ? "via-white/40" : "via-steel-300"}`}>
                    <span className="absolute top-1/2 left-1/2 size-2.5 -translate-1/2 rotate-45 bg-red" />
                  </span>
                </li>
              }
            >
              {items.map((item, i) => (
                <li key={item.key} className="w-64 shrink-0 sm:w-72">
                  {tile(item, i)}
                </li>
              ))}
            </Marquee>
          </div>
        )}
      </div>
    );
  }
  return (
    <Container className="mt-16 grid gap-10 first:mt-0 sm:mt-20 lg:grid-cols-12 lg:gap-14">
      {/* Text: stays in view beside the grid while it scrolls */}
      <Reveal className={`lg:sticky lg:top-[calc(var(--bar-h)+3rem)] lg:col-span-4 lg:self-start ${reverse ? "lg:order-last lg:col-start-9" : ""}`}>
        {heading}
        {intro && <p className={`mt-4 max-w-md sm:text-lg ${onDark ? "text-paper/80" : "text-muted"}`}>{intro}</p>}
      </Reveal>
      <ul aria-label={label} className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:col-span-8 ${reverse ? "lg:col-start-1" : ""}`}>
        {items.map((item, i) => (
          <li key={item.key}>
            <Reveal className="h-full">
              <ProductTile item={item} index={i} onDark={onDark} locale={locale} viewLabel={t("viewItem", { name: item.title })} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}

type Shared = { icon: LucideIcon; label: string; intro?: string; reverse?: boolean; onDark?: boolean; carousel?: boolean; locale: Locale };

/** Imported brands of one category. */
export function BrandGrid({ brands, ...props }: Shared & { brands: Brand[] }) {
  return (
    <ProductGrid
      {...props}
      items={brands.map((b) => ({
        key: b._id,
        title: b.name,
        meta: b.subBrands?.join(" · "),
        description: tr(b.description, props.locale),
        image: b.image,
        placeholder: productPlaceholders[b._id],
      }))}
    />
  );
}

/** INTEMA's own products (Abay candles, soaps). */
export function ProducedGrid({ products, ...props }: Shared & { products: ProducedItem[] }) {
  return (
    <ProductGrid
      {...props}
      items={products.map((p) => ({
        key: p._id,
        title: tr(p.name, props.locale),
        label: tr(p.category, props.locale),
        description: tr(p.description, props.locale),
        image: p.image,
        placeholder: productPlaceholders[p._id],
      }))}
    />
  );
}

/** Just the export brands' tiles, side by side (Services: beside the export text). */
export async function ExportTiles({ brands, label, locale }: { brands: ExportItem[]; label: string; locale: Locale }) {
  if (!brands.length) return null;
  const t = await getTranslations("Services");
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10">
      {brands.map((b, i) => {
        const item: GridItem = { key: b._id, title: b.name, description: tr(b.description, locale), image: b.image, placeholder: productPlaceholders[b._id] };
        return (
          <li key={item.key}>
            <Reveal className="h-full">
              <ProductTile item={item} index={i} onDark={false} locale={locale} viewLabel={t("viewItem", { name: item.title })} />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

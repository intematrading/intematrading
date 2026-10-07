import { Package, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { productPlaceholders, type Placeholder } from "@/content/placeholders";
import type { Brand, ExportItem, ProducedItem, SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { Container } from "./Container";
import { IconBox } from "./IconBox";
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
 * Home and the Services page): its icon, title, description and item count in
 * one column, and an even grid of small product tiles in the other, 3 across
 * (2 on phones), no scrolling. `reverse` puts the tiles on the left; `onDark`
 * styles the text for a dark panel. Tiles open the shared product popup
 * inside a ProductPreviewProvider.
 */
export async function ProductGrid({
  items,
  icon: Icon,
  label,
  intro,
  count,
  reverse = false,
  onDark = false,
  locale,
}: {
  items: GridItem[];
  icon: LucideIcon;
  label: string;
  intro?: string;
  /** e.g. "6 brands". */
  count: string;
  reverse?: boolean;
  onDark?: boolean;
  locale: Locale;
}) {
  if (!items.length) return null;
  const t = await getTranslations("Services");
  return (
    <Container className="mt-16 grid gap-10 first:mt-0 sm:mt-20 lg:grid-cols-12 lg:gap-14">
      {/* Text: stays in view beside the grid while it scrolls */}
      <Reveal className={`lg:sticky lg:top-[calc(var(--bar-h)+3rem)] lg:col-span-4 lg:self-start ${reverse ? "lg:order-last lg:col-start-9" : ""}`}>
        <h3 className="flex items-center gap-4">
          <IconBox icon={Icon} />
          <span className={`font-display-heading text-3xl sm:text-4xl ${onDark ? "text-paper" : "text-steel-gradient"}`}>{label}</span>
        </h3>
        {intro && <p className={`mt-4 max-w-md sm:text-lg ${onDark ? "text-paper/80" : "text-muted"}`}>{intro}</p>}
        <p className={`label-caps mt-6 ${onDark ? "text-paper" : "text-red-ink"}`}>{count}</p>
      </Reveal>
      <ul aria-label={label} className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-8 ${reverse ? "lg:col-start-1" : ""}`}>
        {items.map((item) => (
          <li key={item.key}>
            <Reveal className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <PhotoFrame
                    image={item.image}
                    placeholder={item.placeholder}
                    locale={locale}
                    width={480}
                    height={480}
                    sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
                    icon={Package}
                    className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  {item.label && (
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-black/45 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-paper uppercase ring-1 ring-white/25 backdrop-blur-md">
                      {item.label}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-title-heading text-sm text-ink">{item.title}</h4>
                  {item.description && <p className="mt-0.5 text-xs text-muted">{item.description}</p>}
                </div>
                <ProductPreviewTrigger
                  label={t("viewItem", { name: item.title })}
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
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}

type Shared = { icon: LucideIcon; label: string; intro?: string; reverse?: boolean; onDark?: boolean; locale: Locale };

/** Imported brands of one category. */
export async function BrandGrid({ brands, ...props }: Shared & { brands: Brand[] }) {
  const t = await getTranslations("Services");
  return (
    <ProductGrid
      {...props}
      count={t("brandCount", { count: brands.length })}
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
export async function ProducedGrid({ products, ...props }: Shared & { products: ProducedItem[] }) {
  const t = await getTranslations("Services");
  return (
    <ProductGrid
      {...props}
      count={t("productCount", { count: products.length })}
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

/** Coffee export brands. */
export async function ExportGrid({ brands, ...props }: Shared & { brands: ExportItem[] }) {
  const t = await getTranslations("Services");
  return (
    <ProductGrid
      {...props}
      count={t("brandCount", { count: brands.length })}
      items={brands.map((b) => ({
        key: b._id,
        title: b.name,
        description: tr(b.description, props.locale),
        image: b.image,
        placeholder: productPlaceholders[b._id],
      }))}
    />
  );
}

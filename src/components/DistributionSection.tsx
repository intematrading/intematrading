import { Ellipsis, ImageIcon, MapPin, ShoppingCart, Store, type LucideIcon } from "lucide-react";
import type { GalleryImage, MapStore } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { CmsImage } from "./CmsImage";
import { Container } from "./Container";
import { IconBox } from "./IconBox";
import { Reveal } from "./Reveal";

// Blank tiles shown until photos are added in the Studio (fills the mosaic once).
const PLACEHOLDER_TILES = 5;

// The map's six pins, in order (the first five where the Figma design places
// them, the sixth, "and more", top right): the top centre of each
// pin's head, as % of the drawing, with its tip 30% lower. The end pins'
// bubbles lean inwards so they stay on screen.
const pins = [
  { x: 5.5, y: 42.2, lean: "start" },
  { x: 38.9, y: 60.9, lean: "center" },
  { x: 41.4, y: 0.1, lean: "center" },
  { x: 71.4, y: 23.9, lean: "center" },
  { x: 94.7, y: 60.9, lean: "end" },
  { x: 94.5, y: 2, lean: "end" },
] as const;
// Pin height, head to tip, as % of the drawing's height; pins are drawn up from the design's tips.
const PIN = 20;
const tipY = (pin: (typeof pins)[number]) => pin.y + 30;
const headY = (pin: (typeof pins)[number]) => tipY(pin) - PIN;

// The drawing's shape (as in Figma): 1000 wide, so its viewBox height is 478.7.
const MAP_W = 1000;
const MAP_H = 478.7;
// Dotted routes between pins (by index), as in the Figma design, plus the fourth to the sixth.
const routes: [number, number][] = [
  [0, 2],
  [0, 1],
  [2, 3],
  [1, 3],
  [3, 4],
  [1, 4],
  [3, 5],
];

/** A smooth upward arc from pin `a`'s tip to pin `b`'s, bulging by a third of the distance between them. */
function routePath(a: (typeof pins)[number], b: (typeof pins)[number]) {
  const [x1, y1] = [(a.x / 100) * MAP_W, (tipY(a) / 100) * MAP_H];
  const [x2, y2] = [(b.x / 100) * MAP_W, (tipY(b) / 100) * MAP_H];
  const bulge = Math.hypot(x2 - x1, y2 - y1) / 3;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${(Math.min(y1, y2) - bulge).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

const leanClass = { start: "-translate-x-[18%]", center: "-translate-x-1/2", end: "-translate-x-[82%]" };
const tailClass = { start: "left-[18%]", center: "left-1/2", end: "left-[82%]" };

/**
 * A map pin: the outline of Hugeicons "Location 01" (MIT,
 * @hugeicons/core-free-icons), filled light grey so the routes don't show
 * through, with a fixed line weight however large it's drawn. Its inner
 * circle is enlarged (r 6.5 at 12,10 of the 24 viewBox) and white, holding
 * the store's logo, "…" on the "and more" pin, or a placeholder image icon.
 * The pin spans y 2–22 of the viewBox.
 */
function LocationPin({
  store,
  more = false,
  locale,
  className = "",
  style,
}: {
  store?: MapStore;
  more?: boolean;
  locale: Locale;
  className?: string;
  style?: React.CSSProperties;
}) {
  const logo = "rounded-full size-full " + (store?.cover ? "object-cover" : "object-contain");
  return (
    <div aria-hidden="true" className={`aspect-square ${className}`} style={style}>
      <svg viewBox="0 0 24 24" className="size-full overflow-visible">
        <path
          d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
          className="fill-steel-100"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="12" cy="10" r="6.5" className="fill-paper" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* Inside the inner circle: the logo, "…", or a placeholder image */}
      <div
        className={`absolute top-[41.67%] left-1/2 flex size-[54%] -translate-1/2 items-center justify-center overflow-hidden rounded-full ${
          store?.cover ? "" : store?.logo?.asset ? "p-[3%]" : "p-[16%]"
        } ${more ? "text-ink" : "text-steel-300"}`}
      >
        {more ? (
          <Ellipsis className="size-full" strokeWidth={2.5} />
        ) : store?.logo?.asset ? (
          <CmsImage image={store.logo} locale={locale} width={160} height={160} sizes="5rem" className={logo} />
        ) : (
          <ImageIcon className="size-full" strokeWidth={1.5} />
        )}
      </div>
    </div>
  );
}

/** The distribution map: location pins (with the stores' logos) joined by smooth dotted routes, each with a floating store-name bubble. */
function StoreMap({ stores, more, locale }: { stores: MapStore[]; /** The last pin's bubble, e.g. "And much more". */ more: string; locale: Locale }) {
  return (
    // Top padding leaves room for the bubble over the highest pin
    <div className="relative mx-auto w-full max-w-5xl pt-6 sm:pt-4">
      <div className="relative">
        {/* The routes, drawn tip to tip under the pins (whose white fill hides their ends) */}
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true" className="block h-auto w-full overflow-visible">
          {routes.map(([a, b]) => (
            <path
              key={`${a}-${b}`}
              d={routePath(pins[a], pins[b])}
              fill="none"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="animate-dash-flow stroke-steel-200 motion-reduce:animate-none"
            />
          ))}
        </svg>
        {/* Sized so the icon's pin (y 2–22 of 24) spans PIN, its tip on the design's tip */}
        {pins.map((pin, i) => (
          <LocationPin
            key={i}
            store={stores[i]}
            more={i === pins.length - 1}
            locale={locale}
            className="absolute -translate-x-1/2 text-ink drop-shadow-sm"
            style={{ left: `${pin.x}%`, top: `${headY(pin) - PIN / 10}%`, height: `${PIN * 1.2}%` }}
          />
        ))}
        <ul>
          {pins.map((pin, i) => {
            const last = i === pins.length - 1;
            const name = last ? more : stores[i]?.name;
            return name ? (
              <li
                key={i}
                style={{ left: `${pin.x}%`, top: `${headY(pin)}%` }}
                className={`absolute -translate-y-full pb-2 sm:pb-3 ${leanClass[pin.lean]}`}
              >
                <span
                  style={{ animationDelay: `${i * 0.45}s` }}
                  className="animate-bob relative flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[0.625rem] font-semibold whitespace-nowrap text-ink shadow-lg ring-1 ring-black/5 motion-reduce:animate-none sm:px-3.5 sm:py-1.5 sm:text-sm"
                >
                  {!last && <Store aria-hidden="true" className="size-3 shrink-0 text-red sm:size-4" />}
                  {name}
                  {/* The bubble's tail, pointing down at the pin */}
                  <span aria-hidden="true" className={`absolute -bottom-1 size-2 -translate-x-1/2 rotate-45 bg-paper ${tailClass[pin.lean]}`} />
                </span>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
}

/** Heading with a red icon tile, as on the other Services sub-sections. */
function SubHeading({ icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-4">
      <IconBox icon={icon} />
      <span className="font-display-heading text-steel-gradient text-3xl sm:text-4xl">{children}</span>
    </h3>
  );
}

/**
 * Mosaic tile placement, in groups of five: one large tile (2x2) and four
 * small ones, the large tile switching sides each group from lg.
 */
function tileClass(i: number) {
  if (i % 10 === 0) return "col-span-2 row-span-2";
  if (i % 10 === 5) return "col-span-2 row-span-2 lg:col-start-3";
  return "";
}

/**
 * Services → We Distribute, under its heading: the map of the stores we
 * supply, with the details under it; then "On the shelves", a mosaic of
 * photos from those stores, captioned with the store, or blank tiles until
 * photos are added.
 */
export function DistributionSection({
  locale,
  stores,
  details,
  galleryIntro,
  gallery,
  labels,
}: {
  locale: Locale;
  /** The map's stores (name and logo, from the Studio), in pin order; empty pins show a placeholder image. */
  stores?: MapStore[];
  details?: string;
  galleryIntro?: string;
  gallery?: GalleryImage[];
  labels: { andMuchMore: string; onTheShelves: string };
}) {
  const photos = gallery?.filter((image) => image.asset) ?? [];
  return (
    <>
      <Container className="mt-8 sm:mt-10">
        <Reveal>
          <StoreMap stores={stores ?? []} more={labels.andMuchMore} locale={locale} />
        </Reveal>
        {details && (
          <Reveal>
            <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-muted sm:mt-12 sm:text-lg">{details}</p>
          </Reveal>
        )}
      </Container>

      {/* On the shelves: photos from the stores we supply */}
      <Container className="mt-20 sm:mt-28">
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SubHeading icon={ShoppingCart}>{labels.onTheShelves}</SubHeading>
          {galleryIntro && <p className="max-w-md text-muted sm:text-lg lg:text-right">{galleryIntro}</p>}
        </Reveal>
        <Reveal>
          <ul
            aria-hidden={photos.length ? undefined : true}
            className="mt-10 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-flow-dense lg:auto-rows-[14rem] lg:grid-cols-4"
          >
            {photos.length
              ? photos.map((photo, i) => {
                  const caption = tr(photo.caption, locale);
                  const large = i % 5 === 0;
                  return (
                    <li key={photo._key} className={`group relative overflow-hidden rounded-2xl bg-steel-100 ring-1 ring-black/5 ${tileClass(i)}`}>
                      <CmsImage
                        image={photo}
                        locale={locale}
                        width={large ? 1200 : 600}
                        height={large ? 900 : 600}
                        sizes={large ? "(min-width: 1024px) 40rem, 100vw" : "(min-width: 1024px) 20rem, 50vw"}
                        fallbackAlt={caption}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                      {caption && (
                        <p className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-linear-to-t from-black/70 to-transparent px-4 pt-10 pb-3.5 text-xs font-semibold text-paper sm:text-sm">
                          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                          {caption}
                        </p>
                      )}
                    </li>
                  );
                })
              : Array.from({ length: PLACEHOLDER_TILES }, (_, i) => (
                  // Blank photo tile: a faint dot grid with an image icon
                  <li
                    key={i}
                    className={`flex items-center justify-center rounded-2xl bg-steel-50 bg-[radial-gradient(var(--color-steel-200)_1px,transparent_1px)] bg-size-[14px_14px] text-steel-300 ring-1 ring-black/5 ${tileClass(i)}`}
                  >
                    <ImageIcon className={i === 0 ? "size-12" : "size-8"} strokeWidth={1.25} />
                  </li>
                ))}
          </ul>
        </Reveal>
      </Container>
    </>
  );
}

import { Package } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { PhotoFrame } from "./PhotoFrame";
import { ProductPreviewTrigger } from "./ProductPreview";

/**
 * Card for the scrolling product rows on Our Services: image, title,
 * description. Clicking it opens the shared product popup.
 */
export function ProductCard({
  title,
  label,
  description,
  meta,
  image,
  placeholder,
  locale,
  tone = "light",
  openLabel,
  ...liProps
}: {
  title: string;
  label?: string;
  description?: string;
  meta?: string;
  image?: SanityImage;
  placeholder?: Placeholder;
  locale: Locale;
  tone?: "light" | "dark";
  /** Accessible name for the card button, e.g. "View Nido". */
  openLabel: string;
  /** Forwarded to the <li>: set on marquee repeats. */
  "aria-hidden"?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <li {...liProps} className="w-72 shrink-0 sm:w-80">
      <article
        className={`group relative flex h-full flex-col overflow-hidden transition-shadow ${
          dark ? "bg-paper/[0.06] ring-1 ring-paper/15 hover:ring-paper/30" : "bg-paper shadow-sm ring-1 ring-line hover:shadow-xl"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <PhotoFrame
            image={image}
            placeholder={placeholder}
            locale={locale}
            width={640}
            height={480}
            sizes="320px"
            icon={Package}
            className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-red [clip-path:polygon(0_75%,100%_0,100%_100%,0_100%)]" />
          {label && (
            <span className="absolute top-3 left-3 bg-black px-2 py-1 text-[0.6875rem] font-bold tracking-wider text-paper uppercase">
              {label}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h4 className={`font-title-heading text-base ${dark ? "text-paper" : "text-black"}`}>{title}</h4>
          {meta && (
            <p className={`mt-1 text-xs font-semibold ${dark ? "text-smoke" : "text-muted"}`} lang="en">
              {meta}
            </p>
          )}
          {description && <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-paper/85" : "text-muted"}`}>{description}</p>}
        </div>
        <ProductPreviewTrigger
          label={openLabel}
          data={{
            title,
            label,
            meta,
            description,
            media: (
              <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={900} height={675} sizes="(min-width: 768px) 28rem, 100vw" icon={Package} />
            ),
          }}
        />
      </article>
    </li>
  );
}

import Image from "next/image";
import type { Brand } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { urlFor } from "@/sanity/image";

/**
 * One partner tile for the logo strip: greyscale by default, full colour on
 * hover/focus. Without an uploaded logo it shows a shared placeholder mark
 * plus the brand name.
 */
export function PartnerLogo({
  brand,
  locale,
  ...liProps
}: {
  brand: Brand;
  locale: Locale;
  /** Forwarded to the <li>: set on marquee repeats. */
  "aria-hidden"?: boolean;
}) {
  return (
    <li {...liProps} className="w-56 shrink-0">
      <div className="group flex h-32 flex-col items-center justify-center gap-3 bg-paper px-5 text-center shadow-sm ring-1 ring-line grayscale transition-[filter,box-shadow,opacity] duration-300 hover:shadow-lg hover:grayscale-0 [&:not(:hover)]:opacity-75">
        {brand.logo?.asset ? (
          <Image
            src={urlFor(brand.logo).width(320).height(160).fit("max").url()}
            alt={tr(brand.logo.alt, locale) || brand.name}
            width={160}
            height={80}
            sizes="160px"
            className="h-16 w-auto object-contain"
          />
        ) : (
          <>
            {/* Shared placeholder mark until the brand's logo is uploaded */}
            <svg viewBox="0 0 48 32" aria-hidden="true" className="h-9 w-auto">
              <path d="M10 2h20l-8 28H2z" fill="#f20000" />
              <path d="M30 2h16l-8 28H22z" fill="#000" />
            </svg>
            <span className="text-sm leading-tight font-extrabold text-black" lang="en">
              {brand.name}
            </span>
          </>
        )}
      </div>
    </li>
  );
}

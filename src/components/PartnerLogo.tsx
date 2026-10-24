import Image from "next/image";
import type { Partner } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { urlFor } from "@/sanity/image";
import { DecorativeAwareLink } from "./DecorativeCopy";

/**
 * One partner tile for the logo strip, in full colour, linking to the partner's website when it has one. Without an
 * uploaded logo it shows a shared placeholder mark plus the partner's name.
 */
export function PartnerLogo({
  partner,
  locale,
  className = "w-56 shrink-0",
  size = "md",
  plain = false,
  ...liProps
}: {
  partner: Partner;
  locale: Locale;
  /** "sm": a shorter tile with a smaller logo (the hero's logo column). */
  size?: "md" | "sm";
  /** No tile at all, just the logo centred in its cell (the hero's white logo panel). */
  plain?: boolean;
  /** The <li>'s sizing: fixed width in the marquee, the grid cell in a logo wall. */
  className?: string;
  /** Forwarded to the <li>: set on marquee repeats. */
  "aria-hidden"?: boolean;
}) {
  const tile =
    `group flex flex-col items-center justify-center gap-3 text-center ${
      plain ? "" : "rounded-2xl bg-paper shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg"
    } ${size === "sm" ? "h-40 px-4" : "h-32 px-5"}`;
  const content = partner.logo?.asset ? (
    <Image
      src={urlFor(partner.logo).width(320).height(160).fit("max").url()}
      alt={tr(partner.logo.alt, locale) || partner.name}
      width={160}
      height={80}
      sizes="160px"
      className={`w-auto max-w-full object-contain ${size === "sm" ? "h-12" : "h-16"}`}
    />
  ) : (
    <>
      {/* Shared placeholder mark until the partner's logo is uploaded */}
      <svg viewBox="0 0 48 32" aria-hidden="true" className="h-9 w-auto">
        <path d="M10 2h20l-8 28H2z" fill="#fe0001" />
        <path d="M30 2h16l-8 28H22z" fill="#3b3b3b" />
      </svg>
      <span className="text-sm leading-tight font-extrabold text-ink" lang="en">
        {partner.name}
      </span>
    </>
  );
  return (
    <li {...liProps} className={className}>
      {partner.website ? (
        // Leaves the tab order in the marquee's visual-only repeats.
        <DecorativeAwareLink href={partner.website} target="_blank" rel="noopener noreferrer" className={tile}>
          {content}
        </DecorativeAwareLink>
      ) : (
        <div className={tile}>{content}</div>
      )}
    </li>
  );
}

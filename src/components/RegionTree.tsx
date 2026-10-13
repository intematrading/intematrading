import type { LocaleString } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { RegionMap } from "./RegionMap";
import { Reveal } from "./Reveal";

type Region = { _key: string; title: LocaleString; body?: LocaleString };

/**
 * A centred heading with a line branching from it to a dot above each of
 * three regions (from sm), then the regions in divided columns: each with
 * its vector map (washed light red on hover), name and line (on phones, one
 * region per row with the map beside the text). Used for
 * Where we source and Target markets on the Services page.
 */
export function RegionTree({ heading, regions, locale, className = "" }: { heading: string; regions: Region[]; locale: Locale; className?: string }) {
  if (!regions.length) return null;
  return (
    <Reveal className={className}>
      <h3 className="font-display-heading text-steel-gradient text-center text-3xl sm:text-4xl">{heading}</h3>
      <BranchConnector className="mt-3" />
      <ul className="mt-8 grid gap-10 sm:mt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-steel-200">
        {regions.map((r) => (
          <li key={r._key} className="group flex items-center justify-center gap-5 sm:flex-col sm:gap-0 sm:px-8 sm:text-center">
            <RegionMap region={r._key} className="h-24 w-28 shrink-0 sm:mb-5 sm:h-32 sm:w-auto sm:max-w-full" />
            <div>
              <p className="font-title-heading text-ink">{tr(r.title, locale)}</p>
              {r.body && <p className="mt-1.5 max-w-64 text-sm text-muted">{tr(r.body, locale)}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** A line dropping from a heading and branching to a dot above each of three columns (from sm), in `color` (a text colour class). */
export function BranchConnector({ className = "", color = "text-ink" }: { className?: string; color?: string }) {
  return (
    <div aria-hidden="true" className={`relative mx-auto hidden h-20 sm:block ${color} ${className}`}>
      <svg viewBox="0 0 600 80" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <path
          d="M300 0 V40 M100 74 V54 Q100 40 114 40 H486 Q500 40 500 54 V74 M300 40 V74"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {["left-1/6", "left-1/2", "left-5/6"].map((x) => (
        <span key={x} className={`absolute bottom-0 ${x} size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-current`} />
      ))}
    </div>
  );
}

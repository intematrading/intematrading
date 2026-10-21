import { Boxes, Handshake, Megaphone, Network, Ship, Truck, Warehouse, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { RouteStep } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { getHomePage, tr } from "@/lib/content";
import { Container } from "./Container";
import { LottiePlayer } from "./LottiePlayer";
import { RouteIllustration } from "./RouteIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Steps by their key in Sanity.
const stepIcons: Record<string, LucideIcon> = {
  importation: Ship,
  distribution: Network,
  wholesale: Boxes,
  warehousing: Warehouse,
  transportation: Truck,
  sales: Handshake,
  marketDevelopment: Megaphone,
};

// The default animation for each step (by its key in Sanity): a Lottie file in
// public/service-animations/, served with the site. To add one, drop the file
// in that folder and add a line here; steps without one show the built-in illustration.
const stepAnimations: Record<string, string> = {
  wholesale: "wholesale.json",
  warehousing: "warehousing.json",
  transportation: "transportation.json",
  sales: "sales.json",
  marketDevelopment: "market.json",
};

// Steps with their own Services section (We Import, We Distribute), left out of the route lists.
const ownSection = new Set(["importation", "distribution"]);
const routeOnly = (steps?: RouteStep[]) => steps?.filter((step) => !ownSection.has(step._key)) ?? [];

/** A step's animation on its panel: `upload` (from the Studio) if set, else its default file, else its built-in illustration. */
function StepAnimation({ step, upload }: { step: string; upload?: string }) {
  const src = upload ?? (stepAnimations[step] && `/service-animations/${stepAnimations[step]}`);
  return src ? <LottiePlayer src={src} className="aspect-[8/5] w-full" /> : <RouteIllustration step={step} />;
}

/**
 * "From port to shelf" in full (Services, section id "route"): a vertical
 * route from wholesale on (importation and distribution have their own
 * sections above), one icon
 * stop per step with its animation (uploaded in the Studio, else its default
 * file, else a built-in illustration) and text either side,
 * alternating. Steps: Home page → From port to shelf in Sanity; the heading
 * and intro are the Services page's own.
 */
export async function RouteSteps({
  locale,
  id = "route-heading",
  heading,
  intro,
  eyebrow,
  className = "",
}: {
  locale: Locale;
  id?: string;
  heading?: string;
  intro?: string;
  eyebrow?: string;
  className?: string;
}) {
  const [home, t] = await Promise.all([getHomePage(), getTranslations("Home")]);
  if (!home.routeSteps?.length) return null;
  return (
    <section id="route" aria-labelledby={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading id={id} eyebrow={eyebrow ?? t("ourServices")}>
            {heading || tr(home.routeHeading, locale) || t("routeHeading")}
          </SectionHeading>
          {(intro || home.routeIntro) && <p className="mt-6 text-muted sm:text-lg">{intro || tr(home.routeIntro, locale)}</p>}
        </Reveal>
        <ol className="relative mt-16 sm:mt-20">
          <span aria-hidden="true" className="absolute inset-y-0 left-5 w-px bg-linear-to-b from-transparent via-steel-300 to-transparent md:left-1/2" />
          {routeOnly(home.routeSteps).map((step, i) => {
            const Icon = stepIcons[step._key] ?? Boxes;
            const flip = i % 2 === 1;
            return (
              <li key={step._key} className="relative pb-16 pl-16 last:pb-0 sm:pb-20 md:grid md:grid-cols-2 md:items-center md:gap-28 md:pl-0 lg:gap-40 xl:gap-48">
                {/* The stop: the service's icon on the line */}
                <span className="absolute top-0 left-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-red text-paper shadow-lg ring-4 ring-paper md:top-1/2 md:left-1/2 md:size-12 md:-translate-y-1/2 lg:size-14">
                  <Icon aria-hidden="true" className="size-5 lg:size-6" />
                </span>
                <Reveal className={flip ? "md:order-last" : ""}>
                  {/* The step's animation from the Studio, else its default file, else its built-in illustration */}
                  <div className="overflow-hidden rounded-[1.75rem] bg-steel-50 ring-1 ring-black/5 sm:rounded-[2rem]">
                    <StepAnimation step={step._key} upload={step.animationUrl} />
                  </div>
                </Reveal>
                <Reveal className={`mt-6 md:mt-0 ${flip ? "md:text-right" : ""}`}>
                  <h3 className="font-display-heading text-steel-gradient text-4xl lg:text-5xl">{tr(step.title, locale)}</h3>
                  {step.body && <p className="mt-4 text-sm font-semibold text-ink sm:text-base">{tr(step.body, locale)}</p>}
                  {step.details && <p className="mt-2 text-sm leading-relaxed text-muted">{tr(step.details, locale)}</p>}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/**
 * Home (What we do): the "From port to shelf" steps (from distribution on;
 * importation is the Import branch below) in one row,
 * as grey gradient icon stops and their names on a fading line. From lg the
 * row splits into two halves around an empty middle (each half spreading its
 * stops evenly, so the middle stays centred for any count), where a line drops
 * from it into the branches below (BranchConnector directly after, with no gap).
 */
export function RouteStops({ steps, locale, className = "" }: { steps?: RouteStep[]; locale: Locale; className?: string }) {
  const stops = steps?.filter((step) => step._key !== "importation") ?? [];
  if (!stops.length) return null;
  const half = Math.ceil(stops.length / 2);
  // From lg: each stop's share of its half (the halves sit either side of a 1/7-wide gap).
  const width = (i: number) => `calc((100% - 100% / 7) / 2 / ${i < half ? half : stops.length - half})`;
  return (
    <ol className={`relative flex flex-wrap justify-center gap-y-10 lg:flex-nowrap ${className}`}>
      {/* The line through the stops (desktop), fading at both ends */}
      <span aria-hidden="true" className="absolute inset-x-0 top-8 hidden h-px bg-linear-to-r from-transparent via-steel-300 to-transparent lg:block" />
      {/* From the middle of the line, the trunk down into the branches */}
      <span aria-hidden="true" className="absolute top-8 bottom-0 left-1/2 hidden w-[1.5px] -translate-x-1/2 bg-steel-300 lg:block" />
      <span aria-hidden="true" className="absolute top-8 left-1/2 hidden size-3 -translate-1/2 rounded-full bg-steel-300 lg:block" />
      {stops.map((step, i) => {
        const Icon = stepIcons[step._key] ?? Boxes;
        return (
          <li
            key={step._key}
            style={{ "--w": width(i) } as React.CSSProperties}
            className={`group relative flex w-1/2 flex-col items-center px-2 text-center sm:w-1/3 lg:w-(--w) ${i === half ? "lg:ml-[calc(100%/7)]" : ""}`}
          >
            {/* On hover the stop lifts, grows a little and turns red */}
            <span className="steel-gradient group-hover:red-gradient flex size-16 items-center justify-center rounded-full text-paper shadow-md ring-4 ring-paper transition-[translate,scale,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-xl motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <span className="mt-3 text-xs font-semibold text-ink sm:text-sm">{tr(step.title, locale)}</span>
          </li>
        );
      })}
    </ol>
  );
}

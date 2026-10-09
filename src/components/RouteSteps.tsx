import { Boxes, Handshake, Megaphone, Network, Ship, Truck, Warehouse, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { RouteStep } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { getHomePage, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
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

/**
 * "From port to shelf" in full (Services, section id "route"): a vertical
 * route from distribution on (importation is covered by We Import), one icon
 * stop per step with its animated illustration and text either side,
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
          <span aria-hidden="true" className="absolute inset-y-0 left-5 w-px bg-linear-to-b from-transparent via-steel-300 to-transparent lg:left-1/2" />
          {/* Importation is covered by We Import above, so the route starts at distribution */}
          {home.routeSteps.filter((step) => step._key !== "importation").map((step, i) => {
            const Icon = stepIcons[step._key] ?? Boxes;
            const flip = i % 2 === 1;
            return (
              <li key={step._key} className="relative pb-16 pl-16 last:pb-0 sm:pb-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-40 lg:pl-0 xl:gap-48">
                {/* The stop: the service's icon on the line */}
                <span className="absolute top-0 left-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-red text-paper shadow-lg ring-4 ring-paper lg:top-1/2 lg:left-1/2 lg:size-14 lg:-translate-y-1/2">
                  <Icon aria-hidden="true" className="size-5 lg:size-6" />
                </span>
                <Reveal className={flip ? "lg:order-last" : ""}>
                  {/* Animated vector illustration of the service */}
                  <div className="overflow-hidden rounded-[1.75rem] bg-steel-50 ring-1 ring-black/5 sm:rounded-[2rem]">
                    <RouteIllustration step={step._key} />
                  </div>
                </Reveal>
                <Reveal className={`mt-6 lg:mt-0 ${flip ? "lg:text-right" : ""}`}>
                  <h3 className="font-display-heading text-steel-gradient text-4xl sm:text-5xl">{tr(step.title, locale)}</h3>
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
 * Home: "From port to shelf" as a short section: heading, intro and a CTA to
 * the full route on the Services page, then every step in one row as a grey
 * gradient icon stop and its name on a fading line.
 */
export async function RouteStrip({ steps, heading, intro, locale }: { steps?: RouteStep[]; heading?: string; intro?: string; locale: Locale }) {
  if (!steps?.length) return null;
  const t = await getTranslations("Home");
  return (
    <section aria-labelledby="route-strip-heading" className="py-16 sm:py-24">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading id="route-strip-heading" eyebrow={t("ourServices")}>
              {heading || t("routeHeading")}
            </SectionHeading>
            {intro && <p className="mt-6 max-w-2xl text-muted sm:text-lg">{intro}</p>}
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <ButtonLink href="/services#route" variant="red">
              {t("fullRoute")}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal>
          <ol className="relative mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {/* The line through the stops (desktop), fading at both ends */}
            <span aria-hidden="true" className="absolute inset-x-0 top-8 hidden h-px bg-linear-to-r from-transparent via-steel-300 to-transparent lg:block" />
            {steps.map((step) => {
              const Icon = stepIcons[step._key] ?? Boxes;
              return (
                <li key={step._key} className="relative flex flex-col items-center px-2 text-center">
                  <span className="steel-gradient flex size-16 items-center justify-center rounded-full text-paper shadow-md ring-4 ring-paper">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-ink sm:text-base">{tr(step.title, locale)}</span>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

import { Boxes, Handshake, Megaphone, Network, Ship, Truck, Warehouse, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getHomePage, tr } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { IconBox } from "./IconBox";
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
 * "From port to shelf": the integrated route from international supplier to
 * the Ethiopian market, as numbered service cards (Home and the Services
 * page). Content: Home page → "From port to shelf" in Sanity.
 */
export async function RouteSteps({
  locale,
  id = "route-heading",
  white = false,
  moreLink = false,
  className = "",
}: {
  locale: Locale;
  id?: string;
  /** White section (cards switch to the light grey canvas colour to stay distinct). */
  white?: boolean;
  /** A last cell linking to the Services page (Home). */
  moreLink?: boolean;
  className?: string;
}) {
  const [home, t] = await Promise.all([getHomePage(), getTranslations("Home")]);
  if (!home.routeSteps?.length) return null;
  return (
    <section aria-labelledby={id} className={`py-16 sm:py-24 ${white ? "bg-paper" : ""} ${className}`}>
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading id={id} eyebrow={t("ourServices")}>
            {tr(home.routeHeading, locale) || t("routeHeading")}
          </SectionHeading>
          {home.routeIntro && <p className="mt-6 text-muted sm:text-lg">{tr(home.routeIntro, locale)}</p>}
        </Reveal>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {home.routeSteps.map((step, i) => (
            <li key={step._key}>
              <Reveal className="h-full">
                <div className={`flex h-full flex-col rounded-3xl p-6 ring-1 ring-black/5 sm:p-7 ${white ? "bg-steel-100" : "bg-paper shadow-sm"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <IconBox icon={stepIcons[step._key] ?? Boxes} />
                    <span aria-hidden="true" className="font-display-heading text-steel-gradient text-4xl leading-none" lang="en">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-title-heading mt-6 text-lg text-ink">{tr(step.title, locale)}</h3>
                  {step.body && <p className="mt-2 text-sm leading-relaxed text-muted">{tr(step.body, locale)}</p>}
                </div>
              </Reveal>
            </li>
          ))}
          {moreLink && (
            <li className="flex flex-col items-center justify-center p-6 text-center sm:col-span-2 lg:col-span-1">
              <Reveal className="flex flex-col items-center">
                <p className="font-title-heading text-lg text-ink">{t("routeMore")}</p>
                <p className="mt-1 max-w-56 text-sm text-muted">{t("routeMoreBody")}</p>
                <ButtonLink href="/services" variant="red" className="mt-6">
                  {t("allServices")}
                </ButtonLink>
              </Reveal>
            </li>
          )}
        </ol>
      </Container>
    </section>
  );
}

import { Building2, GraduationCap, Megaphone, Truck, UserRound, Users } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { panel } from "@/components/panel";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { heroPlaceholders, placeholders } from "@/content/placeholders";
import type { Stat, TeamMember } from "@/content/types";
import type { Locale as AppLocale } from "@/i18n/routing";
import { getSiteSettings, getTeamMembers, getTeamPage, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

// Departments by their key in Sanity.
const departmentIcons: Record<string, typeof Users> = { sales: Megaphone, admin: Building2, operations: Truck };

export async function generateMetadata({ params }: PageProps<"/[locale]/team">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [page, settings] = await Promise.all([getTeamPage(), getSiteSettings()]);
  return buildMetadata({
    locale,
    path: "/team",
    seo: page.seo,
    siteName: tr(settings.companyName, locale),
    fallbackTitle: tr(page.title, locale),
  });
}

/** "Team at a glance": the team facts stacked in a white card, one per row: figure, then label and note. */
function TeamFacts({ facts, heading, locale }: { facts: Stat[]; heading: string; locale: AppLocale }) {
  return (
    <div className="rounded-[1.75rem] bg-paper p-6 shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] sm:p-10 lg:sticky lg:top-[calc(var(--bar-h)+2.5rem)]">
      <h3 className="label-caps text-red-ink">{heading}</h3>
      <dl className="mt-2 divide-y divide-steel-200">
        {facts.map((fact) => (
          <div key={fact._key} className="flex items-center gap-5 py-5 first:pt-4 last:pb-0 sm:py-6 sm:first:pt-5">
            {/* Label first for screen readers; the figure shows first */}
            <dt className="order-last">
              <span className="block font-semibold text-ink">{tr(fact.label, locale)}</span>
              {fact.note && <span className="mt-1 block text-sm text-muted">{tr(fact.note, locale)}</span>}
            </dt>
            <dd className="font-display-heading text-steel-gradient w-32 shrink-0 text-5xl leading-none whitespace-nowrap" lang="en">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * A team group: heading and intro, then the people's cards. With an `aside`
 * (Leadership: the team facts) the cards share the width with it; otherwise
 * they run full width, 4 across.
 */
function TeamGroup({
  id,
  eyebrow,
  heading,
  intro,
  members,
  aside,
  locale,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  members: TeamMember[];
  aside?: React.ReactNode;
  locale: AppLocale;
}) {
  return (
    <section aria-labelledby={id} className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-12"}>
          <Reveal>
            <SectionHeading id={id} eyebrow={eyebrow}>
              {heading}
            </SectionHeading>
            {intro && <p className="mt-6 max-w-2xl text-muted sm:text-lg">{intro}</p>}
          </Reveal>
          <ul className={`mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 ${aside ? "" : "sm:gap-y-10 lg:grid-cols-4 lg:gap-y-12"}`}>
            {members.map((m) => (
              <li key={m._id}>
                <Reveal className="h-full">
                  <TeamCard member={m} locale={locale} showBio />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        {aside && <Reveal className="lg:col-span-5">{aside}</Reveal>}
      </Container>
    </section>
  );
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, members, t] = await Promise.all([getTeamPage(), getTeamMembers(), getTranslations("Team")]);
  const leadership = members.filter((m) => m.group === "leadership");
  // Everyone else: the heads of sales & marketing, administration & finance
  // and operations, in one grid (by display order).
  const heads = members.filter((m) => m.group !== "leadership");

  return (
    <div className="flex flex-col bg-paper">
      <PageHero
        eyebrow={tr(page.eyebrow, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.team}
        locale={locale}
      />

      {/* ── Leadership | team at a glance ────────────────────────── */}
      {leadership.length > 0 && (
        <TeamGroup
          id="leadership-heading"
          eyebrow={t("leadershipEyebrow")}
          heading={tr(page.leadershipHeading, locale)}
          intro={tr(page.leadershipIntro, locale)}
          members={leadership}
          aside={page.facts?.length ? <TeamFacts facts={page.facts} heading={t("atAGlance").replace(/\*/g, "")} locale={locale} /> : undefined}
          locale={locale}
        />
      )}

      {/* ── Department heads: full width, 4 across (two rows of 4) ── */}
      {heads.length > 0 && (
        <TeamGroup
          id="heads-heading"
          eyebrow={t("headsEyebrow")}
          heading={tr(page.headsHeading, locale)}
          intro={tr(page.headsIntro, locale)}
          members={heads}
          locale={locale}
        />
      )}

      {/* ── Brand ambassador: a short shaded panel (Abay candles), the
          text on the left and the portrait on the right, standing on the
          panel's bottom edge and rising above its top (phones: portrait
          first, centred) ── */}
      {page.ambassadorName && (
        <Reveal className="px-3 pt-24 sm:px-4 md:pt-32 lg:pt-44">
          <section aria-labelledby="ambassador-heading" className="on-dark relative isolate rounded-[1.75rem] text-paper shadow-sm ring-1 ring-black/5 sm:rounded-[2rem]">
            {/* Background clipped to the panel; the portrait isn't */}
            <div className="absolute inset-0 -z-10 isolate overflow-hidden rounded-[inherit]">
              <PhotoBackdrop image={page.ambassadorBackground} placeholder={placeholders.ambassador} locale={locale} icon={Users} overlay="bg-black/75" vignette />
            </div>
            <Container className="grid gap-x-12 md:grid-cols-12">
              <div className="relative -mt-24 md:order-last md:col-span-4 md:mt-0 lg:col-start-9">
                {/* The whole photo at its own 2:3 shape, no frame styling. Phones: centred,
                    poking out above the panel. From md: standing on the panel's bottom
                    edge, its height (from the column width) rising above the panel. */}
                <div className="relative mx-auto aspect-[2/3] w-56 sm:w-64 md:absolute md:inset-x-0 md:bottom-0 md:w-auto">
                  {/* No stock stand-in here: a stranger's face would read as the ambassador's. */}
                  <PhotoFrame image={page.ambassadorImage} locale={locale} width={560} height={840} sizes="(min-width: 1024px) 24rem, (min-width: 768px) 30vw, 16rem" icon={UserRound} fit="contain" className="object-bottom" />
                </div>
              </div>
              <div className="py-10 text-center md:col-span-8 md:py-12 md:text-left lg:col-span-7 lg:col-start-1">
                <SectionHeading id="ambassador-heading" eyebrow={tr(page.ambassadorRole, locale) || t("brandAmbassador")} size="band" onDark>
                  {tr(page.ambassadorName, locale)}
                </SectionHeading>
                {page.ambassadorBio && <p className="mx-auto mt-5 max-w-2xl text-paper/85 sm:text-lg md:mx-0">{tr(page.ambassadorBio, locale)}</p>}
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* ── How we're organised + training ───────────────────────── */}
      {page.departments?.length || page.training ? (
        <section aria-labelledby="organised-heading" className="py-16 sm:py-24">
          <Container>
            <Reveal>
              <SectionHeading id="organised-heading" eyebrow={t("organisedEyebrow")}>
                {t("organised")}
              </SectionHeading>
            </Reveal>
            <ul className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.departments?.map((dept) => {
                const Icon = departmentIcons[dept._key] ?? Users;
                return (
                  <li key={dept._key} className="flex flex-col rounded-3xl bg-paper p-7 shadow-sm ring-1 ring-black/5">
                    <IconBox icon={Icon} />
                    <h3 className="font-title-heading mt-6 text-lg text-ink">{tr(dept.title, locale)}</h3>
                    {dept.body && <p className="mt-2 text-sm leading-relaxed text-muted">{tr(dept.body, locale)}</p>}
                  </li>
                );
              })}
              {page.training && (
                <li className="on-dark steel-gradient-deep flex flex-col rounded-3xl p-7 text-paper shadow-sm">
                  <IconBox icon={GraduationCap} />
                  <h3 className="font-title-heading mt-6 text-lg">{tr(page.trainingHeading, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/80">{tr(page.training, locale)}</p>
                </li>
              )}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* ── Partner call-to-action: a shaded photo panel ─────────── */}
      {page.partnerHeading && (
        <Reveal className="px-3 pb-3 sm:px-4 sm:pb-4">
          <section aria-labelledby="partner-heading" className={`on-dark relative isolate text-paper ${panel}`}>
            <PhotoBackdrop
              image={page.partnerImage}
              placeholder={placeholders.partnerCta}
              locale={locale}
              icon={Users}
              overlay="bg-black/60 lg:bg-transparent lg:bg-linear-to-r lg:from-black/80 lg:from-30% lg:via-black/50 lg:via-55% lg:to-black/10"
            />
            <Container className="py-14 sm:py-20">
              <div className="lg:max-w-[50%]">
                <SectionHeading id="partner-heading" eyebrow={t("partnerEyebrow")} onDark>
                  {tr(page.partnerHeading, locale)}
                </SectionHeading>
                {page.partnerBody && <p className="mt-5 max-w-md text-paper/90">{tr(page.partnerBody, locale)}</p>}
                <ButtonLink href="/contact?type=brand" variant="redOnDark" className="mt-8">
                  {t("applyCta")}
                </ButtonLink>
              </div>
            </Container>
          </section>
        </Reveal>
      )}
    </div>
  );
}

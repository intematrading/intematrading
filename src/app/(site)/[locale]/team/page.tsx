import { Building2, GraduationCap, Megaphone, Truck, UserRound, Users } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { heroPlaceholders, placeholders, teamPlaceholders } from "@/content/placeholders";
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

/** "Team at a glance": the team facts in one row (2x2 on phones), split by thin dividers. */
function TeamFacts({ facts, heading, locale }: { facts: Stat[]; heading: string; locale: AppLocale }) {
  return (
    <div className="rounded-[1.75rem] bg-steel-50 p-6 ring-1 ring-black/5 sm:rounded-[2rem] sm:p-10">
      <h3 className="label-caps text-red-ink">{heading}</h3>
      <dl className="mt-6 grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-steel-200">
        {facts.map((fact) => (
          <div key={fact._key} className="flex flex-col pr-4 lg:px-8 lg:first:pl-0 lg:last:pr-0">
            {/* Label first for screen readers; the figure shows first */}
            <dt className="order-last mt-3">
              <span className="block font-semibold text-ink">{tr(fact.label, locale)}</span>
              {fact.note && <span className="mt-1 block text-sm text-muted">{tr(fact.note, locale)}</span>}
            </dt>
            <dd className="font-display-heading text-steel-gradient text-5xl leading-none sm:text-6xl" lang="en">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Leadership: the leader (or leaders) as a feature, a large portrait beside
 * the heading, intro, name, role and bio, then the team facts in one row.
 */
function Leadership({
  heading,
  eyebrow,
  intro,
  leaders,
  facts,
  factsHeading,
  locale,
}: {
  heading: string;
  eyebrow: string;
  intro?: string;
  leaders: TeamMember[];
  facts?: Stat[];
  factsHeading: string;
  locale: AppLocale;
}) {
  return (
    <section aria-labelledby="leadership-heading" className="py-16 sm:py-24">
      <Container>
        {leaders.map((m, i) => (
          <div key={m._id} className={`grid items-center gap-10 md:grid-cols-12 lg:gap-16 ${i ? "mt-16" : ""}`}>
            {/* Phones: text first, then the portrait */}
            <Reveal className="order-last md:order-none md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-sm ring-1 ring-black/5 sm:rounded-[2rem]">
                <PhotoFrame
                  image={m.photo}
                  placeholder={teamPlaceholders[m._id]}
                  locale={locale}
                  width={720}
                  height={900}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  icon={UserRound}
                />
              </div>
            </Reveal>
            <Reveal className="md:col-span-7">
              {i === 0 && (
                <>
                  <SectionHeading id="leadership-heading" eyebrow={eyebrow}>
                    {heading}
                  </SectionHeading>
                  {intro && <p className="mt-6 max-w-xl text-muted sm:text-lg">{intro}</p>}
                </>
              )}
              {/* Indented under the heading, joined to it by a line that drops
                  from the intro and turns in to a dot beside the name */}
              <div className={`relative pl-16 sm:pl-24 ${i === 0 ? "mt-6 pt-10" : ""}`}>
                {i === 0 && (
                  <span aria-hidden="true" className="absolute top-0 left-1 h-[3.9rem] w-12 rounded-bl-2xl border-b border-l border-steel-400 sm:h-[4.4rem] sm:w-19">
                    <span className="absolute right-0 bottom-0 size-2.5 translate-x-1/2 translate-y-1/2 rounded-full bg-red" />
                  </span>
                )}
                <h3 className="font-display-heading text-steel-gradient text-4xl sm:text-5xl">{tr(m.name, locale)}</h3>
                <p className="label-caps mt-3 text-red-ink">{tr(m.role, locale)}</p>
                {m.bio && <p className="mt-5 max-w-xl leading-relaxed text-muted sm:text-lg">{tr(m.bio, locale)}</p>}
              </div>
            </Reveal>
          </div>
        ))}
        {facts?.length ? (
          <Reveal className="mt-16 sm:mt-20">
            <TeamFacts facts={facts} heading={factsHeading} locale={locale} />
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

/** A team group: heading and intro, then the people's cards, 4 across (2 on phones). */
function TeamGroup({
  id,
  eyebrow,
  heading,
  intro,
  members,
  locale,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  members: TeamMember[];
  locale: AppLocale;
}) {
  return (
    <section aria-labelledby={id} className="py-16 sm:py-24">
      <Container>
        <div>
          <Reveal>
            <SectionHeading id={id} eyebrow={eyebrow}>
              {heading}
            </SectionHeading>
            {intro && <p className="mt-6 max-w-2xl text-muted sm:text-lg">{intro}</p>}
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 gap-y-6 sm:gap-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-y-12">
            {members.map((m) => (
              <li key={m._id}>
                <Reveal className="h-full">
                  <TeamCard member={m} locale={locale} showBio />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
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

      {/* ── Leadership: the CEO as a feature, then the team facts in a row ── */}
      {leadership.length > 0 && (
        <Leadership
          heading={tr(page.leadershipHeading, locale)}
          eyebrow={t("leadershipEyebrow")}
          intro={tr(page.leadershipIntro, locale)}
          leaders={leadership}
          facts={page.facts}
          factsHeading={t("atAGlance").replace(/\*/g, "")}
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
          panel's bottom edge and rising above its top. Phones: the portrait
          sits on top of the panel and the panel holds only the centred text ── */}
      {page.ambassadorName && (
        <Reveal className="px-3 pt-[22rem] sm:px-4 sm:pt-[25rem] md:pt-32 lg:pt-44">
          <section aria-labelledby="ambassador-heading" className="on-dark relative isolate rounded-[1.75rem] text-paper shadow-sm ring-1 ring-black/5 sm:rounded-[2rem]">
            {/* Background clipped to the panel; the portrait isn't */}
            <div className="absolute inset-0 -z-10 isolate overflow-hidden rounded-[inherit]">
              <PhotoBackdrop image={page.ambassadorBackground} placeholder={placeholders.ambassador} locale={locale} icon={Users} overlay="bg-black/75" vignette />
            </div>
            <Container className="grid gap-x-12 md:grid-cols-12">
              <div className="absolute inset-x-0 bottom-full md:relative md:inset-x-auto md:bottom-auto md:order-last md:col-span-4 lg:col-start-9">
                {/* The whole photo at its own 2:3 shape, no frame styling. Phones: centred,
                    ending at the panel's top edge. From md: standing on the panel's bottom
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
    </div>
  );
}

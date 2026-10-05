import { GraduationCap, Megaphone, Truck, UserRound, Users } from "lucide-react";
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
import { heroPlaceholders, placeholders, teamSectionPlaceholders } from "@/content/placeholders";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage, TeamMember } from "@/content/types";
import type { Locale as AppLocale } from "@/i18n/routing";
import { getSiteSettings, getTeamMembers, getTeamPage, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const departmentIcons = [Users, Megaphone, Truck];

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

/** Tall rounded photo beside a team group; stays in view while its group scrolls. */
function SidePhoto({ image, placeholder, locale }: { image?: SanityImage; placeholder: Placeholder; locale: AppLocale }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] lg:sticky lg:top-6 lg:aspect-[3/4]">
      <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={640} height={800} sizes="(min-width: 1024px) 34rem, 100vw" icon={Users} />
    </div>
  );
}

/** A team group: heading, intro (and optional extra), member cards, and a side photo. */
function TeamGroup({
  id,
  eyebrow,
  heading,
  intro,
  extra,
  members,
  image,
  placeholder,
  locale,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  extra?: React.ReactNode;
  members: TeamMember[];
  image?: SanityImage;
  placeholder: Placeholder;
  locale: AppLocale;
}) {
  return (
    <section aria-labelledby={id} className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading id={id} eyebrow={eyebrow}>
              {heading}
            </SectionHeading>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              {intro && <p className="max-w-xl text-muted sm:text-lg">{intro}</p>}
              {extra}
            </div>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {members.map((m) => (
              <li key={m._id}>
                <Reveal className="h-full">
                  <TeamCard member={m} locale={locale} showBio />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <SidePhoto image={image} placeholder={placeholder} locale={locale} />
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
  const sales = members.filter((m) => m.group === "sales");

  return (
    <div className="flex flex-col bg-steel-100">
      <PageHero
        eyebrow={tr(page.eyebrow, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.team}
        locale={locale}
      />

      {/* ── Leadership | photo ───────────────────────────────────── */}
      {leadership.length > 0 && (
        <TeamGroup
          id="leadership-heading"
          eyebrow={t("leadershipEyebrow")}
          heading={tr(page.leadershipHeading, locale)}
          intro={tr(page.leadershipIntro, locale)}
          members={leadership}
          image={page.leadershipImage}
          placeholder={teamSectionPlaceholders.leadership}
          locale={locale}
        />
      )}

      {/* ── Team at a glance: a shaded photo panel ──────────────── */}
      {page.facts?.length ? (
        <Reveal className="px-3 sm:px-4">
          <section aria-labelledby="facts-heading" className={`on-dark relative isolate text-paper ${panel}`}>
            <PhotoBackdrop image={page.factsImage} placeholder={placeholders.teamFacts} locale={locale} icon={Users} overlay="bg-black/70" vignette />
            <Container className="py-14 sm:py-20">
              <SectionHeading id="facts-heading" size="band" onDark>
                {t("atAGlance")}
              </SectionHeading>
              <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {page.facts.map((fact) => (
                  <div key={fact._key} className="flex flex-col-reverse gap-2 rounded-2xl bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur-md ring-inset">
                    <dt>
                      <span className="block font-semibold">{tr(fact.label, locale)}</span>
                      {fact.note && <span className="mt-1 block text-sm text-paper/75">{tr(fact.note, locale)}</span>}
                    </dt>
                    <dd className="font-display-heading text-5xl text-paper sm:text-6xl" lang="en">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        </Reveal>
      ) : null}

      {/* ── Sales & marketing | photo ────────────────────────────── */}
      {sales.length > 0 && (
        <TeamGroup
          id="sales-heading"
          eyebrow={t("salesEyebrow")}
          heading={tr(page.salesHeading, locale)}
          intro={tr(page.salesIntro, locale)}
          extra={
            page.salesTeamSize && (
              <p className="flex shrink-0 items-end gap-3">
                <span className="font-display-heading text-steel-gradient text-5xl sm:text-6xl" lang="en">
                  {page.salesTeamSize}
                </span>
                <span className="label-caps max-w-28 pb-1.5 text-ink">{t("salesTeamSize")}</span>
              </p>
            )
          }
          members={sales}
          image={page.salesImage}
          placeholder={teamSectionPlaceholders.sales}
          locale={locale}
        />
      )}

      {/* ── Brand ambassador: a shaded photo panel (Abay candles) ── */}
      {page.ambassadorName && (
        <Reveal className="px-3 sm:px-4">
          <section aria-labelledby="ambassador-heading" className={`on-dark relative isolate text-paper ${panel}`}>
            <PhotoBackdrop image={page.ambassadorBackground} placeholder={placeholders.ambassador} locale={locale} icon={Users} overlay="bg-black/70" vignette />
            <Container className="grid items-center gap-10 py-14 sm:py-20 md:grid-cols-12">
              <div className="md:col-span-5 lg:col-span-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-black/30 ring-1 ring-white/20 backdrop-blur-md">
                  {/* No stock stand-in here: a stranger's face would read as the ambassador's. */}
                  <PhotoFrame image={page.ambassadorImage} locale={locale} width={560} height={700} sizes="(min-width: 768px) 30rem, 100vw" icon={UserRound} />
                </div>
              </div>
              <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
                <SectionHeading id="ambassador-heading" eyebrow={tr(page.ambassadorRole, locale) || t("brandAmbassador")} onDark>
                  {tr(page.ambassadorName, locale)}
                </SectionHeading>
                {page.ambassadorBio && <p className="mt-6 max-w-xl text-paper/85 sm:text-lg">{tr(page.ambassadorBio, locale)}</p>}
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
              {page.departments?.map((dept, i) => {
                const Icon = departmentIcons[i % departmentIcons.length];
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
                <ButtonLink href="/?type=brand#contact" variant="redOnDark" className="mt-8">
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

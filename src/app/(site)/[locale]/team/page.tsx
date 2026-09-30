import { GraduationCap, Megaphone, Truck, UserRound, Users } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { PartnerCta } from "@/components/PartnerCta";
import { PhotoFrame } from "@/components/PhotoFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamCard } from "@/components/TeamCard";
import { heroPlaceholders, placeholders, teamSectionPlaceholders } from "@/content/placeholders";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
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

/** Tall photo beside a team section, with the brand's slanted red edge. */
function SidePhoto({ image, placeholder, locale }: { image?: SanityImage; placeholder: Placeholder; locale: AppLocale }) {
  return (
    <div className="relative lg:sticky lg:top-[calc(var(--spacing-nav)+1rem)]">
      <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-2/3 w-2/3 bg-red [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
        <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={640} height={800} sizes="(min-width: 1024px) 38vw, 100vw" icon={Users} />
      </div>
    </div>
  );
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, members, t] = await Promise.all([
    getTeamPage(),
    getTeamMembers(),
    getTranslations("Team"),
  ]);
  const leadership = members.filter((m) => m.group === "leadership");
  const sales = members.filter((m) => m.group === "sales");

  return (
    <>
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
        <section aria-labelledby="leadership-heading" className="py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <SectionHeading id="leadership-heading">{tr(page.leadershipHeading, locale)}</SectionHeading>
              {page.leadershipIntro && <p className="mt-6 max-w-2xl text-lg text-muted">{tr(page.leadershipIntro, locale)}</p>}
              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {leadership.map((m) => (
                  <li key={m._id}>
                    <TeamCard member={m} locale={locale} showBio />
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <SidePhoto image={page.leadershipImage} placeholder={teamSectionPlaceholders.leadership} locale={locale} />
            </div>
          </Container>
        </section>
      )}

      {/* ── Team at a glance ─────────────────────────────────────── */}
      {page.facts?.length ? (
        <section aria-labelledby="facts-heading" className="on-dark texture-dark relative overflow-hidden text-paper">
          <span aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[16%] bg-red [clip-path:polygon(55%_0,100%_0,100%_100%,0_100%)] md:block" />
          <Container className="relative py-14 sm:py-16">
            <SectionHeading id="facts-heading" size="band" onDark>
              {t("atAGlance")}
            </SectionHeading>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:pr-[10%]">
              {page.facts.map((fact) => (
                <div key={fact._key} className="flex flex-col-reverse gap-1 border-l border-paper/25 pl-6">
                  <dt>
                    <span className="block font-semibold">{tr(fact.label, locale)}</span>
                    {fact.note && <span className="mt-1 block text-sm text-smoke">{tr(fact.note, locale)}</span>}
                  </dt>
                  <dd className="font-display-heading text-5xl text-paper sm:text-6xl" lang="en">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {/* ── Sales & marketing | photo ────────────────────────────── */}
      {sales.length > 0 && (
        <section aria-labelledby="sales-heading" className="texture-paper py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <SectionHeading id="sales-heading">{tr(page.salesHeading, locale)}</SectionHeading>
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                {page.salesIntro && <p className="max-w-xl text-lg text-muted">{tr(page.salesIntro, locale)}</p>}
                {page.salesTeamSize && (
                  <p className="flex shrink-0 items-end gap-3">
                    <span className="font-display-heading text-5xl text-red sm:text-6xl" lang="en">
                      {page.salesTeamSize}
                    </span>
                    <span className="label-caps max-w-28 pb-1.5 text-ink">{t("salesTeamSize")}</span>
                  </p>
                )}
              </div>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {sales.map((m) => (
                  <li key={m._id}>
                    <TeamCard member={m} locale={locale} showBio />
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <SidePhoto image={page.salesImage} placeholder={teamSectionPlaceholders.sales} locale={locale} />
            </div>
          </Container>
        </section>
      )}

      {/* ── Brand ambassador ──────────────────────────────────────── */}
      {page.ambassadorName && (
        <section aria-labelledby="ambassador-heading" className="on-dark texture-dark relative overflow-hidden text-paper">
          <span aria-hidden="true" className="absolute top-0 right-0 size-24 bg-red [clip-path:polygon(0_0,100%_0,100%_100%)] sm:size-36" />
          <Container className="relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-12">
            <div className="relative md:col-span-5 lg:col-span-4">
              <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-2/3 w-2/3 bg-red [clip-path:polygon(0_0,100%_100%,0_100%)]" />
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* No stock stand-in here: a stranger's face would read as Netsanet's. */}
                <PhotoFrame image={page.ambassadorImage} locale={locale} width={560} height={700} sizes="(min-width: 768px) 34vw, 100vw" icon={UserRound} />
              </div>
            </div>
            <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
              <SectionHeading id="ambassador-heading" eyebrow={tr(page.ambassadorRole, locale) || t("brandAmbassador")} onDark>
                {tr(page.ambassadorName, locale)}
              </SectionHeading>
              {page.ambassadorBio && <p className="mt-6 max-w-xl text-lg text-smoke">{tr(page.ambassadorBio, locale)}</p>}
            </div>
          </Container>
        </section>
      )}

      {/* ── How we're organised + training ───────────────────────── */}
      {page.departments?.length || page.training ? (
        <section aria-labelledby="organised-heading" className="py-16 sm:py-24">
          <Container>
            <SectionHeading id="organised-heading">{t("organised")}</SectionHeading>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {page.departments?.map((dept, i) => {
                const Icon = departmentIcons[i % departmentIcons.length];
                return (
                  <li key={dept._key} className="flex flex-col bg-paper p-7 shadow-sm ring-1 ring-line">
                    <IconBox icon={Icon} />
                    <h3 className="font-title-heading mt-6 text-lg text-black">{tr(dept.title, locale)}</h3>
                    {dept.body && <p className="mt-2 text-sm leading-relaxed text-muted">{tr(dept.body, locale)}</p>}
                  </li>
                );
              })}
              {page.training && (
                <li className="on-dark texture-dark flex flex-col p-7 text-paper">
                  <IconBox icon={GraduationCap} />
                  <h3 className="font-title-heading mt-6 text-lg">{tr(page.trainingHeading, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{tr(page.training, locale)}</p>
                </li>
              )}
            </ul>
          </Container>
        </section>
      ) : null}

      {page.partnerHeading && (
        <PartnerCta
          heading={tr(page.partnerHeading, locale)}
          body={tr(page.partnerBody, locale)}
          cta={t("applyCta")}
          href="/contact?type=brand#inquiry"
          image={page.partnerImage}
          placeholder={placeholders.partnerCta}
          locale={locale}
        />
      )}
    </>
  );
}

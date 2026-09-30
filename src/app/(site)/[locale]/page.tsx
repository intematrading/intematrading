import { ArrowRight, BadgeCheck, Boxes, Flame, Globe, Handshake, Plane, ShieldCheck, Ship, Users } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accent } from "@/components/Accent";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { GetInTouch } from "@/components/GetInTouch";
import { PhotoFrame } from "@/components/PhotoFrame";
import { TeamCard } from "@/components/TeamCard";
import { Testimonials } from "@/components/Testimonials";
import { placeholders } from "@/content/placeholders";
import type { ServiceSection } from "@/content/types";
import { Link } from "@/i18n/navigation";
import {
  getHomePage,
  getServicesPage,
  getSiteSettings,
  getTeamMembers,
  getTeamPage,
  getTestimonials,
  tr,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const statIcons = [Globe, Boxes, Users];
const sectionIcons: Record<ServiceSection, typeof Ship> = { import: Ship, produce: Flame, export: Plane };
const pointIcons = [ShieldCheck, BadgeCheck, Handshake];

// Aligns bleed layouts with the 80rem content column.
const alignLeft = "lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  const siteName = tr(settings.companyName, locale);
  return buildMetadata({ locale, path: "/", seo: home.seo, siteName, fallbackTitle: siteName });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [home, services, teamPage, members, testimonials, t, common] = await Promise.all([
    getHomePage(),
    getServicesPage(),
    getTeamPage(),
    getTeamMembers(),
    getTestimonials(),
    getTranslations("Home"),
    getTranslations("Common"),
  ]);

  // "The Quality Warehouse — Importing, …": the part before the dash is the
  // small line above the headline; both stay inside the one <h1>.
  const [brandLine, ...rest] = tr(home.heroHeadline, locale).split(/\s+—\s+/);
  const headline = rest.join(" — ");
  const cards = home.entryCards ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="texture-paper relative overflow-hidden">
        <div className="lg:grid lg:min-h-[36rem] lg:grid-cols-12">
          <div className={`relative z-10 px-4 pt-[calc(var(--spacing-nav)+2.5rem)] pb-14 sm:px-6 sm:pb-20 lg:col-span-6 lg:pt-[calc(var(--spacing-nav)+4rem)] lg:pb-24 lg:pr-6 ${alignLeft}`}>
            <h1>
              {headline ? (
                <>
                  <span className="flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-ink uppercase">
                    <span aria-hidden="true" className="h-1 w-8 bg-red" />
                    {brandLine}
                    <span className="sr-only"> — </span>
                  </span>
                  <span className="font-display-heading mt-5 block text-[clamp(2.75rem,5.6vw,5.25rem)] text-black">
                    <Accent text={headline} />
                  </span>
                </>
              ) : (
                <span className="font-display-heading block text-5xl">
                  <Accent text={brandLine} />
                </span>
              )}
            </h1>
            <span aria-hidden="true" className="mt-6 block h-1 w-16 bg-red" />
            {home.heroSubheadline && (
              <p className="mt-6 max-w-lg text-base text-ink/80 sm:text-lg">{tr(home.heroSubheadline, locale)}</p>
            )}
            <div className="mt-9 flex flex-wrap gap-4 ps-2">
              <ButtonLink href="/services" variant="red">
                {common("exploreServices")}
              </ButtonLink>
              <ButtonLink href="/contact" variant="black">
                {common("contactUs")}
              </ButtonLink>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]">
              <PhotoFrame
                image={home.heroImage}
                placeholder={placeholders.hero}
                locale={locale}
                width={1100}
                height={760}
                sizes="(min-width: 1024px) 50vw, 100vw"
                icon={Ship}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Snapshot strip ───────────────────────────────────────── */}
      {home.stats?.length ? (
        <section aria-labelledby="snapshot-heading" className="on-dark texture-dark relative overflow-hidden text-paper">
          {/* Mirrored red cutouts, left and right */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-[9%] bg-red [clip-path:polygon(0_0,100%_0,45%_100%,0_100%)] md:block"
          />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[9%] bg-red [clip-path:polygon(55%_0,100%_0,100%_100%,0_100%)] md:block"
          />
          <Container className="relative">
            <h2 id="snapshot-heading" className="sr-only">
              {t("snapshotHeading")}
            </h2>
            <dl className="grid gap-px py-6 sm:grid-cols-3 sm:py-12 md:px-[5%]">
              {home.stats.map((stat, i) => {
                const Icon = statIcons[i % statIcons.length];
                return (
                  <div
                    key={stat._key}
                    className="flex flex-col-reverse gap-1 border-paper/25 py-6 sm:border-l sm:px-8 sm:py-2 sm:first:border-l-0"
                  >
                    <dt className="text-sm text-smoke">{tr(stat.label, locale)}</dt>
                    <dd className="font-display-heading text-5xl text-paper sm:text-6xl" lang="en">
                      {stat.value}
                    </dd>
                    <Icon aria-hidden="true" className="mb-4 size-10 text-paper" strokeWidth={1.5} />
                  </div>
                );
              })}
            </dl>
          </Container>
        </section>
      ) : null}

      {/* ── What we do → Our Services anchors ───────────────────── */}
      {cards.length ? (
        <section aria-labelledby="what-we-do" className="py-16 sm:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Eyebrow>{t("ourServices")}</Eyebrow>
                <h2 id="what-we-do" className="font-display-heading mt-4 text-5xl text-black sm:text-6xl">
                  <Accent text={t("whatWeDo")} />
                </h2>
              </div>
              {services.intro && (
                <div className="border-line lg:col-span-7 lg:border-l lg:pl-10">
                  <p className="max-w-2xl text-ink/80">{tr(services.intro, locale)}</p>
                  <Link href="/about" className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-red-ink">
                    {t("learnMoreAbout")}
                    <ArrowRight aria-hidden="true" className="size-4 text-red transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>

            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
              {cards.map((card, i) => {
                const Icon = sectionIcons[card.section];
                // We Produce is the red card; the other two are black.
                const red = card.section === "produce";
                return (
                  <li key={card._key}>
                    <Link
                      href={`/services#${card.section}`}
                      className={`group relative flex min-h-60 overflow-hidden text-paper shadow-md transition-shadow hover:shadow-xl ${
                        red ? "on-red bg-red" : "on-dark texture-dark"
                      }`}
                    >
                      <div className="relative z-10 flex w-[58%] flex-col p-6">
                        {/* Slanted icon box: red on black cards, black on the red one */}
                        <span
                          aria-hidden="true"
                          className={`relative isolate flex size-12 items-center justify-center text-paper before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] ${
                            red ? "before:bg-black" : "before:bg-red"
                          }`}
                        >
                          <Icon className="size-6" strokeWidth={1.75} />
                        </span>
                        <span aria-hidden="true" className="mt-3 text-sm font-bold text-paper/70" lang="en">
                          0{i + 1}
                        </span>
                        <h3 className="font-title-heading mt-1 text-lg text-paper">{tr(card.title, locale)}</h3>
                        {card.description && (
                          <p className={`mt-2 flex-1 text-sm ${red ? "text-paper" : "text-smoke"}`}>{tr(card.description, locale)}</p>
                        )}
                        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-paper">
                          {common("learnMore")}
                          <ArrowRight aria-hidden="true" className="size-4 text-paper transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                      {/* Slanted edge beside the photo: red on black cards, black on the red one */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 right-0 w-[47%] [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] ${red ? "bg-black" : "bg-red"}`}
                      />
                      <div className="absolute inset-y-0 right-0 w-[45%] [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]">
                        <PhotoFrame
                          image={card.image}
                          placeholder={placeholders[card.section]}
                          locale={locale}
                          width={320}
                          height={320}
                          sizes="(min-width: 1024px) 15vw, 45vw"
                          icon={Icon}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* ── Commitment band ──────────────────────────────────────── */}
      {home.commitmentHeadline && (
        <section aria-labelledby="commitment-heading" className="on-dark texture-dark relative overflow-hidden text-paper">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)]">
            <div className={`relative z-10 px-4 py-14 sm:px-6 lg:py-20 lg:pr-4 ${alignLeft}`}>
              {home.commitmentEyebrow && <Eyebrow onDark>{tr(home.commitmentEyebrow, locale)}</Eyebrow>}
              <h2 id="commitment-heading" className="font-display-heading mt-5 text-4xl text-paper sm:text-5xl">
                <Accent text={tr(home.commitmentHeadline, locale)} />
              </h2>
              {home.commitmentBody && <p className="mt-6 max-w-sm text-smoke">{tr(home.commitmentBody, locale)}</p>}
              <ButtonLink href="/about" variant="redOnDark" className="mt-8 ms-2">
                {t("aboutUs")}
              </ButtonLink>
            </div>

            <div className="relative aspect-video lg:-mx-10 lg:aspect-auto lg:[clip-path:polygon(16%_0,100%_0,84%_100%,0_100%)]">
              <PhotoFrame
                image={home.commitmentImage}
                placeholder={placeholders.commitment}
                locale={locale}
                width={900}
                height={600}
                sizes="(min-width: 1024px) 40vw, 100vw"
                icon={Handshake}
              />
            </div>

            {home.commitmentPoints?.length ? (
              <div className="on-red relative bg-red px-6 py-10 sm:px-10 lg:flex lg:items-center lg:pl-20 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
                <ul className="w-full divide-y divide-paper/35">
                  {home.commitmentPoints.map((point, i) => {
                    const Icon = pointIcons[i % pointIcons.length];
                    return (
                      <li key={point.en} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                        <Icon aria-hidden="true" className="size-9 shrink-0 text-paper" strokeWidth={1.5} />
                        <span className="text-[1.1875rem] leading-snug font-bold text-paper">{tr(point, locale)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* ── Team intro → /team ───────────────────────────────────── */}
      {members.length > 0 && (
        <section aria-labelledby="team-heading" className="py-16 sm:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <Eyebrow>{t("ourTeam")}</Eyebrow>
                <h2 id="team-heading" className="font-display-heading mt-4 text-5xl text-black sm:text-6xl">
                  <Accent text={t("meetTeam")} />
                </h2>
              </div>
              <div className="border-line lg:col-span-7 lg:border-l lg:pl-10">
                {teamPage.intro && <p className="max-w-2xl text-ink/80">{tr(teamPage.intro, locale)}</p>}
                <ButtonLink href="/team" variant="black" className="mt-6 ms-2">
                  {t("viewTeam")}
                </ButtonLink>
              </div>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.slice(0, 4).map((m) => (
                <li key={m._id}>
                  <TeamCard member={m} locale={locale} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <Testimonials items={testimonials} locale={locale} showHeading={false} className="texture-paper" />

      <GetInTouch locale={locale} />
    </>
  );
}

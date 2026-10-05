import {
  CalendarDays,
  CheckCircle2,
  Eye,
  Globe,
  PhoneCall,
  Ship,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Gallery } from "@/components/Gallery";
import { GetInTouch } from "@/components/GetInTouch";
import { IconBox } from "@/components/IconBox";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { panel } from "@/components/panel";
import { PartnerLogo } from "@/components/PartnerLogo";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  galleryPlaceholders,
  heroPlaceholders,
  placeholders,
} from "@/content/placeholders";
import { getAboutPage, getBrands, getSiteSettings, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const statIcons = [CalendarDays, Globe, Users, Store, Truck];
const stepIcons = [Ship, PhoneCall, Truck, TrendingUp];

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [page, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);
  return buildMetadata({
    locale,
    path: "/about",
    seo: page.seo,
    siteName: tr(settings.companyName, locale),
    fallbackTitle: tr(page.title, locale),
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, brands, t] = await Promise.all([
    getAboutPage(),
    getBrands(),
    getTranslations("About"),
  ]);
  const steps = page.processSteps ?? [];

  return (
    <div className="flex flex-col bg-steel-100">
      <PageHero
        eyebrow={tr(page.eyebrow, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.about}
        locale={locale}
      />

      {/* ── Who we are, with the company snapshot beside it ─────────── */}
      <section aria-labelledby="who-heading" className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading id="who-heading" eyebrow={t("whoEyebrow")}>
              {tr(page.whoWeAreHeading, locale)}
            </SectionHeading>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {page.whoWeAre?.map((para) => (
                <p key={para.en}>{tr(para, locale)}</p>
              ))}
            </div>
            <ButtonLink href="/team" variant="steel" className="mt-8">
              {t("teamCta")}
            </ButtonLink>
          </Reveal>
          {page.stats?.length ? (
            <Reveal className="lg:col-span-5 lg:col-start-8">
              <aside
                aria-labelledby="snapshot-heading"
                className="rounded-[1.75rem] bg-paper p-7 shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] sm:p-9"
              >
                <h3 id="snapshot-heading" className="label-caps text-red-ink">
                  {t("snapshot")}
                </h3>
                <dl className="mt-6 divide-y divide-steel-200">
                  {page.stats.map((stat, i) => {
                    const Icon = statIcons[i % statIcons.length];
                    return (
                      <div
                        key={stat._key}
                        className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                      >
                        <IconBox icon={Icon} className="mt-1" />
                        <div className="flex flex-col-reverse">
                          <dt className="mt-1.5">
                            <span className="block font-semibold text-ink">
                              {tr(stat.label, locale)}
                            </span>
                            {stat.note && (
                              <span className="mt-1 block text-sm text-muted">
                                {tr(stat.note, locale)}
                              </span>
                            )}
                          </dt>
                          <dd
                            className="font-display-heading text-steel-gradient text-5xl leading-none"
                            lang="en"
                          >
                            {stat.value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </aside>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── Vision & mission: two glass cards on a shaded photo panel ─── */}
      {(page.vision || page.mission) && (
        <Reveal className="px-3 sm:px-4">
          <section
            aria-labelledby="vision-heading"
            className={`on-dark relative isolate text-paper ${panel}`}
          >
            <div className="absolute inset-0 -z-20">
              <PhotoFrame
                image={undefined}
                placeholder={placeholders.vision}
                locale={locale}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 84rem, 100vw"
                icon={Eye}
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-black/60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.6)_100%)]"
            />
            <Container className="py-14 sm:py-20">
              <h2 id="vision-heading" className="sr-only">
                {`${tr(page.visionHeading, locale)} & ${tr(page.missionHeading, locale)}`}
              </h2>
              <p className="label-caps text-center text-paper">
                {t("visionEyebrow")}
              </p>
              <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
                {[
                  {
                    key: "vision",
                    icon: Eye,
                    heading: page.visionHeading,
                    body: page.vision,
                  },
                  {
                    key: "mission",
                    icon: Target,
                    heading: page.missionHeading,
                    body: page.mission,
                  },
                ].map(({ key, icon, heading, body }) =>
                  body ? (
                    <article
                      key={key}
                      className="flex flex-col rounded-3xl bg-white/12 p-7 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl backdrop-saturate-150 ring-inset sm:p-10"
                    >
                      <IconBox icon={icon} size="lg" />
                      <h3 className="font-display-heading mt-6 text-4xl sm:text-5xl">
                        {tr(heading, locale)}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-paper/90 sm:text-lg">
                        {tr(body, locale)}
                      </p>
                    </article>
                  ) : null,
                )}
              </div>
            </Container>
          </section>
        </Reveal>
      )}

      {/* ── Our process: intro, then the steps as numbered cards ────── */}
      {steps.length ? (
        <section aria-labelledby="process-heading" className="pt-20 sm:pt-28">
          <Container>
            <Reveal className="max-w-2xl">
              <SectionHeading
                id="process-heading"
                eyebrow={t("processEyebrow")}
              >
                {tr(page.processHeading, locale)}
              </SectionHeading>
              {page.processIntro && (
                <p className="mt-6 text-muted sm:text-lg">
                  {tr(page.processIntro, locale)}
                </p>
              )}
            </Reveal>
            <Reveal>
              <ol className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4">
                {steps.map((step, i) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  return (
                    <li
                      key={step._key}
                      className="flex h-full min-h-[19rem] flex-col rounded-[1.75rem] bg-paper p-7 shadow-sm ring-1 ring-black/5 sm:rounded-[2rem] sm:p-9"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <IconBox icon={Icon} size="lg" />
                        <span
                          aria-hidden="true"
                          className="font-display-heading text-steel-gradient text-7xl leading-none"
                          lang="en"
                        >
                          0{i + 1}
                        </span>
                      </div>
                      <div className="mt-auto pt-8">
                        <p className="label-caps text-red-ink">
                          {t("step", { n: i + 1 })}
                        </p>
                        <h3 className="font-display-heading text-steel-gradient mt-3 text-4xl">
                          {tr(step.title, locale)}
                        </h3>
                        {step.body && (
                          <p className="mt-3 leading-relaxed text-muted">
                            {tr(step.body, locale)}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── Gallery ──────────────────────────────────────────────── */}
      {page.gallery?.length ? (
        <section aria-labelledby="gallery-heading" className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                id="gallery-heading"
                eyebrow={t("galleryEyebrow")}
              >
                {t("galleryHeading")}
              </SectionHeading>
              <p className="mt-6 max-w-2xl text-muted sm:text-lg">{t("galleryIntro")}</p>
            </Reveal>
          </Container>
          {/* Full drawer width, edges feathered (see Gallery) */}
          <div className="mt-10 sm:mt-12">
              <Gallery
                label={t("galleryLabel")}
                slides={page.gallery.map((g) => ({
                  key: g._key,
                  caption: tr(g.caption, locale),
                  media: (
                    <PhotoFrame
                      image={g.image}
                      placeholder={galleryPlaceholders[g._key]}
                      locale={locale}
                      width={900}
                      height={560}
                      sizes="(min-width: 1024px) 58vw, 86vw"
                      icon={Ship}
                    />
                  ),
                  preview: (
                    <PhotoFrame
                      image={g.image}
                      placeholder={galleryPlaceholders[g._key]}
                      locale={locale}
                      width={1600}
                      height={1000}
                      sizes="100vw"
                      icon={Ship}
                      fit="contain"
                    />
                  ),
                }))}
              />
          </div>
        </section>
      ) : null}

      {/* ── Partners: heading and CTA, then a looping logo strip ────── */}
      <section aria-labelledby="partners-heading" className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                id="partners-heading"
                eyebrow={t("partnersEyebrow")}
              >
                {tr(page.partnersHeading, locale)}
              </SectionHeading>
              {page.partnersIntro && (
                <p className="mt-6 text-muted sm:text-lg">
                  {tr(page.partnersIntro, locale)}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
              <ButtonLink href="/?type=brand#contact" variant="red">
                {t("partnerCta")}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
        <div className="mt-12">
          <Marquee
            label={t("partnersLabel")}
            seconds={brands.length * 3.5}
            feather={12}
          >
            {brands.map((brand) => (
              <PartnerLogo key={brand._id} brand={brand} locale={locale} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── Keys to success, then Get in touch: two floating panels ─── */}
      <div className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
        {page.keysToSuccess?.length ? (
          <Reveal>
            <section
              aria-labelledby="keys-heading"
              className={`on-dark relative isolate text-paper ${panel}`}
            >
              <div className="absolute inset-0 -z-20">
                <PhotoFrame
                  image={undefined}
                  placeholder={placeholders.keys}
                  locale={locale}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 84rem, 100vw"
                  icon={CheckCircle2}
                />
              </div>
              {/* Near-black shade, heaviest on the left behind the heading */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/65 lg:bg-transparent lg:bg-linear-to-r lg:from-black/80 lg:via-black/65 lg:to-black/50"
              />
              <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <SectionHeading
                    id="keys-heading"
                    eyebrow={t("keysEyebrow")}
                    onDark
                  >
                    {tr(page.keysHeading, locale)}
                  </SectionHeading>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
                  {page.keysToSuccess.map((key) => (
                    <li
                      key={key.en}
                      className="flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/25 backdrop-blur-md ring-inset sm:p-6"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 size-6 shrink-0 text-paper"
                      />
                      <span className="text-base leading-relaxed text-paper/90">
                        {tr(key, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          </Reveal>
        ) : null}
        <Reveal>
          <GetInTouch locale={locale} className={panel} />
        </Reveal>
      </div>
    </div>
  );
}

import { CheckCircle2, Eye, PhoneCall, Ship, Target, TrendingUp, Truck } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Accent } from "@/components/Accent";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Gallery } from "@/components/Gallery";
import { Marquee } from "@/components/Marquee";
import { PageHero } from "@/components/PageHero";
import { PartnerLogo } from "@/components/PartnerLogo";
import { PhotoFrame } from "@/components/PhotoFrame";
import { galleryPlaceholders, heroPlaceholders } from "@/content/placeholders";
import { getAboutPage, getBrands, getSiteSettings, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const stepIcons = [Ship, PhoneCall, Truck, TrendingUp];

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  return buildMetadata({
    locale,
    path: "/about",
    seo: page.seo,
    siteName: tr(settings.companyName, locale),
    fallbackTitle: tr(page.title, locale),
  });
}

function Heading({ id, children, onDark = false }: { id: string; children: React.ReactNode; onDark?: boolean }) {
  return (
    <>
      <h2 id={id} className={`font-display-heading text-4xl sm:text-6xl ${onDark ? "text-paper" : "text-black"}`}>
        {children}
      </h2>
      <span aria-hidden="true" className="mt-4 block h-1 w-14 bg-red" />
    </>
  );
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [page, brands, settings, t] = await Promise.all([
    getAboutPage(),
    getBrands(),
    getSiteSettings(),
    getTranslations("About"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={tr(settings.tagline, locale)}
        title={tr(page.title, locale)}
        intro={tr(page.intro, locale)}
        image={page.heroImage}
        placeholder={heroPlaceholders.about}
        locale={locale}
      />

      {/* ── Who we are + snapshot ────────────────────────────────── */}
      <section aria-labelledby="who-heading" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Heading id="who-heading">{tr(page.whoWeAreHeading, locale)}</Heading>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/85 sm:text-lg">
              {page.whoWeAre?.map((para) => <p key={para.en}>{tr(para, locale)}</p>)}
            </div>
          </div>
          {page.stats?.length ? (
            <aside aria-labelledby="snapshot-heading" className="on-dark texture-dark relative self-start p-7 text-paper sm:p-9 lg:col-span-5">
              <span aria-hidden="true" className="absolute top-0 right-0 size-16 bg-red [clip-path:polygon(0_0,100%_0,100%_100%)]" />
              <h3 id="snapshot-heading" className="text-xs font-bold tracking-[0.18em] uppercase">
                {t("snapshot")}
              </h3>
              <dl className="mt-6 divide-y divide-paper/15">
                {page.stats.map((stat) => (
                  <div key={stat._key} className="flex flex-col-reverse gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-6">
                    <dt>
                      <span className="block font-semibold">{tr(stat.label, locale)}</span>
                      {stat.note && <span className="block text-sm text-smoke">{tr(stat.note, locale)}</span>}
                    </dt>
                    <dd className="font-display-heading w-28 shrink-0 text-5xl text-paper" lang="en">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </Container>
      </section>

      {/* ── Image carousel ───────────────────────────────────────── */}
      {page.gallery?.length ? (
        <section aria-labelledby="gallery-heading" className="texture-paper py-16 sm:py-24">
          <Container>
            <h2 id="gallery-heading" className="font-display-heading text-4xl text-black sm:text-6xl">
              <Accent text={t("galleryHeading")} />
            </h2>
            <div className="mt-10">
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
          </Container>
        </section>
      ) : null}

      {/* ── Vision & mission ─────────────────────────────────────── */}
      {(page.vision || page.mission) && (
        <section aria-label={`${tr(page.visionHeading, locale)} & ${tr(page.missionHeading, locale)}`} className="py-16 sm:py-24">
          <Container className="grid gap-6 md:grid-cols-2">
            {page.vision && (
              <article className="on-dark texture-dark flex flex-col p-8 text-paper sm:p-10">
                <Eye aria-hidden="true" className="size-10 text-paper" strokeWidth={1.5} />
                <h2 className="font-display-heading mt-6 text-4xl sm:text-5xl">{tr(page.visionHeading, locale)}</h2>
                <p className="mt-5 text-lg leading-relaxed text-smoke">{tr(page.vision, locale)}</p>
              </article>
            )}
            {page.mission && (
              <article className="on-red flex flex-col bg-red p-8 text-paper sm:p-10">
                <Target aria-hidden="true" className="size-10 text-paper" strokeWidth={1.5} />
                <h2 className="font-display-heading mt-6 text-4xl sm:text-5xl">{tr(page.missionHeading, locale)}</h2>
                <p className="mt-5 text-lg leading-relaxed font-medium text-paper">{tr(page.mission, locale)}</p>
              </article>
            )}
          </Container>
        </section>
      )}

      {/* ── Our process ──────────────────────────────────────────── */}
      {page.processSteps?.length ? (
        <section aria-labelledby="process-heading" className="texture-paper py-16 sm:py-24">
          <Container>
            <div className="max-w-3xl">
              <Heading id="process-heading">{tr(page.processHeading, locale)}</Heading>
              {page.processIntro && <p className="mt-6 text-lg text-muted">{tr(page.processIntro, locale)}</p>}
            </div>
            <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <span aria-hidden="true" className="absolute top-8 right-[12%] left-[12%] hidden h-0.5 bg-black/15 lg:block" />
              {page.processSteps.map((step, i) => {
                const Icon = stepIcons[i % stepIcons.length];
                return (
                  <li key={step._key} className="relative flex flex-col bg-paper p-7 shadow-sm ring-1 ring-line">
                    <span className="flex items-center gap-4">
                      <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center bg-red text-paper">
                        <Icon className="size-7" strokeWidth={1.75} />
                      </span>
                      <span aria-hidden="true" className="font-display-heading text-5xl text-black/15" lang="en">
                        0{i + 1}
                      </span>
                    </span>
                    <h3 className="font-title-heading mt-6 text-lg text-black">{tr(step.title, locale)}</h3>
                    {step.body && <p className="mt-2 text-sm leading-relaxed text-muted">{tr(step.body, locale)}</p>}
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      ) : null}

      {/* ── Partners ─────────────────────────────────────────────── */}
      <section aria-labelledby="partners-heading" className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Heading id="partners-heading">{tr(page.partnersHeading, locale)}</Heading>
              {page.partnersIntro && <p className="mt-6 text-lg text-muted">{tr(page.partnersIntro, locale)}</p>}
            </div>
            <div className="flex flex-wrap gap-4 ps-2 lg:col-span-6 lg:justify-end">
              <ButtonLink href="/services#import" variant="black">
                {t("seeBrands")}
              </ButtonLink>
              <ButtonLink href="/contact?type=brand#inquiry" variant="red">
                {t("partnerCta")}
              </ButtonLink>
            </div>
          </div>
        </Container>
        {/* Full-bleed looping logo strip */}
        <div className="mt-12 px-4 sm:px-6 lg:px-8">
          <Marquee label={t("partnersLabel")} seconds={brands.length * 3.5}>
            {brands.map((brand) => (
              <PartnerLogo key={brand._id} brand={brand} locale={locale} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── Keys to success ──────────────────────────────────────── */}
      {page.keysToSuccess?.length ? (
        <section aria-labelledby="keys-heading" className="on-dark texture-dark relative overflow-hidden py-16 text-paper sm:py-24">
          <span aria-hidden="true" className="absolute top-0 right-0 size-32 bg-red [clip-path:polygon(0_0,100%_0,100%_100%)] sm:size-48" />
          <Container className="relative">
            <Heading id="keys-heading" onDark>
              {tr(page.keysHeading, locale)}
            </Heading>
            <ul className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {page.keysToSuccess.map((key) => (
                <li key={key.en} className="flex gap-4 border-t border-paper/15 pt-6">
                  <CheckCircle2 aria-hidden="true" className="size-6 shrink-0 text-paper" />
                  <span className="text-base leading-relaxed sm:text-lg">{tr(key, locale)}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}

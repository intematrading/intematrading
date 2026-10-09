import {
  CheckCircle2,
  Eye,
  PhoneCall,
  Ship,
  Target,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { IconBox } from "@/components/IconBox";
import { PageHero } from "@/components/PageHero";
import { Partners } from "@/components/Partners";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { statIcon } from "@/components/stat-icons";
import {
  heroPlaceholders,
  placeholders,
} from "@/content/placeholders";
import { getAboutPage, getSiteSettings, tr } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

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

  const [page, t] = await Promise.all([getAboutPage(), getTranslations("About")]);
  const steps = page.processSteps ?? [];

  return (
    <div className="flex flex-col bg-paper">
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
                <ul className="mt-6 divide-y divide-steel-200">
                  {page.stats.map((stat) => {
                    const Icon = statIcon(stat._key);
                    return (
                      <li
                        key={stat._key}
                        className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                      >
                        <IconBox icon={Icon} className="mt-1" />
                        <div className="flex flex-col-reverse">
                          <p className="mt-1.5">
                            <span className="block font-semibold text-ink">
                              {tr(stat.label, locale)}
                            </span>
                            {stat.note && (
                              <span className="mt-1 block text-sm text-muted">
                                {tr(stat.note, locale)}
                              </span>
                            )}
                          </p>
                          <p
                            className="font-display-heading text-steel-gradient text-5xl leading-none"
                            lang="en"
                          >
                            {stat.value}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── What drives us: full width shaded photo, heading and intro,
          then the vision and mission as two glass cards ──────────────── */}
      {(page.vision || page.mission) && (
        <section aria-labelledby="vision-heading" className="on-dark relative isolate overflow-hidden text-paper">
          <PhotoBackdrop image={page.visionImage} placeholder={placeholders.vision} locale={locale} icon={Eye} overlay="bg-black/65" vignette />
          <Container className="py-16 sm:py-24">
            <Reveal className="mx-auto max-w-2xl text-center">
              <SectionHeading id="vision-heading" eyebrow={t("visionEyebrow")} onDark>
                {tr(page.visionSectionHeading, locale) || t("visionEyebrow")}
              </SectionHeading>
              {page.visionSectionIntro && <p className="mt-6 text-paper/85 sm:text-lg">{tr(page.visionSectionIntro, locale)}</p>}
            </Reveal>
            <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
              {[
                { key: "vision", icon: Eye, heading: page.visionHeading, body: page.vision },
                { key: "mission", icon: Target, heading: page.missionHeading, body: page.mission },
              ].map(({ key, icon, heading, body }) =>
                body ? (
                  <Reveal key={key} className="h-full">
                    <article className="flex h-full flex-col rounded-3xl bg-white/12 p-7 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl backdrop-saturate-150 ring-inset sm:p-10">
                      <IconBox icon={icon} size="lg" />
                      <h3 className="font-display-heading mt-6 text-4xl sm:text-5xl">{tr(heading, locale)}</h3>
                      <p className="mt-4 text-base leading-relaxed text-paper/90 sm:text-lg">{tr(body, locale)}</p>
                    </article>
                  </Reveal>
                ) : null,
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── Our process: intro, then the steps as numbered cards ────── */}
      {steps.length ? (
        <section aria-labelledby="process-heading" className="py-16 sm:py-24">
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
              <ol className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {steps.map((step, i) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  return (
                    <li key={step._key} className="flex h-full flex-col rounded-[1.75rem] bg-paper p-6 shadow-sm ring-1 ring-black/5 sm:p-7">
                      <div className="flex items-center justify-between gap-4">
                        <IconBox icon={Icon} />
                        <span aria-hidden="true" className="font-display-heading text-steel-gradient text-5xl leading-none" lang="en">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display-heading text-steel-gradient mt-8 text-3xl">{tr(step.title, locale)}</h3>
                      {step.body && <p className="mt-3 text-sm leading-relaxed text-muted">{tr(step.body, locale)}</p>}
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── Keys to success: full width shaded photo, heading and intro
          beside the keys ──────────────────────────────────────────────── */}
      {page.keysToSuccess?.length ? (
        <section aria-labelledby="keys-heading" className="on-dark relative isolate overflow-hidden text-paper">
          {/* Near-black shade, heaviest on the left behind the heading */}
          <PhotoBackdrop
            image={page.keysImage}
            placeholder={placeholders.keys}
            locale={locale}
            icon={CheckCircle2}
            overlay="bg-black/65 lg:bg-transparent lg:bg-linear-to-r lg:from-black/80 lg:via-black/65 lg:to-black/50"
          />
          <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading id="keys-heading" eyebrow={t("keysEyebrow")} onDark>
                {tr(page.keysHeading, locale)}
              </SectionHeading>
              {page.keysIntro && <p className="mt-6 text-paper/85 sm:text-lg">{tr(page.keysIntro, locale)}</p>}
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
              {page.keysToSuccess.map((key) => (
                <li key={key.en} className="flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/25 backdrop-blur-md ring-inset sm:p-6">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-paper" />
                  <span className="text-base leading-relaxed text-paper/90">{tr(key, locale)}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* ── Partners, just above the footer: heading and CTA, then the logo strip ── */}
      <Partners locale={locale} className="py-16 sm:py-24" />
    </div>
  );
}

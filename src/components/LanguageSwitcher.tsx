"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Each language is labelled in its own language, and never translated.
const labels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  fr: { short: "FR", name: "Français" },
};

export function LanguageSwitcher({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex ${vertical ? "flex-col" : ""} gap-0.5 rounded-xl border border-white/50 bg-white/70 p-1 text-[0.6875rem] leading-none shadow-lg backdrop-blur-xl ${isPending ? "opacity-60" : ""} ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={t("switchTo", { language: labels[l].name })}
            onClick={(e) => {
              if (active) {
                e.preventDefault();
                return;
              }
              // Keep the in-page anchor (e.g. /services#export) when switching.
              const { hash } = window.location;
              if (hash) {
                e.preventDefault();
                startTransition(() => router.replace(`${pathname}${hash}`, { locale: l }));
              }
            }}
            className={`flex size-8 items-center justify-center rounded-lg font-bold tracking-wider transition-colors ${
              active ? "red-gradient text-paper" : "text-ink hover:text-red-ink"
            }`}
          >
            {labels[l].short}
          </Link>
        );
      })}
    </div>
  );
}

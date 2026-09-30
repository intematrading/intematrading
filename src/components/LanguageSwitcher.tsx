"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Each language is labelled in its own script, and never translated.
const labels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  am: { short: "አማ", name: "አማርኛ" },
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`relative isolate flex text-sm leading-none before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:border before:border-line ${isPending ? "opacity-60" : ""} ${className}`}
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
            className={`relative isolate flex min-h-10 min-w-12 items-center justify-center px-3 font-bold transition-colors before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] ${
              active ? "text-paper before:bg-red" : "text-ink hover:text-red-ink"
            }`}
          >
            {labels[l].short}
          </Link>
        );
      })}
    </div>
  );
}

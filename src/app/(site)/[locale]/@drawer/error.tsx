"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClass } from "@/components/ButtonLink";
import { requestDrawerClose } from "@/lib/home-nav";

// A drawer page failed to load: say so inside the drawer, with a retry,
// rather than leaving it stuck.
export default function DrawerError({ retry }: { retry: () => void }) {
  const t = useTranslations("Common");
  return (
    <div role="alert" className="flex min-h-full flex-col items-start justify-center gap-6 px-8 py-24 sm:px-16">
      <h2 className="font-display-heading text-steel-gradient text-4xl sm:text-5xl">{t("loadError")}</h2>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className={buttonClass("red")}>
          {t("retry")}
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
        <button type="button" onClick={requestDrawerClose} className={buttonClass("steel")}>
          {t("close")}
        </button>
      </div>
    </div>
  );
}

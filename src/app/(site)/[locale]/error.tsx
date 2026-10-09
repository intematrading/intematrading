"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { buttonClass } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

/** Shown when a page fails to render (e.g. content couldn't load); offers a retry. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const t = useTranslations("Common");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="bg-paper">
      <Container className="flex min-h-[70svh] flex-col items-start justify-center py-24">
        <h1 className="font-display-heading text-steel-gradient text-4xl sm:text-5xl">{t("loadError")}</h1>
        <button type="button" onClick={() => retry()} className={`${buttonClass("red")} mt-8`}>
          {t("retry")}
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
      </Container>
    </div>
  );
}

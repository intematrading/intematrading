import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="bg-steel-100">
      <Container className="flex min-h-[70svh] flex-col items-start justify-center py-24">
        <p className="font-display-heading text-steel-gradient text-8xl leading-none sm:text-9xl" lang="en">
          404
        </p>
        <h1 className="font-display-heading text-steel-gradient mt-4 text-4xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("body")}</p>
        <ButtonLink href="/" className="mt-8">
          {t("home")}
        </ButtonLink>
      </Container>
    </div>
  );
}

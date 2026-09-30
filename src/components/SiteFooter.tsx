import { Boxes, Home, Info, Mail, MapPin, Phone, Send, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";
import { SocialLinks } from "./SocialLinks";

const exploreIcons: Record<string, LucideIcon> = {
  home: Home,
  about: Info,
  services: Boxes,
  team: Users,
  contact: Send,
};


export async function SiteFooter({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const [t, nav] = await Promise.all([getTranslations("Footer"), getTranslations("Nav")]);
  const companyName = tr(settings.companyName, locale);
  const headingClass = "label-caps text-black";

  return (
    <footer className="relative border-t border-line bg-paper text-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-4">
          <Logo alt={companyName} className="h-28 w-auto sm:h-32" />
          <SocialLinks links={settings.socialLinks} className="mt-6" />
        </div>

        <nav aria-labelledby="footer-explore" className="md:col-span-3 md:border-l md:border-line md:pl-8">
          <h2 id="footer-explore" className={headingClass}>
            {t("explore")}
          </h2>
          <ul className="mt-4 space-y-1 text-sm">
            {navItems.map((item) => {
              const Icon = exploreIcons[item.key];
              return (
                <li key={item.href}>
                  <Link href={item.href} className="group inline-flex items-center gap-3 py-1 transition-colors hover:text-red-ink">
                    <Icon aria-hidden="true" className="size-4 text-red" />
                    {nav(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="md:col-span-5 md:border-l md:border-line md:pl-8">
          <h2 className={headingClass}>{t("contact")}</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            {(settings.address || settings.poBox) && (
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                <span>
                  {settings.address && <span className="block">{tr(settings.address, locale)}</span>}
                  {settings.poBox && <span className="block">{tr(settings.poBox, locale)}</span>}
                </span>
              </p>
            )}
            <p className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
              <span className="sr-only">{t("email")}: </span>
              <a href={`mailto:${settings.email}`} className="inline-block py-1 transition-colors hover:text-red-ink">
                {settings.email}
              </a>
            </p>
            {settings.phones?.length ? (
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
                <span className="sr-only">{t("phone")}: </span>
                <span>
                  {settings.phones.map((phone, i) => (
                    <span key={phone}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="inline-block py-1 whitespace-nowrap transition-colors hover:text-red-ink">
                        {phone}
                      </a>
                    </span>
                  ))}
                </span>
              </p>
            ) : null}
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs">
            © {new Date().getFullYear()} {companyName} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

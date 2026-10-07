"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";
import { WhatsAppIcon } from "./SocialLinks";
import { scrollToSection } from "@/lib/home-nav";

/**
 * Floating glass top bar (height --bar-h, inset from the screen edges, with
 * rounded corners): logo, nav links, language switch and WhatsApp. On Home
 * it slides in once the page is scrolled (phones keep a lone menu button
 * over the hero); on every other page it's always there. Small screens get
 * a menu button and panel instead of the links. The current page is red.
 */
export function SiteHeader({ companyName, whatsappUrl }: { companyName: string; whatsappUrl?: string }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // The menu panel remembers the page it was opened on, so navigating
  // anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = navItems.find((item) => (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)))?.href;

  const [scrolled, setScrolled] = useState(false);
  const shown = scrolled || pathname !== "/";

  // Arriving at /#section (e.g. the /contact redirect): the home sections
  // size themselves after load, so scroll there again once they have.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timer = setTimeout(() => document.getElementById(id) && scrollToSection(id), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 40);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  const linkProps = (href: string) => ({
    href,
    "aria-current": href === current ? ("page" as const) : undefined,
    "data-active": href === current || undefined,
  });

  const menuButton = (
    <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-white/50 bg-white/70 text-ink shadow-lg backdrop-blur-xl lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={t("openMenu")}
            onClick={() => setOpenOn(pathname)}
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        inert={!shown}
        className={`pointer-events-auto grid h-(--bar-h) grid-cols-[1fr_auto] items-center gap-6 rounded-2xl bg-white/65 px-4 text-ink shadow-[0_10px_30px_-12px_rgb(0_0_0/0.25)] ring-1 ring-white/60 backdrop-blur-xl backdrop-saturate-150 transition-[translate,opacity] duration-500 ease-out ring-inset sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-7 motion-reduce:transition-none ${
          shown ? "" : "pointer-events-none -translate-y-[calc(100%+1rem)] opacity-0"
        }`}
      >
        {/* Logo: back to the top of Home */}
        <Link href="/" aria-label={companyName} className="justify-self-start">
          <Logo alt="" className="h-8 w-auto" priority />
        </Link>

        {/* Desktop links: black, the current one red with a dot beneath */}
        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map(({ href, key }) => (
              <li key={href}>
                <Link
                  {...linkProps(href)}
                  className="group relative flex h-8 items-center px-4 text-xs font-semibold tracking-wider text-ink uppercase transition-colors duration-300 hover:text-red-ink data-active:text-red-ink"
                >
                  {t(key)}
                  <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 scale-0 rounded-full bg-current transition-transform group-data-active:scale-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <LanguageSwitcher className="hidden lg:flex" />
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsapp")}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white shadow-lg transition-colors hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="size-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          )}
          {/* Small screens: menu button */}
          {menuButton}
        </div>
      </div>

      {/* Phones over the home hero (bar hidden): the menu button on its own */}
      {!shown && <div className="pointer-events-auto absolute top-3 right-3 flex h-(--bar-h) items-center pr-4 sm:right-4 sm:pr-6 lg:hidden">{menuButton}</div>}

      {/* Small screens: menu panel from the right, with the language switch at its foot */}
      <div
        aria-hidden="true"
        onClick={() => setOpenOn(null)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <nav
        id={menuId}
        aria-label={t("primary")}
        hidden={!open}
        className="pointer-events-auto fixed inset-y-3 right-3 z-50 flex w-[min(18rem,calc(100vw-1.5rem))] flex-col rounded-3xl bg-paper p-4 pt-5 text-ink shadow-2xl lg:hidden"
      >
        <div className="mb-6 flex items-start justify-between pl-4">
          <Logo alt={companyName} className="h-12 w-auto" />
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setOpenOn(null)}
            className="inline-flex size-11 items-center justify-center rounded-xl bg-steel-100 text-ink transition-colors hover:bg-steel-200"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, key }) => (
            <li key={href}>
              <Link
                {...linkProps(href)}
                // Close the menu as the page changes.
                onClick={() => setOpenOn(null)}
                className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-ink hover:bg-black/5 data-active:text-red-ink"
              >
                {t(key)}
                <span aria-hidden="true" className="red-gradient size-2 scale-0 rounded-full group-data-active:scale-100" />
              </Link>
            </li>
          ))}
        </ul>
        <LanguageSwitcher className="mt-auto self-start" />
      </nav>
    </header>
  );
}

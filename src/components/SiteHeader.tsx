"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";

// Past this many pixels the bar detaches from the top and floats.
const FLOAT_AFTER = 16;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > FLOAT_AFTER;
const getServerScrolled = () => false;

export function SiteHeader({ companyName }: { companyName: string }) {
  const floating = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // The mobile menu remembers the page it was opened on, so navigating
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

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // One red bar that slides and resizes to the active item. Positioned by
  // writing to the DOM (no state), re-measured on navigation and whenever the
  // nav resizes (web fonts loading, the active item turning semibold).
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const nav = navRef.current;
    const bar = indicatorRef.current;
    if (!nav || !bar) return;
    const place = () => {
      const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!active) {
        bar.style.opacity = "0";
        return;
      }
      const inset = 12; // matches the links' px-3
      bar.style.width = `${active.offsetWidth - inset * 2}px`;
      bar.style.transform = `translateX(${active.offsetLeft + inset}px)`;
      bar.style.opacity = "1";
    };
    place();
    // Only animate moves after the first placement, so it doesn't slide in on load.
    const frame = requestAnimationFrame(() => (bar.dataset.ready = ""));
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    // Overlays the page (pages pad their first section by --spacing-nav).
    // At the top it's a full-width bar; once scrolled it eases into a
    // floating glass card.
    <header
      data-floating={floating || undefined}
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
        floating ? "px-3 pt-3 sm:px-4" : "px-0 pt-0"
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out motion-reduce:transition-none ${
          floating
            ? "max-w-7xl rounded-2xl border-white/60 bg-white/72 shadow-[0_10px_30px_-8px_rgb(0_0_0/0.18),inset_0_1px_0_rgb(255_255_255/0.7)]"
            : "max-w-full rounded-none border-transparent border-b-black/10 bg-white/85 shadow-none"
        }`}
      >
        {/* Logo | nav centred | language switcher */}
        <div className="mx-auto flex h-header max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link href="/" className="block shrink-0 justify-self-start py-1">
            <Logo alt={companyName} className="h-11 w-auto sm:h-12" />
          </Link>
          <nav ref={navRef} aria-label={t("primary")} className="relative hidden lg:block">
            <ul className="flex items-center xl:gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="relative block px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-red-ink aria-[current=page]:font-semibold"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-0 h-[3px] w-0 bg-red opacity-0 data-ready:transition-[transform,width] data-ready:duration-300 data-ready:ease-out motion-reduce:transition-none"
            />
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-black hover:text-red lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              onClick={() => setOpenOn(open ? null : pathname)}
            >
              {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </button>
          </div>
        </div>

        <nav id={menuId} aria-label={t("primary")} hidden={!open} className="border-t border-black/10 lg:hidden">
          <ul className="px-3 py-2 sm:px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-black/5 aria-[current=page]:text-red-ink"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

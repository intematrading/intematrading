"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { isDrawerPath, Link, usePathname } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import { scrollToHomeSection } from "@/lib/home-nav";

/**
 * Navigation: a fixed column of text links on the left edge, and on small
 * screens a menu button that opens a drawer from the right. Each link scrolls
 * the home page to its section (closing a drawer page first if one is open);
 * the section in view is highlighted as the page scrolls, or the drawer page
 * while one is open. No logo in the header (it appears in the footer).
 */
export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // The drawer remembers the page it was opened on, so navigating anywhere
  // closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const drawerId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const drawerOpen = isDrawerPath(pathname);
  // Home section in view (data-nav-section on the home page), set on scroll.
  const [spied, setSpied] = useState("/");
  const current = drawerOpen
    ? navItems.find((item) => item.href !== "/" && pathname.startsWith(item.href))?.href
    : pathname === "/"
      ? spied
      : undefined;

  // Arriving at /#section (e.g. the /contact redirect): the home page's
  // pinned sections size themselves after load, so scroll there again once
  // they have.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (pathname !== "/" || !id) return;
    const timer = setTimeout(() => document.getElementById(id) && scrollToHomeSection(id), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Is the section behind each side-nav link a dark one? Checked on scroll by
  // looking at what's under each link, so links straddling two sections each
  // get the right colour. Written to data-dark (no re-render).
  const railRef = useRef<HTMLElement>(null);

  // Collapsed once the page is scrolled, unless hovered or focused, or a
  // drawer page is open (the nav sits beside the drawer to switch pages).
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);
  const [focused, setFocused] = useState(false);
  // Expanded again while the footer fills most of the screen.
  const [atFooter, setAtFooter] = useState(false);
  const collapsed = scrolled && !atFooter && !drawerOpen && !hovered && !focused;
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;
      setScrolled(window.scrollY > 120);
      const footer = document.querySelector("footer");
      setAtFooter(Boolean(footer && footer.getBoundingClientRect().top < window.innerHeight * 0.4));
      // The last home section whose top has passed the middle of the screen.
      let active = "/";
      for (const el of document.querySelectorAll<HTMLElement>("[data-nav-section]")) {
        if (el.getBoundingClientRect().top <= window.innerHeight / 2) active = el.dataset.navSection ?? active;
      }
      setSpied(active);
      for (const link of rail.querySelectorAll<HTMLElement>("a")) {
        const r = link.getBoundingClientRect();
        const under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2).find((el) => !rail.contains(el));
        link.toggleAttribute("data-dark", Boolean(under?.closest(".on-dark")));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    // Captured, so scrolling inside the drawer counts too.
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    // Re-check once the drawer has finished sliding in or out.
    const settle = setTimeout(schedule, 600);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return (
    <header>
      {/* Desktop: fixed on the left edge — a dot per page joined by a
          vertical line, each followed by its label; the current page's dot is
          a red circle with its icon and its label is red. Links are white
          over dark sections (.on-dark) and dark over light ones; see the
          effect above. Once the page is scrolled it collapses to just the
          dots and line. Hover or keyboard focus expands it.
          Page content is padded on the left to clear it (see Container). */}
      <nav
        ref={railRef}
        aria-label={t("primary")}
        data-collapsed={collapsed || undefined}
        onMouseEnter={() => {
          clearTimeout(leaveTimer.current);
          setHovered(true);
        }}
        // A short grace period, so brushing past the edge doesn't flicker it shut.
        onMouseLeave={() => {
          leaveTimer.current = setTimeout(() => setHovered(false), 180);
        }}
        // Keyboard focus only: a link keeps focus after a click, which
        // shouldn't hold the nav open over the page.
        onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
        className="group/nav fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 py-2 lg:block xl:left-6"
      >
        <ul className="relative flex flex-col gap-1">
          {/* Line through the dot centres (first to last) */}
          <span
            aria-hidden="true"
            className="absolute top-[1.5rem] bottom-[1.5rem] left-[1.125rem] w-px -translate-x-1/2 bg-steel-400/70"
          />
          {navItems.map(({ href, section, key, icon: Icon }) => (
            <li key={href}>
              <Link
                href={section ? `/#${section}` : href}
                aria-current={href === current ? (drawerOpen ? "page" : "location") : undefined}
                data-active={href === current || undefined}
                className="group relative flex items-center py-1.5 text-xs font-semibold tracking-wider text-ink uppercase transition-colors duration-300 data-dark:text-paper data-dark:[text-shadow:0_1px_10px_rgb(0_0_0/0.45)]"
              >
                {/* Dot: grey for other pages; the current one is a red circle
                    with the page's icon */}
                <span className="relative flex size-9 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="flex size-2 items-center justify-center rounded-full bg-steel-400 text-paper ring-4 ring-transparent transition-all duration-300 group-hover:bg-steel-600 group-data-active:red-gradient group-data-active:size-9 group-data-active:shadow-lg motion-reduce:transition-none"
                  >
                    <Icon
                      className="size-4 opacity-0 transition-opacity duration-200 group-data-active:opacity-100"
                      strokeWidth={2}
                    />
                  </span>
                </span>
                <span className="absolute top-1/2 left-full ml-3 -translate-y-1/2 whitespace-nowrap opacity-70 transition-[opacity,visibility] duration-200 group-hover:opacity-100 group-data-active:text-red-ink group-data-active:opacity-100 group-data-dark:group-data-active:text-red-glow group-data-collapsed/nav:invisible group-data-collapsed/nav:opacity-0 motion-reduce:transition-none">
                  {t(key)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Small screens: menu button and a drawer from the right */}
      <button
        type="button"
        className="fixed top-6 right-4 z-50 inline-flex size-12 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-ink shadow-lg backdrop-blur-xl sm:top-7 sm:right-6 lg:hidden"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>
      <div
        aria-hidden="true"
        onClick={() => setOpenOn(null)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <nav
        id={drawerId}
        aria-label={t("primary")}
        hidden={!open}
        className="fixed inset-y-3 right-3 z-40 w-[min(18rem,calc(100vw-1.5rem))] rounded-3xl bg-paper p-4 pt-24 shadow-2xl lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, section, key }) => (
            <li key={href}>
              <Link
                href={section ? `/#${section}` : href}
                aria-current={href === current ? (drawerOpen ? "page" : "location") : undefined}
                data-active={href === current || undefined}
                // Link scrolls the home page to the section; close the menu.
                onClick={() => setOpenOn(null)}
                className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-ink hover:bg-black/5 data-active:text-red-ink"
              >
                {t(key)}
                <span aria-hidden="true" className="red-gradient size-2 scale-0 rounded-full group-data-active:scale-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { isDrawerPath, usePathname, useRouter } from "@/i18n/navigation";

/**
 * Drawer that slides in from the right over the home page while the URL is
 * one of the drawer pages (/about, /services). The page behind
 * stays where it was and can't scroll; the drawer scrolls on its own. Esc,
 * the close button, a click on the shaded page or a link to a place on the
 * home page (via the "drawer:close" event, see lib/home-nav) slide it out,
 * then go back to /.
 * The fixed side nav stays usable on the left, clear of the drawer, so
 * pages can be switched without closing it.
 */
const SLIDE_MS = 500;

export function PageDrawer({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const open = isDrawerPath(pathname);
  const scrollRef = useRef<HTMLDivElement>(null);

  // True while the slide-out plays (the page stays in the drawer until it's
  // off screen). Cleared whenever the URL changes, so reopening the same
  // page later shows the drawer again.
  const [closing, setClosing] = useState(false);
  const [closingPath, setClosingPath] = useState(pathname);
  if (closingPath !== pathname) {
    setClosingPath(pathname);
    setClosing(false);
  }
  const shown = open && !closing;

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => router.push("/"), reduce ? 0 : SLIDE_MS);
  }, [closing, router]);

  // Lock the page behind and close on Esc (unless a popup inside the
  // drawer is open: Esc closes that first).
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("dialog[open]")) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("drawer:close", close);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("drawer:close", close);
    };
  }, [open, close]);

  // On opening or switching page: start at the top, or at the #section the
  // link pointed to, and move focus into the drawer.
  useEffect(() => {
    const el = scrollRef.current;
    if (!open || !el) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target && el.contains(target)) {
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      el.scrollTo({ top: el.scrollTop + target.getBoundingClientRect().top - el.getBoundingClientRect().top - margin, behavior: "instant" });
    } else {
      el.scrollTo({ top: 0, behavior: "instant" });
    }
    el.focus({ preventScroll: true });
  }, [open, pathname]);

  return (
    <div inert={!open} className="pointer-events-none fixed inset-0 z-30">
      {/* Shaded, blurred home page; click to close */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`on-dark absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-500 motion-reduce:transition-none ${shown ? "pointer-events-auto opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute inset-y-0 right-0 w-full transition-[translate,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[92vw] lg:w-[min(84rem,calc(100vw-11rem))] motion-reduce:transition-none ${
          shown ? "pointer-events-auto translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div
          ref={scrollRef}
          tabIndex={-1}
          // Content padding (Container reads --rail-pad): the side nav is
          // outside the drawer, so just even margins.
          className="h-full scroll-smooth overflow-y-auto overscroll-contain bg-steel-100 shadow-2xl outline-none [--rail-pad:3rem] xl:[--rail-pad:4rem] motion-reduce:scroll-auto"
        >
          {children}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={t("close")}
          className="absolute top-6 left-4 z-10 flex size-12 items-center justify-center rounded-full bg-black/35 text-paper ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-red sm:top-7 sm:left-6"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>
    </div>
  );
}

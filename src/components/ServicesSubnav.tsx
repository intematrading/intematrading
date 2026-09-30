"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceSection } from "@/content/types";

/**
 * Sticky in-page tab bar for /services. Plain #anchor links, so every section
 * is deep-linkable, works without JS, and the browser handles smooth
 * scrolling (disabled under prefers-reduced-motion in globals.css).
 * JS only adds scroll-spy highlighting of the section in view.
 *
 * After a tab click the highlight is locked to that tab until the smooth
 * scroll settles, so it doesn't flicker through the sections scrolled past.
 */
export function ServicesSubnav({
  label,
  sections,
}: {
  label: string;
  sections: { id: ServiceSection; title: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = useRef(new Map<string, boolean>());
  const lockedTo = useRef<string | null>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const currentFromScroll = () => sections.find((s) => visible.current.get(s.id))?.id;

  // Called on a tab click: highlight it now and ignore scroll-spy until
  // scrolling has been idle for a moment.
  const lockTo = (id: string) => {
    lockedTo.current = id;
    setActive(id);
    const release = () => {
      lockedTo.current = null;
      window.removeEventListener("scroll", onScroll);
      const current = currentFromScroll();
      if (current) setActive(current);
    };
    const onScroll = () => {
      clearTimeout(releaseTimer.current);
      releaseTimer.current = setTimeout(release, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // releases even if no scrolling happens (already in place)
  };

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1);
      if (sections.some((s) => s.id === id)) setActive(id);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.current.set(entry.target.id, entry.isIntersecting);
        if (lockedTo.current) return;
        const current = sections.find((s) => visible.current.get(s.id));
        if (current) setActive(current.id);
      },
      // A section counts as "current" while it crosses the band just below
      // the floating header + tab bar.
      { rootMargin: "-190px 0px -50% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
      clearTimeout(releaseTimer.current);
    };
  }, [sections]);

  return (
    // Transparent sticky strip docked under the header, holding a slanted
    // glass bar styled like the EN/AM language switcher. The slant lives on
    // ::before layers so text stays upright and the focus outline unclipped.
    <nav aria-label={label} className="pointer-events-none sticky top-nav z-30 flex h-subnav items-center justify-center px-3 sm:px-5">
      <div className="pointer-events-auto relative isolate max-w-full before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:border before:border-white/60 before:bg-white/80 before:shadow-[0_10px_30px_-8px_rgb(0_0_0/0.18)] before:backdrop-blur-xl before:backdrop-saturate-150">
        <ul className="flex h-12 items-center gap-0.5 overflow-x-auto px-1.5 py-1 sm:gap-1 sm:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s, i) => (
            <li key={s.id} className="flex h-full">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                onClick={() => lockTo(s.id)}
                className="group relative isolate flex items-center gap-1.5 px-2 text-xs font-bold whitespace-nowrap text-ink transition-colors sm:gap-2.5 sm:px-4 sm:text-sm sm:tracking-wide sm:uppercase before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:transition-colors hover:before:bg-black/5 aria-[current=location]:text-paper aria-[current=location]:before:bg-red"
              >
                {/* Number chip */}
                <span
                  aria-hidden="true"
                  lang="en"
                  className="relative isolate flex h-5 min-w-6 items-center justify-center px-1 text-[0.6875rem] sm:h-6 sm:min-w-8 sm:px-1.5 sm:text-xs text-paper before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:bg-black before:transition-colors group-aria-[current=location]:text-red-ink group-aria-[current=location]:before:bg-paper"
                >
                  0{i + 1}
                </span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

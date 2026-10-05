"use client";

import { useEffect, useRef } from "react";

/**
 * Pins a row of panels and moves it sideways as the page scrolls down. The
 * wrapper is sized so the vertical scroll distance equals the sideways
 * travel. Keyboard focus on an off-screen panel scrolls the page to it.
 * While the section scrolls up into view, its entrance progress (0 → 1) is
 * written to --enter for children to animate with.
 * Under prefers-reduced-motion the row becomes a normal swipeable strip.
 */
export function HorizontalScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let travel = 0;
    let frame = 0;

    const measure = () => {
      if (reduce.matches) {
        outer.style.height = "";
        track.style.transform = "";
        return;
      }
      // offsetWidth, not scrollWidth: the cards' entrance transforms would
      // otherwise count as overflow and overshoot the end.
      travel = Math.max(0, track.offsetWidth - window.innerWidth);
      outer.style.height = `${window.innerHeight + travel}px`;
    };
    const update = () => {
      frame = 0;
      if (reduce.matches) {
        outer.style.setProperty("--enter", "1");
        return;
      }
      const top = outer.getBoundingClientRect().top;
      outer.style.setProperty("--enter", Math.min(1, Math.max(0, 1 - top / window.innerHeight)).toFixed(4));
      const p = travel ? Math.min(1, Math.max(0, -top / travel)) : 0;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };
    // Tabbing to a panel: scroll the page to where that panel is in view.
    // Keyboard focus only: a mouse press also focuses a link, and jumping
    // the page then would move the link out from under the pointer and
    // cancel the click.
    const onFocusIn = (e: FocusEvent) => {
      if (reduce.matches || !travel || !(e.target as HTMLElement).matches(":focus-visible")) return;
      const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
      if (!panel) return;
      track.parentElement!.scrollLeft = 0;
      const p = Math.min(1, Math.max(0, (panel.offsetLeft - 16) / travel));
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + p * travel, behavior: "instant" });
    };

    measure();
    update();
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", onResize);
    outer.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onResize);
      outer.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return (
    <div ref={outerRef} className={`relative ${className}`} style={{ "--enter": 0 } as React.CSSProperties}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-x-auto motion-reduce:py-4">
        <div ref={trackRef} className="flex w-max items-stretch gap-3 px-3 will-change-transform sm:gap-4 sm:px-4 lg:pr-24 lg:pl-52">
          {children}
        </div>
      </div>
    </div>
  );
}

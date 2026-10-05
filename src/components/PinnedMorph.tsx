"use client";

import { useEffect, useRef } from "react";

/**
 * Holds a section in place once it fills the screen for `pin` screen-heights
 * of scrolling, writing the progress 0 → 1 to --p. Children read --p in
 * calc(), e.g. to grow margins and rounded corners. The natural height of
 * the element marked [data-natural] is written to --nat, so a section can
 * start at full-screen height (--full) and shrink to its content. Nothing is
 * held under prefers-reduced-motion (--p stays at 1: the final state) or on
 * phones and tablets, below lg (--p stays at 0: the initial state, edge to
 * edge and at least a screen tall).
 */
export function PinnedMorph({ children, pin = 0.5 }: { children: React.ReactNode; pin?: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    const content = contentRef.current;
    if (!stage || !sticky || !content) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = { get matches() { return reduceMotion.matches || !desktop.matches; } };
    // Phones and tablets keep the initial state; reduced motion the final one.
    const restingP = () => (reduceMotion.matches ? 1 : 0);
    let stickTop = 0;
    let frame = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const h = (content.querySelector<HTMLElement>("[data-natural]") ?? content).offsetHeight;
      if (reduce.matches) {
        stage.style.height = sticky.style.height = sticky.style.top = "";
        stage.style.setProperty("--nat", `${h}px`);
        // svh: doesn't jump as a phone's address bar shows and hides
        stage.style.setProperty("--full", `max(100svh, ${h}px)`);
        sticky.style.position = "static";
        return;
      }
      const box = Math.max(vh, h);
      stage.style.setProperty("--nat", `${h}px`);
      stage.style.setProperty("--full", `${box}px`);
      stickTop = Math.min(0, vh - h);
      sticky.style.position = "";
      sticky.style.top = `${stickTop}px`;
      sticky.style.height = `${box}px`;
      stage.style.height = `${box + pin * vh}px`;
    };
    const update = () => {
      frame = 0;
      const p = reduce.matches ? restingP() : Math.min(1, Math.max(0, (stickTop - stage.getBoundingClientRect().top) / (pin * window.innerHeight)));
      stage.style.setProperty("--p", p.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    const observer = new ResizeObserver(onResize);
    observer.observe(content);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    reduceMotion.addEventListener("change", onResize);
    desktop.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", onResize);
      desktop.removeEventListener("change", onResize);
    };
  }, [pin]);

  return (
    <div ref={stageRef} className="relative" style={{ "--p": 0 } as React.CSSProperties}>
      <div ref={stickyRef} className="sticky top-0 flex items-center">
        <div ref={contentRef} className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

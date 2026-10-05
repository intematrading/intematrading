"use client";

import { useEffect, useRef } from "react";

/**
 * Holds a section in place once it fills the screen for `pin` screen-heights
 * of scrolling, writing the progress 0 → 1 to --p. Children read --p in
 * calc(), e.g. to grow margins and rounded corners. The natural height of
 * the element marked [data-natural] is written to --nat, so a section can
 * start at full-screen height (--full) and shrink to its content. Under
 * prefers-reduced-motion nothing is held and --p stays at 1.
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stickTop = 0;
    let frame = 0;

    const measure = () => {
      if (reduce.matches) {
        stage.style.height = sticky.style.height = sticky.style.top = "";
        stage.style.removeProperty("--nat");
        stage.style.removeProperty("--full");
        sticky.style.position = "static";
        return;
      }
      const vh = window.innerHeight;
      const h = (content.querySelector<HTMLElement>("[data-natural]") ?? content).offsetHeight;
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
      const p = reduce.matches ? 1 : Math.min(1, Math.max(0, (stickTop - stage.getBoundingClientRect().top) / (pin * window.innerHeight)));
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
    reduce.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", onResize);
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

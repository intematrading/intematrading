"use client";

import { useEffect, useRef } from "react";

/**
 * A tall wrapper whose pinned (sticky) contents animate with scroll. Writes
 * the scroll progress through the wrapper, 0 → 1, to the CSS variable --p,
 * and the progress of its entrance (top edge travelling from the bottom of
 * the screen to the top, 0 → 1) to --enter,
 * which children read in calc() (see the scroll-reveal utility). Nothing
 * re-renders on scroll. Under prefers-reduced-motion --p is fixed at
 * `reducedValue` and the wrapper's motion-reduce: classes should unpin it.
 */
export function ScrollStage({
  className = "",
  reducedValue = 1,
  children,
}: {
  className?: string;
  reducedValue?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      const p = reduce.matches ? reducedValue : run > 0 ? Math.min(1, Math.max(0, -rect.top / run)) : 1;
      const enter = reduce.matches ? 1 : Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--enter", enter.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, [reducedValue]);

  return (
    <div ref={ref} className={className} style={{ "--p": 0, "--enter": 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}

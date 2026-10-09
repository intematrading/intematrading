"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its contents into place the first time they scroll into
 * view, after an optional `delay` (ms) for staggering siblings. `glass` lifts
 * without fading: browsers turn off backdrop blur inside anything that isn't
 * fully opaque, so frosted-glass cards would pop sharp-to-blurred at the end
 * of a fade.
 */
export function Reveal({ children, className = "", delay = 0, glass = false }: { children: React.ReactNode; className?: string; delay?: number; glass?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Once its top edge is a little way into view (a fraction-of-height
      // threshold would hold tall blocks back too long on phones).
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : `translate-y-12 motion-reduce:translate-y-0 ${glass ? "" : "opacity-0 motion-reduce:opacity-100"}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

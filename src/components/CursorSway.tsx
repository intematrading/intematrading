"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax for hanging objects: the contents drift towards the cursor and
 * swing slightly on their top-centre pivot (like a load on a crane line),
 * easing smoothly. Off under prefers-reduced-motion and without a pointer.
 */
export function CursorSway({
  children,
  className = "",
  range = 40,
  swing = 5,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max horizontal drift in px (vertical is a third of it). */
  range?: number;
  /** Max swing angle in degrees. */
  swing?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, frame = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -1..1 offset of the cursor from the element's centre, relative to the viewport size
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${(x * range).toFixed(2)}px, ${((y * range) / 3).toFixed(2)}px, 0) rotate(${(-x * swing).toFixed(2)}deg)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [range, swing]);

  return (
    <div ref={ref} className={`origin-top will-change-transform ${className}`}>
      {children}
    </div>
  );
}

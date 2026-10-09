"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays a Lottie (JSON) animation from a URL, looping. The player library
 * and the file only load once the element is near the viewport, and it
 * pauses while off screen. Under prefers-reduced-motion it shows a still
 * frame. Until it's ready (or if loading fails) it shows `fallback`.
 */
export function LottiePlayer({ src, fallback, className = "" }: { src: string; fallback?: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anim: { play(): void; pause(): void; goToAndStop(v: number, f?: boolean): void; destroy(): void } | null = null;
    let cancelled = false;
    let visible = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(src).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
        ]);
        if (cancelled) return;
        anim = lottie.loadAnimation({ container: el, renderer: "svg", loop: true, autoplay: false, animationData: data });
        if (reduce) anim.goToAndStop(Math.floor((data.op - data.ip) / 2), true);
        else if (visible) anim.play();
        setReady(true);
      } catch {
        // Keep showing the fallback.
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !anim && !cancelled) start();
        if (anim && !reduce) {
          if (visible) anim.play();
          else anim.pause();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
      anim?.destroy();
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      <div ref={ref} aria-hidden="true" className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} />
      {!ready && fallback}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * A short looping, muted clip for a team card. Plays only while on screen,
 * and stays on its first frame under prefers-reduced-motion.
 */
export function RoleVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} src={src} muted loop playsInline preload="metadata" aria-hidden="true" className={`block h-full w-full object-contain ${className}`} />;
}

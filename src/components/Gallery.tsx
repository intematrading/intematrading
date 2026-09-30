"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Slide = { key: string; media: React.ReactNode; preview: React.ReactNode; caption: string };

function NavButton({ dir, label, onClick, className }: { dir: -1 | 1; label: string; onClick: () => void; className: string }) {
  const Icon = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button type="button" onClick={onClick} aria-label={label} className={className}>
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}

/**
 * Looping photo carousel: a CSS scroll-snap track (touch, trackpad and
 * keyboard scrolling work natively) with prev/next buttons that wrap around,
 * and dots. Clicking a photo opens a full-screen preview (native <dialog>:
 * focus is trapped, Esc closes) with its own looping prev/next and ←/→ keys.
 * Slides are rendered on the server and passed in.
 */
export function Gallery({ label, slides }: { label: string; slides: Slide[] }) {
  const t = useTranslations("About");
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const count = slides.length;
  const wrap = (i: number) => (i + count) % count;

  const step = () => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };
  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const goTo = (i: number) => trackRef.current?.scrollTo({ left: wrap(i) * step(), behavior: behavior() });

  // Open/close the native dialog to match state; arrow keys step through photos.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preview === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPreview((p) => (p === null ? p : wrap(p + 1)));
      if (e.key === "ArrowLeft") setPreview((p) => (p === null ? p : wrap(p - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // wrap only depends on count, which is stable for a given gallery
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        onScroll={(e) => {
          const s = step();
          if (s) setIndex(Math.min(count - 1, Math.round(e.currentTarget.scrollLeft / s)));
        }}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-6 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={t("slide", { current: i + 1, total: count })}
            className="w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-[58%]"
          >
            <button
              type="button"
              onClick={() => setPreview(i)}
              aria-label={t("open", { caption: slide.caption })}
              className="group relative block w-full cursor-zoom-in overflow-hidden text-left"
            >
              <div className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none">{slide.media}</div>
              <span aria-hidden="true" className="absolute top-4 right-4 flex size-10 items-center justify-center bg-black/60 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/85 via-black/55 to-transparent px-5 pt-14 pb-5 text-sm font-semibold text-paper sm:px-7 sm:text-base">
                <span aria-hidden="true" className="me-3 inline-block h-1 w-6 bg-red align-middle" />
                {slide.caption}
              </span>
            </button>
          </li>
        ))}
        {/* Lets the last slide snap to the start on wide screens. */}
        <li aria-hidden="true" className="w-px shrink-0 lg:w-[38%]" />
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t("goTo", { n: i + 1 })}
              aria-current={i === index ? "true" : undefined}
              className="h-1.5 w-6 bg-black/20 transition-all hover:bg-black/40 aria-[current=true]:w-10 aria-[current=true]:bg-red"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <NavButton dir={-1} label={t("prev")} onClick={() => goTo(index - 1)} className="flex size-12 items-center justify-center bg-black text-paper transition-colors hover:bg-red" />
          <NavButton dir={1} label={t("next")} onClick={() => goTo(index + 1)} className="flex size-12 items-center justify-center bg-black text-paper transition-colors hover:bg-red" />
        </div>
      </div>

      {/* Full-screen preview */}
      <dialog
        ref={dialogRef}
        onClose={() => setPreview(null)}
        onClick={(e) => e.target === e.currentTarget && setPreview(null)}
        aria-label={preview === null ? undefined : slides[preview].caption}
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-paper backdrop:bg-black/80"
      >
        {preview !== null && (
          <div className="flex h-full flex-col px-4 pt-4 pb-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold tracking-wider text-smoke" lang="en">
                {preview + 1} / {count}
              </p>
              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label={t("close")}
                className="flex size-12 items-center justify-center text-paper transition-colors hover:bg-paper hover:text-black"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center">
              <div className="relative h-full w-full max-w-6xl">{slides[preview].preview}</div>
              <NavButton dir={-1} label={t("prev")} onClick={() => setPreview(wrap(preview - 1))} className="absolute top-1/2 left-0 flex size-12 -translate-y-1/2 items-center justify-center bg-paper/10 text-paper transition-colors hover:bg-paper hover:text-black sm:size-14" />
              <NavButton dir={1} label={t("next")} onClick={() => setPreview(wrap(preview + 1))} className="absolute top-1/2 right-0 flex size-12 -translate-y-1/2 items-center justify-center bg-paper/10 text-paper transition-colors hover:bg-paper hover:text-black sm:size-14" />
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-center text-base font-semibold sm:text-lg">{slides[preview].caption}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}

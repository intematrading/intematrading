"use client";

import { ChevronLeft, ChevronRight, MapPin, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/** A gallery photo: a cropped thumbnail for the row, the full image for the preview. */
export type ShelfPhoto = { key: string; thumb: string; full: string; alt: string; caption?: string };

type Labels = { previous: string; next: string; close: string; open: string };

const arrowClass =
  "flex size-11 items-center justify-center rounded-full bg-paper text-ink shadow-lg ring-1 ring-black/5 transition-[opacity,background-color,color] hover:bg-red hover:text-paper disabled:pointer-events-none disabled:opacity-0";

/**
 * "On the shelves" (Services → We Distribute): the photos in a row that
 * snaps photo by photo, with left/right arrows (hidden at either end); a
 * photo opens full screen in a dialog with its caption, where the arrows or
 * arrow keys move between photos and Esc or ✕ closes it.
 */
export function ShelfCarousel({ photos, labels }: { photos: ShelfPhoto[]; labels: Labels }) {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  // The photo that opened the preview, focused again when it closes
  const opener = useRef<HTMLButtonElement | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [open, setOpen] = useState(0);

  // Hide an arrow once the row can't scroll further that way.
  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  // Move the row by one photo (its width plus the gap).
  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduce ? "auto" : "smooth" });
  };

  const show = (i: number, button: HTMLButtonElement) => {
    opener.current = button;
    setOpen(i);
    dialog.current?.showModal();
  };
  const step = (direction: 1 | -1) => setOpen((i) => (i + direction + photos.length) % photos.length);
  const current = photos[open];

  return (
    <>
      <div className="relative">
        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <li key={photo.key} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                aria-label={photo.caption ? `${labels.open}: ${photo.caption}` : labels.open}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-steel-100 ring-1 ring-black/5"
              >
                <Image
                  src={photo.thumb}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 82vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/45 text-paper opacity-0 ring-1 ring-white/25 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Maximize2 className="size-4" />
                </span>
                {photo.caption && (
                  <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-linear-to-t from-black/70 to-transparent px-4 pt-10 pb-3.5 text-left text-xs font-semibold text-paper sm:text-sm">
                    <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                    {photo.caption}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
        {/* Left / right controls over the row's edges */}
        <button type="button" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={labels.previous} className={`absolute top-1/2 left-2 -translate-y-1/2 sm:-left-5 ${arrowClass}`}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} disabled={edges.end} aria-label={labels.next} className={`absolute top-1/2 right-2 -translate-y-1/2 sm:-right-5 ${arrowClass}`}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      {/* The full-screen preview */}
      <dialog
        ref={dialog}
        onClose={() => opener.current?.focus()}
        aria-label={current?.caption || current?.alt || labels.open}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        onClick={(e) => {
          // A click on the backdrop (the dialog itself, not its content) closes it
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-paper backdrop:bg-black/60"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20">
            <div className="relative h-full w-full">
              {/* Already sized by Sanity (2000px, best format), so loaded as is and straight away */}
              <Image key={current.key} src={current.full} alt={current.alt} fill unoptimized loading="eager" className="object-contain" />
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold sm:text-base">
              {current.caption && (
                <>
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-red" />
                  {current.caption}
                  <span aria-hidden="true" className="text-paper/40">·</span>
                </>
              )}
              <span className="text-paper/70 tabular-nums">
                {open + 1} / {photos.length}
              </span>
            </p>
          </div>
        )}
        <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className={`absolute top-4 right-4 ${arrowClass}`}>
          <X aria-hidden="true" className="size-5" />
        </button>
        {photos.length > 1 && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className={`absolute top-1/2 left-3 -translate-y-1/2 sm:left-6 ${arrowClass}`}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={labels.next} className={`absolute top-1/2 right-3 -translate-y-1/2 sm:right-6 ${arrowClass}`}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

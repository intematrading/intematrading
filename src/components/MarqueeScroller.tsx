"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a marquee track as a real horizontal scroller: it auto-scrolls, but
 * users can also swipe (touch), scroll sideways (trackpad / shift+wheel) or
 * drag with the mouse, in either direction. The track holds two identical
 * copies, so scrollLeft is wrapped by one copy width for a seamless loop.
 * Auto-scroll pauses on hover and keyboard focus, stops for good once the
 * user scrolls the row themselves (swipe, drag or sideways scroll), and is
 * off entirely under prefers-reduced-motion (manual scrolling still works).
 * That hand-over of control stands in for a pause button.
 *
 * A scroll container can't let overflow show on the other axis, so the
 * vertical padding (cancelled by an equal negative margin) gives card shadows
 * room inside the scroller instead of being clipped.
 */
export function MarqueeScroller({
  label,
  seconds,
  reverse = false,
  children,
}: {
  label: string;
  seconds: number;
  /** Auto-scroll towards the right instead of the left. */
  reverse?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const track = el?.firstElementChild as HTMLElement | null;
    if (!el || !track) return;
    const copyWidth = () => (track.children[1] as HTMLElement | undefined)?.offsetLeft ?? 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pos = el.scrollLeft; // fractional accumulator; scrollLeft may round
    let hovering = false;
    let focused = false;
    let resumeAt = 0;
    // Set once the user moves the row themselves; auto-scroll never resumes.
    let stopped = false;
    let last = performance.now();
    let frame = 0;
    const holdFor = (ms: number) => (resumeAt = performance.now() + ms);

    // Mouse drag (touch and trackpads scroll natively).
    let drag: { x: number; start: number; moved: boolean } | null = null;
    let suppressClick = false;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return holdFor(2000);
      drag = { x: e.clientX, start: el.scrollLeft, moved: false };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) drag.moved = true;
      if (drag.moved) {
        el.scrollLeft = drag.start - dx;
        pos = el.scrollLeft;
      }
    };
    const onPointerUp = () => {
      if (!drag) return;
      suppressClick = drag.moved;
      if (drag.moved) stopped = true;
      drag = null;
      holdFor(1500);
    };
    // A drag shouldn't also count as a click on the card under the pointer.
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stopped = true;
    };
    // A tap only pauses briefly (it may open a card); a sideways swipe stops the row.
    let touchX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0]?.clientX ?? null;
      holdFor(2500);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchX !== null && Math.abs((e.touches[0]?.clientX ?? touchX) - touchX) > 10) stopped = true;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const copy = copyWidth();
      if (copy > 0) {
        const auto = !stopped && !reduceMotion.matches && !hovering && !focused && !drag && now > resumeAt;
        if (auto) {
          pos += ((reverse ? -1 : 1) * copy * dt) / seconds;
          el.scrollLeft = pos;
        } else {
          pos = el.scrollLeft;
        }
        // Seamless wrap in both directions.
        if (el.scrollLeft >= copy) {
          el.scrollLeft -= copy;
          pos -= copy;
          if (drag) drag.start -= copy;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += copy;
          pos += copy;
          if (drag) drag.start += copy;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const enter = () => (hovering = true);
    const leave = () => (hovering = false);
    // Pause for keyboard focus only; a mouse press also focuses the card
    // button, which would otherwise keep the row paused after a click/drag.
    const focusIn = (e: FocusEvent) => (focused = (e.target as Element).matches(":focus-visible"));
    const focusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) focused = false;
    };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
    };
  }, [seconds, reverse]);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      onDragStart={(e) => e.preventDefault()}
      className="-my-10 cursor-grab overflow-x-auto overscroll-x-contain py-10 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [scrollbar-width:none] select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

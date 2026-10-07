"use client";

import { useEffect, useRef, useState } from "react";

type Branch = { d: string; x: number; y: number };

/** Gap between one card's entrance and the next (ms). */
const STEP = 450;

/** Offset of `el` from `box` (layout only, so entrance transforms don't skew it). */
function offsetWithin(el: HTMLElement, box: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== box) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * What we do: the cards ([data-branch-leaf]) enter one by one in order and,
 * on desktop (xl), lines branch from a red dot ([data-branch-root]) to a
 * small dot beside each card, each line drawing in just before its card.
 * The lines run right from the root, turn at a shared trunk in the gutter
 * before the cards and end beside each card's middle; redrawn on resize.
 * Below xl each card enters as it scrolls into view. A card shows once it
 * has the data-shown attribute (styled with data-shown: classes).
 */
export function BranchLines({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  // Desktop: how many cards (and their lines) have entered so far.
  const [count, setCount] = useState(0);

  // Measure and draw the lines.
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const wide = window.matchMedia("(min-width: 80rem)");
    const draw = () => {
      const root = box.querySelector<HTMLElement>("[data-branch-root]");
      const leaves = [...box.querySelectorAll<HTMLElement>("[data-branch-leaf]")];
      if (!wide.matches || !root || !leaves.length) return setBranches([]);
      const r = offsetWithin(root, box);
      const rx = r.x + root.offsetWidth / 2;
      const ry = r.y + root.offsetHeight / 2;
      const spots = leaves.map((leaf) => {
        const o = offsetWithin(leaf, box);
        return { left: o.x, x: o.x - 24, y: o.y + leaf.offsetHeight / 2 };
      });
      const trunk = Math.min(...spots.map((s) => s.left)) - 72;
      setBranches(
        spots.map(({ x, y }) => {
          const dy = y - ry;
          const R = Math.min(32, Math.abs(dy) / 2);
          const s = Math.sign(dy);
          const d =
            R < 1
              ? `M${rx} ${ry} H${x}`
              : `M${rx} ${ry} H${trunk - R} Q${trunk} ${ry} ${trunk} ${ry + s * R} V${y - s * R} Q${trunk} ${y} ${trunk + R} ${y} H${x}`;
          return { d, x, y };
        }),
      );
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(box);
    wide.addEventListener("change", draw);
    return () => {
      observer.disconnect();
      wide.removeEventListener("change", draw);
    };
  }, []);

  // Entrances.
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const leaves = [...box.querySelectorAll<HTMLElement>("[data-branch-leaf]")];
    const show = (leaf: HTMLElement) => leaf.setAttribute("data-shown", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      leaves.forEach(show);
      setCount(leaves.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let observer: IntersectionObserver;
    if (window.matchMedia("(min-width: 80rem)").matches) {
      // Desktop: once the cards are a little way into view, one after another.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          leaves.forEach((leaf, i) =>
            timers.push(
              setTimeout(() => {
                setCount(i + 1);
                // The card follows its line.
                timers.push(setTimeout(() => show(leaf), 250));
              }, i * STEP),
            ),
          );
        },
        { rootMargin: "0px 0px -25% 0px" },
      );
      observer.observe(box.querySelector("[data-branch-list]") ?? box);
    } else {
      // Phones and tablets: each card as it scrolls into view.
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }),
        { rootMargin: "0px 0px -12% 0px" },
      );
      leaves.forEach((leaf) => observer.observe(leaf));
    }
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {branches.length ? (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden size-full overflow-visible text-ink/70 xl:block">
          {branches.map((b, i) => (
            <g key={b.d}>
              <path
                d={b.d}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={i < count ? 0 : 1}
                className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
              />
              <circle
                cx={b.x}
                cy={b.y}
                r="10"
                className={`fill-red transition-opacity delay-500 duration-300 motion-reduce:transition-none ${i < count ? "opacity-100" : "opacity-0"}`}
              />
            </g>
          ))}
        </svg>
      ) : null}
      {children}
    </div>
  );
}

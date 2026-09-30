import { Children, cloneElement, isValidElement, type ReactElement } from "react";


import { DecorativeCopy } from "./DecorativeCopy";
import { MarqueeScroller } from "./MarqueeScroller";

/**
 * Endless horizontal row: auto-scrolls and can be dragged, swiped or
 * trackpad-scrolled (see MarqueeScroller). The items are rendered twice so the
 * loop is seamless; extra repeats (for short rows) and the second copy are
 * hidden from assistive tech and the tab order, but stay clickable.
 */
export function Marquee({
  children,
  label,
  seconds,
  repeat = 1,
  reverse = false,
}: {
  children: React.ReactNode;
  label: string;
  /** Time to scroll one copy of the (repeated) items. */
  seconds: number;
  /** Repeat short rows so one copy is wider than the screen (no visible gap). */
  repeat?: number;
  /** Auto-scroll towards the right. */
  reverse?: boolean;
}) {
  const listClass = "flex shrink-0 gap-6";
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<Record<string, unknown>>[];
  const copies = Array.from({ length: repeat }, (_, r) =>
    items.map((item) =>
      r === 0 ? (
        item
      ) : (
        <DecorativeCopy key={`${item.key}-r${r}`}>{cloneElement(item, { "aria-hidden": true })}</DecorativeCopy>
      ),
    ),
  );

  return (
    <MarqueeScroller label={label} seconds={seconds} reverse={reverse}>
      <div className="flex w-max gap-6">
        <ul className={listClass}>{copies}</ul>
        <ul className={listClass} aria-hidden="true">
          <DecorativeCopy>{copies}</DecorativeCopy>
        </ul>
      </div>
    </MarqueeScroller>
  );
}

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
  feather,
  gap = "gap-6",
  separator,
}: {
  children: React.ReactNode;
  label: string;
  /** Time to scroll one copy of the (repeated) items. */
  seconds: number;
  /** Repeat short rows so one copy is wider than the screen (no visible gap). */
  repeat?: number;
  /** Auto-scroll towards the right. */
  reverse?: boolean;
  /** Width of the faded edges, as a percentage of the row: one value, or [left, right]. */
  feather?: number | [number, number];
  /** Space between items (and between the two copies), as a gap class. */
  gap?: string;
  /** An <li> shown after each full set of items, marking where the loop starts over. */
  separator?: ReactElement;
}) {
  const listClass = `flex shrink-0 ${gap}`;
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<Record<string, unknown>>[];
  const copies = Array.from({ length: repeat }, (_, r) => [
    ...items.map((item) =>
      r === 0 ? (
        item
      ) : (
        <DecorativeCopy key={`${item.key}-r${r}`}>{cloneElement(item, { "aria-hidden": true })}</DecorativeCopy>
      ),
    ),
    separator ? cloneElement(separator, { key: `sep-${r}` }) : null,
  ]);

  return (
    <MarqueeScroller label={label} seconds={seconds} reverse={reverse} feather={feather}>
      <div className={`flex w-max ${gap}`}>
        <ul className={listClass}>{copies}</ul>
        <ul className={listClass} aria-hidden="true">
          <DecorativeCopy>{copies}</DecorativeCopy>
        </ul>
      </div>
    </MarqueeScroller>
  );
}

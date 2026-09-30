"use client";

import { createContext, useContext } from "react";

const DecorativeContext = createContext(false);

/**
 * Marks a visual-only repeat of marquee items: interactive elements inside
 * leave the tab order (screen readers already skip it via aria-hidden), but
 * stay clickable, unlike `inert`, which would also block the mouse.
 */
export function DecorativeCopy({ children }: { children: React.ReactNode }) {
  return <DecorativeContext.Provider value={true}>{children}</DecorativeContext.Provider>;
}

export const useIsDecorativeCopy = () => useContext(DecorativeContext);

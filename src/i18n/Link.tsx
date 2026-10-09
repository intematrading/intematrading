"use client";

import type { ComponentProps } from "react";
import { scrollToSection } from "@/lib/home-nav";
import { base } from "./navigation-base";

/**
 * Locale-aware Link. A link to "/" while already on the home page (the logo,
 * Home in the nav) scrolls smoothly to the top instead of re-navigating.
 * Anything else navigates as usual.
 */
export function Link({ onClick, ...props }: ComponentProps<typeof base.Link>) {
  const pathname = base.usePathname();
  return (
    <base.Link
      {...props}
      onClick={(e) => {
        onClick?.(e);
        // Language switches (a `locale` prop) always navigate.
        if (props.href !== "/" || props.locale || pathname !== "/") return;
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        scrollToSection(null);
      }}
    />
  );
}

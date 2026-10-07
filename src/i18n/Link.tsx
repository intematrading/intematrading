"use client";

import type { ComponentProps } from "react";
import { scrollToSection } from "@/lib/home-nav";
import { base } from "./navigation-base";

// "/", "/#section" or "/?type=…#section".
const homeHref = /^\/(?:\?type=([\w-]+))?(?:#([\w-]+))?$/;

/**
 * Locale-aware Link. A link to a section that's on the current page
 * ("/#section") scrolls there smoothly instead of navigating; "/" on the home
 * page scrolls to the top.
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
        const match = typeof props.href === "string" && !props.locale ? homeHref.exec(props.href) : null;
        if (!match || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const [, inquiryType, section] = match;
        if (section ? !document.getElementById(section) : pathname !== "/") return;
        e.preventDefault();
        scrollToSection(section ?? null, { inquiryType });
      }}
    />
  );
}

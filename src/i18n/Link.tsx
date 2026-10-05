"use client";

import type { ComponentProps } from "react";
import { scrollToHomeSection } from "@/lib/home-nav";
import { base, isDrawerPath } from "./navigation-base";

// "/", "/#section" or "/?type=…#section": a place on the home page.
const homeHref = /^\/(?:\?type=([\w-]+))?(?:#([\w-]+))?$/;

/**
 * Locale-aware Link. Every page is the home page, with or without a drawer
 * over it, so navigating never jumps the home page back to the top. Links to
 * a place on the home page scroll there smoothly, sliding an open drawer
 * page out first.
 */
export function Link({ onClick, ...props }: ComponentProps<typeof base.Link>) {
  const pathname = base.usePathname();
  return (
    <base.Link
      scroll={false}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        const match = typeof props.href === "string" ? homeHref.exec(props.href) : null;
        const drawerOpen = isDrawerPath(pathname);
        if (!match || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (pathname !== "/" && !drawerOpen) return; // e.g. the 404 page: just navigate
        e.preventDefault();
        scrollToHomeSection(match[2] ?? null, { closeDrawerFirst: drawerOpen, inquiryType: match[1] });
      }}
    />
  );
}

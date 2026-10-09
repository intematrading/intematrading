// Smooth in-page scrolling. Browser-only: call from event handlers or effects.

/**
 * Smooth-scrolls to the element with id `section` (honouring its
 * scroll-margin-top), or to the top when `section` is null.
 */
export function scrollToSection(section: string | null) {
  const el = section ? document.getElementById(section) : null;
  const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY - margin : 0, behavior: reduce ? "auto" : "smooth" });
}

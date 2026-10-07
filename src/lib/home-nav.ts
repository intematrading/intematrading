// Smooth in-page scrolling for links and the top nav. Browser-only: call
// from event handlers or effects.

/**
 * Smooth-scrolls to the element with id `section` (honouring its
 * scroll-margin-top), or to the top when `section` is null. `inquiryType`
 * preselects "I am a…" in the footer's inquiry form.
 */
export function scrollToSection(section: string | null, { inquiryType }: { inquiryType?: string } = {}) {
  const el = section ? document.getElementById(section) : null;
  const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY - margin : 0, behavior: reduce ? "auto" : "smooth" });
  if (inquiryType) window.dispatchEvent(new CustomEvent("inquiry:type", { detail: inquiryType }));
}

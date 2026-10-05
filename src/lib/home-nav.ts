// Moving around the home page from links and the side nav. Browser-only:
// call from event handlers.

/** Asks an open drawer page to slide out and return to the home page. */
export const requestDrawerClose = () => window.dispatchEvent(new Event("drawer:close"));

/**
 * Smooth-scrolls the home page to the element with id `section` (honouring
 * its scroll-margin-top), or to the top when `section` is null. With
 * `closeDrawerFirst`, an open drawer page slides out first. `inquiryType`
 * preselects "I am a…" in the footer's inquiry form.
 */
export function scrollToHomeSection(
  section: string | null,
  { closeDrawerFirst = false, inquiryType }: { closeDrawerFirst?: boolean; inquiryType?: string } = {},
) {
  const go = () => {
    const el = section ? document.getElementById(section) : null;
    const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY - margin : 0, behavior: reduce ? "auto" : "smooth" });
    if (inquiryType) window.dispatchEvent(new CustomEvent("inquiry:type", { detail: inquiryType }));
  };
  if (closeDrawerFirst) {
    requestDrawerClose();
    setTimeout(go, 650);
  } else {
    go();
  }
}

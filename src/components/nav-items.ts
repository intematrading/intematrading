import type { Messages } from "next-intl";

/** Top nav items: the site's pages. */
export const navItems: { href: string; key: keyof Messages["Nav"] }[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/team", key: "team" },
  { href: "/contact", key: "contact" },
];

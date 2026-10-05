import { Boxes, Home, Info, Send, type LucideIcon } from "lucide-react";
import type { Messages } from "next-intl";

/**
 * Side nav items. Each stands for a section of the home page (`section` is
 * its id; Home is the top; Contact is the footer's inquiry form) and, for
 * About and Services, the drawer page that section's CTA opens (`href`).
 * The nav scrolls to the section and highlights the one in view; while a
 * drawer page is open it highlights that page.
 */
export const navItems: { href: string; section?: string; key: keyof Messages["Nav"]; icon: LucideIcon }[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/about", section: "about", key: "about", icon: Info },
  { href: "/services", section: "services", key: "services", icon: Boxes },
  { href: "/contact", section: "contact", key: "contact", icon: Send },
];

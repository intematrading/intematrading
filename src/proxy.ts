import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Everything except API routes, the embedded Sanity Studio, Next internals,
  // Vercel internals and files with an extension (sitemap.xml, robots.txt, images…).
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};

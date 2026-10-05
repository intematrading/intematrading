import { notFound } from "next/navigation";

// Routes unknown paths under /en or /am to the localized not-found page.
// (It lives in the drawer slot because a catch-all in the main slot would
// also claim the drawer pages' URLs and replace the home page under them.)
export default function CatchAll() {
  notFound();
}

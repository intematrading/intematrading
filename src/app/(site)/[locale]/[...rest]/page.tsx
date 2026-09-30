import { notFound } from "next/navigation";

// Routes unknown paths under /en or /am to the localized not-found page.
export default function CatchAll() {
  notFound();
}

import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/content";
import { MIN_FILL_MS, validateInquiry } from "@/lib/inquiry";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";

// Inquiry form endpoint. Delivers each inquiry by email (Resend) and/or by
// saving it as an "inquiry" document in Sanity — whichever is configured.

const typeLabels = { retail: "Retail partner", buyer: "Buyer / distributor", brand: "Brand principal", other: "Other" };

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Spam: a filled honeypot or an impossibly fast submission. Answer "ok" so
  // bots learn nothing, but deliver nothing.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if ((typeof body.website === "string" && body.website.trim()) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateInquiry(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });
  const locale = body.locale === "fr" ? "fr" : "en";

  const resendKey = process.env.RESEND_API_KEY;
  const sanityToken = process.env.SANITY_API_WRITE_TOKEN;
  const jobs: Promise<unknown>[] = [];

  if (resendKey) {
    const settings = await getSiteSettings();
    const to = settings.inquiryRecipient || settings.email;
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Type: ${typeLabels[data.inquiryType]}`,
      `Site language: ${locale === "fr" ? "French" : "English"}`,
      "",
      data.message,
    ].join("\n");
    jobs.push(
      new Resend(resendKey).emails
        .send({
          from: process.env.CONTACT_FROM_EMAIL || "INTEMA website <onboarding@resend.dev>",
          to,
          replyTo: data.email,
          subject: `Website inquiry (${typeLabels[data.inquiryType]}) — ${data.name}`,
          text,
        })
        .then(({ error }) => {
          if (error) throw new Error(error.message);
        }),
    );
  }

  if (sanityToken && isSanityConfigured) {
    jobs.push(
      client
        .withConfig({ token: sanityToken, useCdn: false })
        .create({ _type: "inquiry", ...data, locale, submittedAt: new Date().toISOString() }),
    );
  }

  if (!jobs.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No delivery configured; inquiry not sent:", data);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[contact] RESEND_API_KEY / SANITY_API_WRITE_TOKEN not set — inquiry dropped.");
    return NextResponse.json({ error: "Inquiry delivery is not configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(jobs);
  for (const r of results) if (r.status === "rejected") console.error("[contact] Delivery failed:", r.reason);
  // Succeed if at least one channel took it.
  return results.some((r) => r.status === "fulfilled")
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Could not deliver inquiry" }, { status: 502 });
}

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/lib/content";

// Sanity webhook target: on publish, refresh every statically generated page
// that reads CMS content. Configure in sanity.io/manage → API → Webhooks with
// the same secret as SANITY_REVALIDATE_SECRET.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation not configured" }, { status: 500 });

  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true });
}

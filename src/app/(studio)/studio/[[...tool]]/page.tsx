import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", padding: 32, maxWidth: 640 }}>
        <h1>Sanity Studio isn&apos;t connected yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally <code>NEXT_PUBLIC_SANITY_DATASET</code>)
          in <code>.env.local</code>, then restart the dev server. See <code>.env.example</code>.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}

import { UserRound } from "lucide-react";
import { teamPlaceholders } from "@/content/placeholders";
import type { TeamMember } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { PhotoFrame } from "./PhotoFrame";

/** Rounded card for one person: portrait, name, role and (optionally) a short bio. */
export function TeamCard({ member, locale, showBio = false, onWhite = false }: { member: TeamMember; locale: Locale; showBio?: boolean; /** On a white section: light grey card. */ onWhite?: boolean }) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-3xl ring-1 ring-black/5 transition-shadow hover:shadow-xl ${onWhite ? "bg-steel-100" : "bg-paper shadow-sm"}`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <PhotoFrame
          image={member.photo}
          placeholder={teamPlaceholders[member._id]}
          locale={locale}
          width={480}
          height={600}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          icon={UserRound}
          className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-title-heading text-lg text-ink">{tr(member.name, locale)}</h3>
        <p className="label-caps mt-1 text-red-ink">{tr(member.role, locale)}</p>
        {showBio && member.bio && <p className="mt-3 text-sm text-muted">{tr(member.bio, locale)}</p>}
      </div>
    </article>
  );
}

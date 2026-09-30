import { UserRound } from "lucide-react";
import { teamPlaceholders } from "@/content/placeholders";
import type { TeamMember } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { PhotoFrame } from "./PhotoFrame";

export function TeamCard({ member, locale, showBio = false }: { member: TeamMember; locale: Locale; showBio?: boolean }) {
  return (
    <article className="group flex h-full flex-col bg-paper shadow-sm ring-1 ring-line transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <PhotoFrame
          image={member.photo}
          placeholder={teamPlaceholders[member._id]}
          locale={locale}
          width={480}
          height={600}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          icon={UserRound}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 bg-red [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-title-heading text-lg text-black">{tr(member.name, locale)}</h3>
        <p className="label-caps mt-1 text-red-ink">{tr(member.role, locale)}</p>
        {showBio && member.bio && <p className="mt-3 text-sm text-muted">{tr(member.bio, locale)}</p>}
      </div>
    </article>
  );
}

import type { TeamMember } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { LottiePlayer } from "./LottiePlayer";
import { RoleAnimation } from "./RoleAnimation";

/** Rounded card for one person, no photo: a panel with a short animation of what their role does (their Lottie file from the Studio, else the built-in one), then name, role and (optionally) a short bio. */
export function TeamCard({ member, locale, showBio = false }: { member: TeamMember; locale: Locale; showBio?: boolean }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-paper p-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl sm:p-7">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-steel-100 text-steel-700">
        {member.animationUrl ? (
          <LottiePlayer src={member.animationUrl} className="h-full w-full" fallback={<RoleAnimation role={member.role.en} />} />
        ) : (
          <RoleAnimation role={member.role.en} />
        )}
      </div>
      <h3 className="font-title-heading mt-5 text-base text-ink sm:mt-6 sm:text-lg">{tr(member.name, locale)}</h3>
      <p className="label-caps mt-1 text-red-ink">{tr(member.role, locale)}</p>
      {showBio && member.bio && <p className="mt-3 text-xs text-muted sm:text-sm">{tr(member.bio, locale)}</p>}
    </article>
  );
}

import type { TeamMember } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { MemberAnimation } from "./RoleAnimation";

/** Rounded card for one person, no photo: a full-width panel at the top with a short animation of what their role does (their Lottie file from the Studio if uploaded, else the role's default file in public/role-animations, else left empty), then name, role and (optionally) a short bio. */
export function TeamCard({ member, locale, showBio = false }: { member: TeamMember; locale: Locale; showBio?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-paper px-5 pb-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl sm:px-7 sm:pb-7">
      <div className="-mx-5 aspect-[16/10] bg-white text-steel-700 sm:-mx-7">
        <MemberAnimation member={member} />
      </div>
      <h3 className="font-title-heading mt-5 text-base text-ink sm:mt-6 sm:text-lg">{tr(member.name, locale)}</h3>
      <p className="label-caps mt-1 text-red-ink">{tr(member.role, locale)}</p>
      {showBio && member.bio && <p className="mt-3 text-xs text-muted sm:text-sm">{tr(member.bio, locale)}</p>}
    </article>
  );
}

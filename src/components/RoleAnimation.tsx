import type { TeamMember } from "@/content/types";
import { LottiePlayer } from "./LottiePlayer";

// The default animation for each role: a Lottie file in public/role-animations/,
// served with the site, picked by keywords in the English job title (first
// match wins). To add one, drop the file in that folder and add a line here.
const roleFiles: [RegExp, string][] = [
  [/\bceo\b|owner|director|managing/i, "manager.json"],
  [/media|communication/i, "communication.json"],
  [/marketing/i, "marketing.json"],
  [/sales/i, "sales.json"],
  [/\bhr\b|human resources|people/i, "hr.json"],
  [/finance|account/i, "finance.json"],
  [/general services|facilities|admin/i, "services.json"],
  [/store|warehouse|logistics/i, "warehouse.json"],
  [/technical|\bit\b|tech/i, "tech.json"],
];

/** The role's default animation (by English job title), if it has one. */
const roleAnimationUrl = (role: string) => {
  const file = roleFiles.find(([re]) => re.test(role))?.[1];
  return file && `/role-animations/${file}`;
};

/** A team member's animation: their Lottie file from the Studio if one was uploaded (it overrides the default), else their role's file, else nothing. */
export function MemberAnimation({ member, className = "" }: { member: TeamMember; className?: string }) {
  const src = member.animationUrl ?? roleAnimationUrl(member.role.en);
  return src ? <LottiePlayer src={src} className={`h-full w-full ${className}`} /> : null;
}

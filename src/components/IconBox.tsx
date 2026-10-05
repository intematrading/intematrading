import type { LucideIcon } from "lucide-react";

const sizes = {
  md: { box: "size-11", icon: "size-5" },
  lg: { box: "size-14", icon: "size-7" },
} as const;

const tones = {
  red: "red-gradient",
  steel: "steel-gradient",
  /** For red surfaces. */
  dark: "bg-steel-800",
} as const;

/** Rounded icon tile. Red by default; steel gradient or dark steel for variety and red surfaces. */
export function IconBox({
  icon: Icon,
  tone = "red",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-xl text-paper ${tones[tone]} ${sizes[size].box} ${className}`}>
      <Icon className={sizes[size].icon} strokeWidth={1.75} />
    </span>
  );
}

import type { LucideIcon } from "lucide-react";

const sizes = {
  md: { box: "size-11", icon: "size-5" },
  lg: { box: "size-14", icon: "size-7" },
} as const;

/** Rounded icon tile in the red gradient. */
export function IconBox({
  icon: Icon,
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`red-gradient flex shrink-0 items-center justify-center rounded-xl text-paper ${sizes[size].box} ${className}`}>
      <Icon className={sizes[size].icon} strokeWidth={1.75} />
    </span>
  );
}

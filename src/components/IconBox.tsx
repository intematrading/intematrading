import type { LucideIcon } from "lucide-react";

const sizes = {
  md: { box: "size-11", icon: "size-5" },
  lg: { box: "size-14", icon: "size-7" },
} as const;

/** Slanted icon tile, echoing the buttons and tabs. Red by default; black on red surfaces. */
export function IconBox({ icon: Icon, tone = "red", size = "md" }: { icon: LucideIcon; tone?: "red" | "black"; size?: keyof typeof sizes }) {
  return (
    <span
      aria-hidden="true"
      className={`relative isolate flex shrink-0 items-center justify-center text-paper before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] ${sizes[size].box} ${
        tone === "red" ? "before:bg-red" : "before:bg-black"
      }`}
    >
      <Icon className={sizes[size].icon} strokeWidth={1.75} />
    </span>
  );
}

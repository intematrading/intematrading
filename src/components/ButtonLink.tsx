import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

const variants = {
  red: "text-paper before:bg-red hover:before:bg-black",
  // For black backgrounds, where a black hover would disappear.
  redOnDark: "text-paper before:bg-red hover:text-black hover:before:bg-paper",
  black: "text-paper before:bg-black hover:before:bg-red",
  // For red backgrounds, where a red hover would disappear.
  blackOnRed: "text-paper before:bg-black hover:text-black hover:before:bg-paper",
  outline: "text-paper before:border-2 before:border-paper hover:text-black hover:before:bg-paper",
} as const;

/**
 * Slanted CTA with a trailing arrow; lifts on hover. The slant is a skewed
 * ::before layer, so the focus outline stays a full, unclipped rectangle.
 */
export function ButtonLink({
  variant = "red",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return (
    <Link
      {...props}
      className={`group relative isolate inline-flex min-h-12 items-center gap-2.5 px-7 text-base font-bold transition-[color,transform] duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:-skew-x-[14deg] before:shadow-none before:transition-[background-color,box-shadow] before:duration-300 hover:-translate-y-1 hover:before:shadow-[0_12px_24px_-10px_rgb(0_0_0/0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}

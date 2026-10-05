import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

const variants = {
  red: "red-gradient text-paper hover:bg-steel-800 hover:bg-none",
  // For steel/dark backgrounds, where a dark hover would disappear.
  redOnDark: "red-gradient text-paper hover:bg-paper hover:bg-none hover:text-ink",
  // The logo's grey gradient.
  steel: "steel-gradient text-paper hover:bg-red hover:bg-none",
  // For red backgrounds, where a red hover would disappear.
  steelOnRed: "bg-steel-800 text-paper hover:bg-paper hover:text-ink",
  outline: "text-paper ring-2 ring-paper ring-inset hover:bg-paper hover:text-ink",
} as const;

/** Classes for a CTA; shared with the inquiry form's submit button. */
export const buttonClass = (variant: keyof typeof variants = "red") =>
  `group relative inline-flex min-h-12 items-center gap-2.5 rounded-xl px-7 text-base font-bold transition-[color,background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgb(0_0_0/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variants[variant]}`;

export function ButtonArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
    />
  );
}

/** Rounded CTA with a trailing arrow; lifts gently on hover. */
export function ButtonLink({
  variant = "red",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return (
    <Link
      {...props}
      className={`${buttonClass(variant)} ${className}`}
    >
      {children}
      <ButtonArrow />
    </Link>
  );
}

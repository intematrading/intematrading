import { ImageIcon, type LucideIcon } from "lucide-react";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { PhotoFrame } from "./PhotoFrame";

/**
 * Full-bleed background photo for a dark panel (the panel needs `relative
 * isolate`), under a near-black `overlay` so its text stays readable, with
 * optional darker edges.
 */
export function PhotoBackdrop({
  image,
  placeholder,
  locale,
  overlay = "bg-black/65",
  vignette = false,
  icon = ImageIcon,
  sizes = "(min-width: 1024px) 84rem, 100vw",
  quality,
}: {
  image?: SanityImage;
  placeholder?: Placeholder;
  locale: Locale;
  /** Classes for the shade over the photo (an even tint or a gradient). */
  overlay?: string;
  vignette?: boolean;
  icon?: LucideIcon;
  sizes?: string;
  quality?: number;
}) {
  return (
    <>
      <div className="absolute inset-0 -z-20">
        <PhotoFrame image={image} placeholder={placeholder} locale={locale} width={1920} height={1080} sizes={sizes} icon={icon} quality={quality} />
      </div>
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${overlay}`} />
      {vignette && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.6)_100%)]" />
      )}
    </>
  );
}

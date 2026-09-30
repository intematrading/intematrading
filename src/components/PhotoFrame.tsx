import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { Placeholder } from "@/content/placeholders";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { CmsImage } from "./CmsImage";

/**
 * A CMS photo; failing that, a temporary stock placeholder; failing that, a
 * branded black/red panel with an icon — so layouts always hold their shape.
 */
export function PhotoFrame({
  image,
  placeholder,
  locale,
  width,
  height,
  sizes,
  icon: Icon,
  className = "",
  priority,
  fit = "cover",
}: {
  image: SanityImage | undefined;
  placeholder?: Placeholder;
  locale: Locale;
  width: number;
  height: number;
  sizes: string;
  icon: LucideIcon;
  className?: string;
  priority?: boolean;
  /** "contain" shows the whole image (used by the gallery preview). */
  fit?: "cover" | "contain";
}) {
  if (image?.asset) {
    return (
      <CmsImage
        image={image}
        locale={locale}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }
  if (placeholder) {
    // Stock stand-ins are decorative: the surrounding text carries the meaning.
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={placeholder.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
          style={placeholder.position ? { objectPosition: placeholder.position } : undefined}
        />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={`texture-dark relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
      <div className="absolute -right-1/4 -bottom-1/4 size-3/4 rotate-12 bg-red/90" />
      <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(120deg,#fff_0_1px,transparent_1px_22px)]" />
      <Icon className="relative size-1/3 max-h-40 max-w-40 text-paper" strokeWidth={1.25} />
    </div>
  );
}

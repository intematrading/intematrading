import Image from "next/image";
import type { SanityImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { tr } from "@/lib/content";
import { urlFor } from "@/sanity/image";

/** Renders a Sanity image through next/image; nothing when no image is set. */
export function CmsImage({
  image,
  locale,
  width,
  height,
  sizes,
  className,
  fallbackAlt = "",
  priority,
}: {
  image: SanityImage | undefined;
  locale: Locale;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  fallbackAlt?: string;
  priority?: boolean;
}) {
  if (!image?.asset) return null;
  return (
    <Image
      src={urlFor(image).width(width * 2).height(height * 2).fit("crop").url()}
      alt={tr(image.alt, locale) || fallbackAlt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}

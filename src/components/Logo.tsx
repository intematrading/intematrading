import Image from "next/image";

// Full logo. "color": red and steel-grey lettering, for light backgrounds;
// "white": red and white lettering, for dark backgrounds and photos.
const sources = { color: "/logo.svg", white: "/logo-white.svg" } as const;

export function Logo({
  alt,
  tone = "color",
  className = "h-12 w-auto",
  priority = false,
}: {
  alt: string;
  tone?: keyof typeof sources;
  className?: string;
  priority?: boolean;
}) {
  return <Image src={sources[tone]} alt={alt} width={1215} height={932} priority={priority} unoptimized className={className} />;
}

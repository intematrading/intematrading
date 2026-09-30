import Image from "next/image";

// Cropped copies of public/intema logo.svg (white card and padding removed);
// logo-on-dark.svg swaps the black lettering to white for black backgrounds.
export function Logo({ alt, onDark = false, className = "h-12 w-auto" }: { alt: string; onDark?: boolean; className?: string }) {
  return (
    <Image
      src={onDark ? "/logo-on-dark.svg" : "/logo.svg"}
      alt={alt}
      width={1270}
      height={870}
      priority={!onDark}
      unoptimized
      className={className}
    />
  );
}

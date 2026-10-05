import Image from "next/image";

// Cropped copy of public/Main Logo.svg (outer padding removed).
export function Logo({ alt, className = "h-12 w-auto", priority = false }: { alt: string; className?: string; priority?: boolean }) {
  return <Image src="/logo.svg" alt={alt} width={1215} height={932} priority={priority} unoptimized className={className} />;
}

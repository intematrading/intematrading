/**
 * Renders text with *starred* parts in brand red, e.g. "What *we do*".
 * Editors use the same convention in CMS headline fields. Inside black or red
 * sections (.on-dark / .on-red) the accent turns white.
 */
export function Accent({ text, className = "text-red in-[.on-dark]:text-paper in-[.on-red]:text-paper" }: { text: string; className?: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export const stripAccent = (text: string) => text.replace(/\*(.+?)\*/g, "$1");

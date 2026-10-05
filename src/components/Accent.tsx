/**
 * Renders text with *starred* parts in brand red, e.g. "What *we do*".
 * Editors use the same convention in CMS headline fields. Inside dark
 * sections (.on-dark) the accent turns white. `base` styles the
 * unstarred parts, e.g. the logo's steel gradient.
 */
export function Accent({
  text,
  className = "text-red in-[.on-dark]:text-paper",
  base,
}: {
  text: string;
  className?: string;
  base?: string;
}) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : base && part ? (
          <span key={i} className={base}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

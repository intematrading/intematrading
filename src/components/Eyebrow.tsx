/** Small label above a heading. Use as="span" inside a heading. */
export function Eyebrow({
  children,
  onDark = false,
  as: Tag = "p",
  className = "",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  as?: "p" | "span";
  className?: string;
}) {
  return (
    <Tag className={`label-caps block ${onDark ? "text-paper" : "text-red-ink"} ${className}`}>
      {children}
    </Tag>
  );
}

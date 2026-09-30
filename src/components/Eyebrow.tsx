/** Small red-dashed label above a heading. Use as="span" inside a heading. */
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
    <Tag className={`label-caps flex items-center gap-3 ${onDark ? "text-paper" : "text-ink"} ${className}`}>
      <span aria-hidden="true" className="h-1 w-8 shrink-0 bg-red" />
      {children}
    </Tag>
  );
}

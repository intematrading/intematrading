export function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase ${onDark ? "text-paper" : "text-ink"}`}>
      <span aria-hidden="true" className="h-1 w-8 shrink-0 bg-red" />
      {children}
    </p>
  );
}

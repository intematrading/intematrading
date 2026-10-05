// From lg up, the side padding grows so content clears the fixed side nav
// (--rail-pad, set in globals.css), kept equal on both sides.
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-[var(--rail-pad)] ${className}`}>{children}</div>;
}

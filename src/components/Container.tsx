// Centred page column; from lg up the side padding is --rail-pad (globals.css).
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-[var(--rail-pad)] ${className}`}>{children}</div>;
}

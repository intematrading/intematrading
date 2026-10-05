// Shown in the drawer while a drawer page loads, so it slides open at once.
export default function DrawerLoading() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="h-[clamp(22rem,56svh,34rem)] bg-steel-300" />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-16 sm:px-6 lg:px-[var(--rail-pad)]">
        <div className="h-3 w-28 rounded-full bg-steel-200" />
        <div className="h-12 w-3/5 rounded-2xl bg-steel-200" />
        <div className="h-4 w-full max-w-xl rounded-full bg-steel-200" />
        <div className="h-4 w-4/5 max-w-lg rounded-full bg-steel-200" />
      </div>
    </div>
  );
}

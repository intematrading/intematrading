"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useIsDecorativeCopy } from "./DecorativeCopy";

type ProductPreviewData = {
  title: string;
  label?: string;
  meta?: string;
  description?: string;
  /** Large image, rendered on the server; only mounted while the popup is open. */
  media: React.ReactNode;
};

const PreviewContext = createContext<((data: ProductPreviewData) => void) | null>(null);

/** One shared popup (native <dialog>: focus trapped, Esc closes) for all product cards inside. */
export function ProductPreviewProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Services");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<ProductPreviewData | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <PreviewContext.Provider value={setItem}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={() => setItem(null)}
        onClick={(e) => e.target === e.currentTarget && setItem(null)}
        aria-label={item?.title}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] max-w-none bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-md"
      >
        {item && (
          <div className="relative grid overflow-hidden rounded-[1.75rem] bg-paper shadow-2xl sm:rounded-[2rem] md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-96">
              {item.media}
            </div>
            <div className="flex flex-col p-6 sm:p-8 md:p-10">
              {item.label && (
                <span className="w-fit rounded-full bg-steel-100 px-3 py-1 text-[0.6875rem] font-bold tracking-wider text-ink uppercase">{item.label}</span>
              )}
              <h3 className="font-title-heading mt-4 text-2xl text-ink">{item.title}</h3>
              {item.meta && (
                <p className="mt-2 text-sm font-semibold text-muted" lang="en">
                  {item.meta}
                </p>
              )}
              {item.description && <p className="mt-4 text-base leading-relaxed text-ink">{item.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => setItem(null)}
              aria-label={t("closePreview")}
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/40 text-paper ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-red"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </dialog>
    </PreviewContext.Provider>
  );
}

/**
 * Invisible button stretched over a card (the card needs `relative`), so the
 * whole card opens the shared popup while its content stays real headings and
 * text. Renders nothing outside a ProductPreviewProvider.
 */
export function ProductPreviewTrigger({ data, label }: { data: ProductPreviewData; label: string }) {
  const open = useContext(PreviewContext);
  const decorative = useIsDecorativeCopy();
  if (!open) return null;
  return (
    <button
      type="button"
      tabIndex={decorative ? -1 : undefined}
      onClick={() => open(data)}
      aria-haspopup="dialog"
      aria-label={label}
      className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-offset-4"
    />
  );
}

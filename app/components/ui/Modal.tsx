"use client";

import { useEffect, useRef } from "react";

/**
 * Dialog shell: Esc and backdrop close it, the page behind does not scroll, the
 * close button takes focus on open and focus returns to whatever opened it.
 */
export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] bg-slate-900/70 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3 right-3 w-9 h-9 rounded-full text-slate-500 text-xl leading-none hover:bg-zinc-100 transition-colors"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-slate-900 pr-8 mb-1">{title}</h2>
        {children}
      </div>
    </div>
  );
}

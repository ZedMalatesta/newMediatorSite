"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/app/lib/data";

/**
 * Off-canvas navigation for narrow viewports.
 *
 * The full nav (`Navbar`) only renders at `lg` and up — below that there was
 * no way to reach it at all, on phones and on most tablets. This is the
 * missing other half: a hamburger trigger plus a slide-in panel covering the
 * same links, with each group's children behind a native disclosure so a
 * screen reader and keyboard get the expand/collapse state for free.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // A drawer meant for narrow viewports has no reason to stay open once the
    // window is widened past the breakpoint where the full nav takes over.
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-600 hover:bg-zinc-100 transition-colors"
      >
        <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Меню сайта">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpen(false)}
          />

          <div
            id="mobile-menu-panel"
            className="absolute inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 flex-shrink-0">
              <span className="font-semibold text-slate-900">Меню</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:bg-zinc-100 transition-colors"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {navLinks.map((link) =>
                link.children ? (
                  <details key={link.label} className="group border-b border-slate-100">
                    <summary className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 cursor-pointer list-none hover:bg-zinc-50 transition-colors">
                      {link.label}
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block px-7 py-2 text-sm text-slate-600 hover:bg-accent-50 hover:text-accent-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-zinc-50 transition-colors border-b border-slate-100"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

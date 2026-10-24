"use client";

import Link from "next/link";
import { writeProfile, type StoredProfile } from "@lib/auth";
import { useStore } from "@lib/clientStore";

/**
 * Header account control (change request point 2).
 *
 * The remembered profile lives in localStorage, which does not exist while the
 * static export is prerendered. It is read through the shared store, which
 * renders "signed out" for the prerender and hydration pass and the real value
 * straight after - so the markup matches and no effect is needed.
 */
export default function AccountMenu({ className = "" }: { className?: string }) {
  const profile = useStore<StoredProfile | null>("mediatorok.profile", null);

  if (!profile) {
    return (
      <Link
        href="/account"
        // On a phone the word is hidden and only the icon shows; the name stays.
        aria-label="Вход"
        className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-accent-600 transition-colors ${className}`}
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="hidden sm:inline">Вход</span>
      </Link>
    );
  }

  const display = profile.name?.trim() || profile.email;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-accent-600 transition-colors max-w-[10rem] truncate"
        title={display}
        // On a phone only the initial shows; the link still says whose account it is.
        aria-label={`Личный кабинет: ${display}`}
      >
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700 text-xs font-bold">
          {display.slice(0, 1).toUpperCase()}
        </span>
        <span className="hidden sm:inline truncate">{display}</span>
      </Link>
      <button
        type="button"
        onClick={() => {
          writeProfile(null);
        }}
        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        Выйти
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readProfile, writeProfile, type StoredProfile } from "@lib/auth";

/**
 * Header account control (change request point 2).
 *
 * The remembered profile is read after mount, never during render: it lives in
 * localStorage, which does not exist while the static export is prerendered, so
 * reading it during render would mismatch on hydration.
 */
export default function AccountMenu({ className = "" }: { className?: string }) {
  const [profile, setProfile] = useState<StoredProfile | null>(null);

  useEffect(() => setProfile(readProfile()), []);

  if (!profile) {
    return (
      <Link
        href="/account"
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
          setProfile(null);
        }}
        className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
      >
        Выйти
      </button>
    </div>
  );
}

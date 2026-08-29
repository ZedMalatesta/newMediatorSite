"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { search } from "@lib/search";

/**
 * Site search ("Я ищу", change request point 1).
 *
 * Runs entirely in the browser against the generated index, because the site is
 * a static export with no server to query.
 */
export default function SearchBox({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => (query.trim() ? search(query, 6) : []), [query]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={go} role="search">
        <label htmlFor="site-search" className="sr-only">
          Поиск по сайту
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          placeholder="Я ищу"
          autoComplete="off"
          className="w-full bg-slate-100 border border-slate-200 rounded-full pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent-400 focus:bg-white transition-colors"
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </form>

      {open && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">
              Ничего не найдено по запросу «{query.trim()}»
            </p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    className="block px-4 py-2.5 hover:bg-accent-50 transition-colors"
                  >
                    <span className="block text-sm font-semibold text-slate-800">
                      {r.title}
                    </span>
                    {r.description && (
                      <span className="block text-xs text-slate-500 line-clamp-1">
                        {r.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

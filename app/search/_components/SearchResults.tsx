"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { search } from "@lib/search";

export default function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const results = useMemo(() => (query ? search(query, 50) : []), [query]);

  if (!query) {
    return (
      <p className="text-slate-500">
        Введите запрос в строку поиска, чтобы найти программы, услуги и
        специалистов.
      </p>
    );
  }

  return (
    <>
      <p className="text-slate-500 mb-8" role="status" aria-live="polite">
        {results.length === 0
          ? `Ничего не найдено по запросу «${query}»`
          : `Найдено: ${results.length} — по запросу «${query}»`}
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-slate-600 text-sm mb-4">
            Попробуйте другой запрос или посмотрите основные разделы:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/obuchenie", label: "Обучение" },
              { href: "/mediation", label: "Медиация" },
              { href: "/trainers", label: "Наши тренеры" },
              { href: "/contacts", label: "Контакты" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-accent-600 font-semibold text-sm hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((r) => (
            <li
              key={r.slug}
              className="rounded-xl border border-slate-200 p-5 hover:border-accent-200 transition-colors"
            >
              <Link href={`/${r.slug}`} className="group">
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-accent-600 transition-colors">
                  {r.title}
                </h2>
                {r.description && (
                  <p className="text-slate-500 text-sm mt-1">{r.description}</p>
                )}
                {r.text && (
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {r.text}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useFavourites } from "@/app/hooks/useFavourites";
import { searchIndex } from "@lib/searchIndex";
import FavouriteButton from "@ui/FavouriteButton/FavouriteButton";

const bySlug = new Map(searchIndex.map((d) => [d.slug, d]));

export default function FavouritesList() {
  const { slugs, ready } = useFavourites();

  // Nothing is known until localStorage is read after mount.
  if (!ready) return <p className="text-slate-400">Загрузка…</p>;

  const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-600 text-sm mb-4">
          Здесь появятся программы и услуги, которые вы сохранили.
        </p>
        <Link href="/obuchenie" className="text-accent-600 font-semibold text-sm hover:underline">
          Посмотреть программы обучения →
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((doc) => (
        <li
          key={doc!.slug}
          className="flex items-start gap-3 rounded-xl border border-slate-200 p-5 hover:border-accent-200 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <Link href={`/${doc!.slug}`} className="group">
              <h2 className="font-bold text-slate-900 group-hover:text-accent-600 transition-colors">
                {doc!.title}
              </h2>
              {doc!.description && (
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{doc!.description}</p>
              )}
            </Link>
          </div>
          <FavouriteButton slug={doc!.slug} title={doc!.title} className="flex-shrink-0" />
        </li>
      ))}
    </ul>
  );
}

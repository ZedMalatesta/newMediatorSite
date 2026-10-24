"use client";

import { useFavourites } from "@/app/hooks/useFavourites";

/** Save/unsave control for a course or service (Избранное). */
export default function FavouriteButton({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { has, toggle, ready } = useFavourites();
  const saved = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={ready ? saved : undefined}
      aria-label={saved ? `Убрать «${title}» из избранного` : `Добавить «${title}» в избранное`}
      title={saved ? "В избранном" : "В избранное"}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        saved
          ? "text-accent-600 hover:text-accent-700"
          : "text-slate-400 hover:text-accent-500"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}

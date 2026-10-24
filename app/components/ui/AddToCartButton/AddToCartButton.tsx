"use client";

import { useState } from "react";
import { useCart } from "@/app/hooks/useCart";

/** Adds a programme or service to the cart (change request point 3). */
export default function AddToCartButton({
  slug,
  title,
  priceByn,
  className = "",
}: {
  slug: string;
  title: string;
  priceByn?: number;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug, title, priceByn });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-accent-300 px-3 py-1.5 text-xs font-semibold text-accent-700 hover:bg-accent-50 transition-colors ${className}`}
    >
      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 17a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span aria-live="polite">{added ? "Добавлено" : "В корзину"}</span>
    </button>
  );
}

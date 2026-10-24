"use client";

import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";
import { useFavourites } from "@/app/hooks/useFavourites";

/** Favourites and cart indicators (change request point 3 and Избранное). */
export default function HeaderActions({ className = "" }: { className?: string }) {
  const { count: cartCount, ready: cartReady } = useCart();
  const { count: favCount, ready: favReady } = useFavourites();

  const badge =
    "absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-accent-500 text-white text-[0.65rem] font-bold flex items-center justify-center";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link
        href="/favourites"
        className="relative text-slate-600 hover:text-accent-600 transition-colors"
        aria-label={favReady && favCount ? `Избранное: ${favCount}` : "Избранное"}
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {favReady && favCount > 0 && <span className={badge}>{favCount}</span>}
      </Link>

      <Link
        href="/cart"
        className="relative text-slate-600 hover:text-accent-600 transition-colors"
        aria-label={cartReady && cartCount ? `Корзина: ${cartCount}` : "Корзина"}
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 17a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartReady && cartCount > 0 && <span className={badge}>{cartCount}</span>}
      </Link>
    </div>
  );
}

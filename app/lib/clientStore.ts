"use client";

/**
 * Tiny localStorage-backed store for browser-only state (favourites, cart).
 *
 * A plain useState per component would let two mounted components disagree -
 * the header count and the page would drift apart - so writes broadcast a
 * custom event that every subscriber listens for. `storage` alone is not
 * enough: browsers fire it only in *other* tabs, never the one that wrote.
 */
export type StoreKey = "mediatorok.favourites" | "mediatorok.cart";

export function readStore<T>(key: StoreKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: StoreKey, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable - state stays in memory for this view */
  }
  window.dispatchEvent(new CustomEvent(`store:${key}`));
}

export function subscribe(key: StoreKey, onChange: () => void): () => void {
  const handler = () => onChange();
  window.addEventListener(`store:${key}`, handler);
  window.addEventListener("storage", handler); // other tabs
  return () => {
    window.removeEventListener(`store:${key}`, handler);
    window.removeEventListener("storage", handler);
  };
}

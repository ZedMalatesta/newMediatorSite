"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for browser-only state (favourites, cart, the
 * remembered profile).
 *
 * Components read it through useSyncExternalStore rather than copying it into
 * their own state, so two mounted components cannot disagree - the header count
 * and the page always render from the same value - and there is no effect that
 * reads storage and sets state after mount. Writes broadcast a custom event,
 * because the native `storage` event only fires in *other* tabs, never the one
 * that wrote.
 */
export type StoreKey = "mediatorok.favourites" | "mediatorok.cart" | "mediatorok.profile";

/** Holds values when storage itself is unavailable (private mode, blocked). */
const memory = new Map<StoreKey, string>();
/** Last parsed value per key, so an unchanged store returns the same reference. */
const cache = new Map<StoreKey, { raw: string | null; value: unknown }>();

function readRaw(key: StoreKey): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function snapshot<T>(key: StoreKey, fallback: T): T {
  const raw = readRaw(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;

  let value = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      /* corrupt entry - treat as empty */
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function readStore<T>(key: StoreKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return snapshot(key, fallback);
}

export function writeStore<T>(key: StoreKey, value: T): void {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    memory.set(key, raw);
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

/**
 * Subscribes a component to a store key. `fallback` is what renders during
 * prerender and hydration, when there is no storage to read - pass a stable
 * reference (a module-level constant), not a fresh literal.
 */
export function useStore<T>(key: StoreKey, fallback: T): T {
  return useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    () => snapshot(key, fallback),
    () => fallback,
  );
}

const never = () => () => {};

/** False while prerendering and hydrating, true once browser state is readable. */
export function useHydrated(): boolean {
  return useSyncExternalStore(never, () => true, () => false);
}

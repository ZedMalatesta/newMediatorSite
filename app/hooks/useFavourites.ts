"use client";

import { useCallback } from "react";
import { readStore, writeStore, useStore, useHydrated } from "@lib/clientStore";

const KEY = "mediatorok.favourites" as const;
const EMPTY: string[] = [];

/** Saved course/service slugs (change request: Избранное). */
export function useFavourites() {
  const slugs = useStore<string[]>(KEY, EMPTY);
  // Nothing is known about the visitor's saved items until the browser's
  // storage is readable; callers use this to avoid claiming "nothing saved".
  const ready = useHydrated();

  const toggle = useCallback((slug: string) => {
    const current = readStore<string[]>(KEY, EMPTY);
    writeStore(KEY, current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, has, toggle, ready, count: slugs.length };
}

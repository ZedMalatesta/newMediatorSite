"use client";

import { useCallback, useEffect, useState } from "react";
import { readStore, writeStore, subscribe } from "@lib/clientStore";

const KEY = "mediatorok.favourites" as const;

/** Saved course/service slugs (change request: Избранное). */
export function useFavourites() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read after mount: localStorage does not exist during prerender.
  useEffect(() => {
    const sync = () => setSlugs(readStore<string[]>(KEY, []));
    sync();
    setReady(true);
    return subscribe(KEY, sync);
  }, []);

  const toggle = useCallback((slug: string) => {
    const next = readStore<string[]>(KEY, []);
    const i = next.indexOf(slug);
    if (i >= 0) next.splice(i, 1);
    else next.push(slug);
    writeStore(KEY, next);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, has, toggle, ready, count: slugs.length };
}

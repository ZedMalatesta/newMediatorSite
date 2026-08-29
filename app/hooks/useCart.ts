"use client";

import { useCallback, useEffect, useState } from "react";
import { readStore, writeStore, subscribe } from "@lib/clientStore";

const KEY = "mediatorok.cart" as const;

/**
 * Cart line. `priceByn` is optional on purpose: this site has no unified price
 * data - figures live in per-page copy and several are unresolved with the
 * client - so a line with an unknown price says so rather than inventing one.
 */
export type CartLine = {
  slug: string;
  title: string;
  priceByn?: number;
  qty: number;
};

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLines(readStore<CartLine[]>(KEY, []));
    sync();
    setReady(true);
    return subscribe(KEY, sync);
  }, []);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    const next = readStore<CartLine[]>(KEY, []);
    const found = next.find((l) => l.slug === line.slug);
    if (found) found.qty += qty;
    else next.push({ ...line, qty });
    writeStore(KEY, next);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const next = readStore<CartLine[]>(KEY, [])
      .map((l) => (l.slug === slug ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    writeStore(KEY, next);
  }, []);

  const remove = useCallback((slug: string) => {
    writeStore(KEY, readStore<CartLine[]>(KEY, []).filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => writeStore(KEY, [] as CartLine[]), []);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const pricedLines = lines.filter((l) => typeof l.priceByn === "number");
  const total = pricedLines.reduce((n, l) => n + (l.priceByn ?? 0) * l.qty, 0);
  /** True when some lines have no known price, so the total is partial. */
  const hasUnpriced = pricedLines.length !== lines.length;

  return { lines, add, setQty, remove, clear, count, total, hasUnpriced, ready };
}

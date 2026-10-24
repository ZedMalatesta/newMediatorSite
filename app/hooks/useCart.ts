"use client";

import { useCallback } from "react";
import { readStore, writeStore, useStore, useHydrated } from "@lib/clientStore";

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

const EMPTY: CartLine[] = [];

export function useCart() {
  const lines = useStore<CartLine[]>(KEY, EMPTY);
  const ready = useHydrated();

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    const current = readStore<CartLine[]>(KEY, EMPTY);
    const exists = current.some((l) => l.slug === line.slug);
    writeStore(
      KEY,
      exists
        ? current.map((l) => (l.slug === line.slug ? { ...l, qty: l.qty + qty } : l))
        : [...current, { ...line, qty }],
    );
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const next = readStore<CartLine[]>(KEY, EMPTY)
      .map((l) => (l.slug === slug ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    writeStore(KEY, next);
  }, []);

  const remove = useCallback((slug: string) => {
    writeStore(KEY, readStore<CartLine[]>(KEY, EMPTY).filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => writeStore(KEY, [] as CartLine[]), []);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const pricedLines = lines.filter((l) => typeof l.priceByn === "number");
  const total = pricedLines.reduce((n, l) => n + (l.priceByn ?? 0) * l.qty, 0);
  /** True when some lines have no known price, so the total is partial. */
  const hasUnpriced = pricedLines.length !== lines.length;

  return { lines, add, setQty, remove, clear, count, total, hasUnpriced, ready };
}

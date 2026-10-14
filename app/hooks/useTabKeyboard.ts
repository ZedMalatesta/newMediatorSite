"use client";

import { useCallback, useRef } from "react";

/**
 * Roving-focus keyboard handling for a tablist (spec §14).
 *
 * Arrow keys move between tabs and wrap; Home/End jump to the ends. Focus
 * follows selection, which is the expected behaviour for tabs whose panels
 * render immediately.
 */
export function useTabKeyboard(count: number, onSelect: (index: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const setRef = useCallback(
    (i: number) => (el: HTMLButtonElement | null) => {
      refs.current[i] = el;
    },
    [],
  );

  const onKeyDown = useCallback(
    (i: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();

      let next = i;
      if (e.key === "ArrowRight") next = (i + 1) % count;
      if (e.key === "ArrowLeft") next = (i - 1 + count) % count;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = count - 1;

      onSelect(next);
      refs.current[next]?.focus();
    },
    [count, onSelect],
  );

  return { setRef, onKeyDown };
}

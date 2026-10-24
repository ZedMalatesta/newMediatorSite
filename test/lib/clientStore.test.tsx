import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readStore, subscribe, useHydrated, useStore, writeStore } from "@lib/clientStore";

afterEach(() => vi.restoreAllMocks());

describe("clientStore", () => {
  it("returns the fallback for an empty or corrupt entry", () => {
    expect(readStore("mediatorok.cart", [])).toEqual([]);
    window.localStorage.setItem("mediatorok.cart", "{not json");
    expect(readStore("mediatorok.cart", ["fallback"])).toEqual(["fallback"]);
  });

  it("returns the same reference while the stored value is unchanged", () => {
    writeStore("mediatorok.favourites", ["a"]);
    const first = readStore("mediatorok.favourites", []);
    expect(readStore("mediatorok.favourites", [])).toBe(first);
  });

  it("notifies subscribers in this tab and from other tabs, until unsubscribed", () => {
    const onChange = vi.fn();
    const unsubscribe = subscribe("mediatorok.favourites", onChange);
    writeStore("mediatorok.favourites", ["a"]);
    window.dispatchEvent(new Event("storage"));
    expect(onChange).toHaveBeenCalledTimes(2);
    unsubscribe();
    writeStore("mediatorok.favourites", ["b"]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("keeps working in memory when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    writeStore("mediatorok.profile", { name: "Анна" });
    expect(readStore("mediatorok.profile", null)).toEqual({ name: "Анна" });
  });

  it("re-renders every component reading a key when it is written", () => {
    function Count() {
      const items = useStore<string[]>("mediatorok.favourites", []);
      const hydrated = useHydrated();
      return <p>{hydrated ? items.length : "…"}</p>;
    }
    render(<Count />);
    expect(screen.getByText("0")).toBeInTheDocument();
    act(() => writeStore("mediatorok.favourites", ["a", "b"]));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does nothing outside the browser", () => {
    const win = globalThis.window;
    // @ts-expect-error - simulating the server
    delete globalThis.window;
    try {
      expect(readStore("mediatorok.cart", "server")).toBe("server");
      expect(() => writeStore("mediatorok.cart", [])).not.toThrow();
    } finally {
      globalThis.window = win;
    }
  });
});

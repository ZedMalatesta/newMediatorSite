import { vi } from "vitest";

/** The router state the mocked next/navigation hooks read. */
export const navigation = {
  pathname: "/",
  search: "",
  push: vi.fn(),
  reset() {
    this.pathname = "/";
    this.search = "";
    this.push = vi.fn();
  },
};

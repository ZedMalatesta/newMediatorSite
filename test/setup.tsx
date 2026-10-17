import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { navigation } from "./navigation";

afterEach(() => {
  cleanup();
  navigation.reset();
  window.localStorage.clear();
});

// The App Router hooks need a mounted router; tests drive them through
// `navigation` instead (path, query and the push spy).
vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams(navigation.search),
  useRouter: () => ({ push: navigation.push, replace: navigation.push, back: vi.fn(), prefetch: vi.fn() }),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

// next/font is compiled by Next itself; in tests a font is just its class names.
vi.mock("next/font/google", () => {
  const font = () => ({ className: "font", variable: "font-var", style: { fontFamily: "font" } });
  return { Inter: font, Manrope: font };
});

// next/image needs the build's image config. Here it is an <img> that goes
// through the site's own loader, so base-path handling is still exercised.
vi.mock("next/image", async () => {
  const { default: loader } = await import("@/app/lib/imageLoader");
  return {
    default: ({ src, alt, fill, priority, sizes, quality, placeholder, ...rest }: Record<string, unknown>) => {
      void fill; void priority; void sizes; void quality; void placeholder;
      const url = typeof src === "string" ? loader({ src, width: 640 }) : "";
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={url} alt={alt as string} {...(rest as object)} />;
    },
  };
});

class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.assign(globalThis, { IntersectionObserver: Observer, ResizeObserver: Observer });
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

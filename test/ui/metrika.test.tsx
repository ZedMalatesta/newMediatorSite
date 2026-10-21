import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import Metrika from "@/app/components/seo/Metrika";
import { navigation } from "../navigation";

afterEach(() => {
  delete window.ym;
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Metrika", () => {
  it("reports each later page as a hit, leaving the first to the tag", () => {
    const ym = vi.fn();
    window.ym = ym;
    const { rerender } = render(<Metrika id={42} />);
    expect(ym).not.toHaveBeenCalled();

    navigation.pathname = "/trainers";
    rerender(<Metrika id={42} />);
    expect(ym).toHaveBeenCalledTimes(1);
    expect(ym).toHaveBeenCalledWith(42, "hit", window.location.href, { referer: document.referrer });
  });

  it("does nothing while the tag has not loaded", () => {
    const { rerender } = render(<Metrika id={42} />);
    navigation.pathname = "/trainers";
    expect(() => rerender(<Metrika id={42} />)).not.toThrow();
  });

  it("is on the site's own domain only", async () => {
    const page = (Layout: (p: { children: React.ReactNode }) => React.ReactNode) =>
      renderToStaticMarkup(<Layout><p>page</p></Layout>);

    const { default: StagingLayout } = await import("@/app/layout");
    expect(page(StagingLayout)).not.toContain("mc.yandex.ru");

    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mediatorok.by");
    const { default: LiveLayout } = await import("@/app/layout");
    expect(page(LiveLayout)).toContain("mc.yandex.ru/watch/105878977");
  });
});

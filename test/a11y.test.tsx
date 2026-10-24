import fs from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { beforeAll, describe, expect, it } from "vitest";
import AudiencePage from "@/app/audience/[slug]/page";
import NotFound from "@/app/not-found";
import { audiences } from "@lib/audiences";
import { navigation } from "./navigation";

/** Every static route, as in pages.test.tsx. */
function routes(): string[] {
  const app = path.join(process.cwd(), "app");
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && !/^[_[]/.test(entry.name)) walk(full);
      else if (entry.name === "page.tsx") found.push(path.relative(app, dir));
    }
  };
  walk(app);
  return found.sort();
}

/**
 * jsdom applies no CSS, so both of a layout's alternatives - the desktop and
 * the phone search box - would count as shown. Tailwind's `hidden` is the one
 * rule that decides that; with it the page is checked as a phone shows it.
 */
beforeAll(() => {
  const style = document.createElement("style");
  style.textContent = ".hidden { display: none; }";
  document.head.append(style);
});

async function violations(container: HTMLElement): Promise<string[]> {
  const result = await axe.run(container, {
    // Embedded players and maps are other sites' documents.
    iframes: false,
    // Contrast needs real rendering; jsdom computes no colours.
    rules: { "color-contrast": { enabled: false } },
  });
  return result.violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${v.help}\n    ${n.html.slice(0, 160)}`));
}

describe("every route is accessible", () => {
  for (const dir of routes()) {
    const route = `/${dir}`.replace(/\/$/, "") || "/";
    it(route, async () => {
      navigation.pathname = route;
      const { default: Page } = (await import(/* @vite-ignore */ path.join(process.cwd(), "app", dir, "page.tsx"))) as {
        default: () => React.ReactNode | Promise<React.ReactNode>;
      };
      const { container } = render(<>{await Page()}</>);
      const found = await violations(container);
      expect(found, found.join("\n")).toEqual([]);
    });
  }

  for (const { slug } of audiences) {
    it(`/audience/${slug}`, async () => {
      navigation.pathname = `/audience/${slug}`;
      const { container } = render(await AudiencePage({ params: Promise.resolve({ slug }) }));
      const found = await violations(container);
      expect(found, found.join("\n")).toEqual([]);
    });
  }

  it("the 404 page", async () => {
    const { container } = render(<NotFound />);
    const found = await violations(container);
    expect(found, found.join("\n")).toEqual([]);
  });
});

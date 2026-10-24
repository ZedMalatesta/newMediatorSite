import fs from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { navigation } from "./navigation";

/** Every static route: app/<segment>/page.tsx, plus the home page. */
function routes(): string[] {
  const app = path.join(process.cwd(), "app");
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      // Dynamic routes have their own tests; _components are not routes.
      if (entry.isDirectory() && !/^[_[]/.test(entry.name)) walk(full);
      else if (entry.name === "page.tsx") found.push(path.relative(app, dir));
    }
  };
  walk(app);
  return found.sort();
}

describe("every route renders", () => {
  for (const dir of routes()) {
    const route = `/${dir}`.replace(/\/$/, "") || "/";
    it(route, async () => {
      navigation.pathname = route;
      const file = path.join(process.cwd(), "app", dir, "page.tsx");
      const { default: Page } = (await import(/* @vite-ignore */ file)) as {
        default: () => React.ReactNode | Promise<React.ReactNode>;
      };
      const { container } = render(<>{await Page()}</>);
      expect(container.querySelector("main") ?? container.firstChild).toBeTruthy();
    });
  }
});

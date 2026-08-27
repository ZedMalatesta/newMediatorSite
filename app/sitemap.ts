import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { absoluteUrl } from "@lib/site";

/**
 * Spec §12: the site had no sitemap. Routes are read from the app directory so
 * the sitemap cannot drift out of sync with the pages that actually exist.
 */
function routes(): string[] {
  const appDir = path.join(process.cwd(), "app");
  const found = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .filter((e) => fs.existsSync(path.join(appDir, e.name, "page.tsx")))
    .map((e) => `/${e.name}`);
  return ["/", ...found.sort()];
}

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes().map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

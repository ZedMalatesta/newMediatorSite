import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Unit and component tests for the site (app/), run in jsdom.
 *
 * Coverage counts the code that ships: everything under app/ except the files
 * scripts/sync-live.ts and scripts/build-search-index.ts generate, which are
 * data, not logic - importing them would "cover" them.
 */
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.tsx"],
    include: ["test/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/lib/pageBlocks.ts",
        "app/lib/pageForms.ts",
        "app/lib/liveNav.ts",
        "app/lib/liveDates.ts",
        "app/lib/searchIndex.ts",
      ],
      reporter: ["text-summary", "text", "html"],
      thresholds: { statements: 90, lines: 90, functions: 90, branches: 90 },
    },
  },
});

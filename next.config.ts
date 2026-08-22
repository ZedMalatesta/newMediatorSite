import type { NextConfig } from "next";

/**
 * GitHub Pages serves this project at https://<user>.github.io/newMediatorSite/,
 * so the export needs a base path. It is opt-in via BASE_PATH (set by the deploy
 * workflow) to keep `next dev` and local builds working at the domain root.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Exposed to the client so the image loader can prefix public/ assets, which
  // basePath does not cover on its own.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // A custom loader replaces `unoptimized` here: static export needs one or
    // the other, and only the loader can apply the base path.
    loader: "custom",
    loaderFile: "./app/lib/imageLoader.ts",
  },
};

export default nextConfig;

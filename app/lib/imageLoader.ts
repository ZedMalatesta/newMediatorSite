/**
 * Custom next/image loader for the static export.
 *
 * `basePath` is not applied to the `src` of images served from public/, so on
 * GitHub Pages (which serves the site under /newMediatorSite/) every image would
 * 404. This prefixes them centrally instead of touching each call site.
 *
 * In a production build it also serves the resized WebP variant that covers the
 * requested width (see imageVariants.ts). `next dev` and the tests use the
 * originals, since the variants are only made by `npm run build`.
 */
import { hasVariants, variantPath, variantWidth } from "./imageVariants";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width }: LoaderArgs): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // Remote images pass through untouched.
  if (/^https?:\/\//.test(src)) return src;

  // An already-prefixed path is prefixed once, not twice.
  const local = basePath && src.startsWith(`${basePath}/`) ? src.slice(basePath.length) : src;
  const file =
    process.env.NODE_ENV === "production" && hasVariants(local)
      ? variantPath(local, variantWidth(width))
      : local;
  return `${basePath}${file}`;
}

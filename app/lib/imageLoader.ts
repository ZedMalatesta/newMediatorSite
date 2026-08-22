/**
 * Custom next/image loader for the static export.
 *
 * `basePath` is not applied to the `src` of images served from public/, so on
 * GitHub Pages (which serves the site under /newMediatorSite/) every image would
 * 404. This prefixes them centrally instead of touching each call site.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src }: LoaderArgs): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // Absolute URLs and already-prefixed paths pass through untouched.
  if (/^https?:\/\//.test(src) || (basePath && src.startsWith(basePath))) {
    return src;
  }
  return `${basePath}${src}`;
}

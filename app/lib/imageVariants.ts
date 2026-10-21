/**
 * Resized WebP copies of the pictures in public/images.
 *
 * A static export has no image server, so next/image cannot resize on request:
 * every visitor downloaded the full-size original, 1 MB photographs on a phone
 * included. scripts/optimize-images.ts writes each picture at the widths below
 * before the build, and the image loader asks for the one that fits.
 *
 * A variant's path keeps the original's (/images/a.jpg becomes
 * /optimized/640/images/a.jpg.webp), so anything that looks for the original
 * in the page - the page audit does - still finds it.
 */

/** Widths for pictures narrower than a screen: icons, portraits, cards (at 1x and 2x). */
export const IMAGE_SIZES = [96, 192, 384] as const;
/** Widths for pictures as wide as a screen. */
export const DEVICE_SIZES = [640, 1080, 1920] as const;
export const WIDTHS: readonly number[] = [...IMAGE_SIZES, ...DEVICE_SIZES];

export const VARIANT_DIR = "optimized";

/** Vector and animated pictures are served as they are. */
const RASTER = /^\/images\/.+\.(jpe?g|png|webp)$/i;

export const hasVariants = (src: string): boolean => RASTER.test(src);

/** The smallest generated width that covers the requested one. */
export function variantWidth(requested: number): number {
  return WIDTHS.find((w) => w >= requested) ?? WIDTHS[WIDTHS.length - 1];
}

/** Path of the variant of `src` (a path under public/) at `width`. */
export const variantPath = (src: string, width: number): string =>
  `/${VARIANT_DIR}/${width}${src}.webp`;

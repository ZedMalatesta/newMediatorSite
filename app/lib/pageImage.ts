import { pageBlocks, pageCover } from "./pageBlocks";

/** Below this width an image is an icon or badge, not a card illustration. */
const MIN_CARD_WIDTH = 600;

export type CardImage = { src: string; alt: string };

/**
 * The image that represents a page on a listing card.
 *
 * Prefers the lead image the original page used, falling back to its first
 * wide photo. Utility and legal pages have neither, so callers must handle
 * null rather than assume every route has a picture.
 */
export function cardImage(slug: string): CardImage | null {
  const cover = pageCover[slug];
  if (cover) return { src: cover, alt: "" };

  for (const block of pageBlocks[slug] ?? []) {
    const photo = block.images.find((i) => i.width >= MIN_CARD_WIDTH);
    if (photo) return { src: photo.src, alt: photo.alt };
  }
  return null;
}

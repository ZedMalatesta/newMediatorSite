import { getPageBlocks, type BlockVideo } from "./pageBlocks";

/**
 * Videos the live homepage embeds, split by where it shows them.
 *
 * The homepage is built from hand-written sections rather than PageBlocks, so
 * its videos are picked out of the manifest here: the live page attaches one to
 * each news item (a video block with accompanying text) and shows the rest
 * alongside the written testimonials.
 */
export function homeVideos(): { news: BlockVideo[]; testimonials: BlockVideo[] } {
  const withVideo = getPageBlocks("home").filter((b) => b.videos.length > 0);
  return {
    news: withVideo.filter((b) => b.paragraphs.length > 0).flatMap((b) => b.videos),
    testimonials: withVideo.filter((b) => b.paragraphs.length === 0).flatMap((b) => b.videos),
  };
}

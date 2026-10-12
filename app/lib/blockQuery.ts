import { cleanCopy } from "./copyFilters";
import { getPageBlocks, type PageBlock } from "./pageBlocks";

/**
 * Lets a hand-built section take its wording and pictures from the synced live
 * page instead of a typed copy: the layout is designed here, the content stays
 * whatever the live block currently says.
 */
export function blockByHeading(page: string, headingStart: string): PageBlock | undefined {
  return getPageBlocks(page).find((b) => b.heading.startsWith(headingStart));
}

/**
 * A block's list in the order the live page shows it. The sync files short and
 * long lines separately and then appends the list as marked up, so an item can
 * appear twice; the last occurrence of each is the one in page order.
 */
export function listInOrder(block: PageBlock | undefined): string[] {
  if (!block) return [];
  const all = cleanCopy([...block.paragraphs, ...block.listItems]);
  return all.filter((item, i) => all.lastIndexOf(item) === i);
}

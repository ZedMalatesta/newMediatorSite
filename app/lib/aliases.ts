/**
 * URLs that exist on the live site but are not pages in their own right.
 *
 * new_technologies and jajdajizni are second slugs for pages that also live
 * under another address; summerschool2026 is an empty shell. Links and search
 * results pointing at them still need to land somewhere, and a static host has
 * no server-side redirects, so each gets a forwarding page.
 */
export const aliases: Record<string, string> = {
  new_technologies: "/newtechnologies",
  jajdajizni: "/zhazhdazhizni",
  summerschool2026: "/summerintensive2026",
};

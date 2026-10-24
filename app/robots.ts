import type { MetadataRoute } from "next";
import { absoluteUrl, isLiveSite } from "@lib/site";

export const dynamic = "force-static";

/**
 * Crawling stays allowed on staging too: the copy is kept out of the index by
 * the `noindex` every page carries there (see the root layout), and a crawler
 * blocked here would never read it. Staging lists no sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isLiveSite && { sitemap: absoluteUrl("/sitemap.xml") }),
  };
}

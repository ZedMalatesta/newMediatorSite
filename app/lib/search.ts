import { searchIndex, type SearchDoc } from "./searchIndex";

export type SearchHit = SearchDoc & { score: number };

/** Case- and diacritic-insensitive fold; ё/е are treated alike for Russian. */
const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

/**
 * Ranked substring search over the generated index.
 *
 * Deliberately simple: the corpus is 72 documents, so a scored scan is instant
 * and avoids shipping a search library. Title matches outrank body matches, and
 * every query term must appear somewhere in the document.
 */
export function search(query: string, limit = 20): SearchHit[] {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const doc of searchIndex) {
    const title = fold(doc.title);
    const description = fold(doc.description);
    const text = fold(doc.text);

    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      const inTitle = title.includes(term);
      const inDescription = description.includes(term);
      const inText = text.includes(term);

      if (!inTitle && !inDescription && !inText) {
        matchedAll = false;
        break;
      }
      if (inTitle) score += title.startsWith(term) ? 12 : 8;
      if (inDescription) score += 3;
      if (inText) score += 1;
    }

    if (matchedAll) hits.push({ ...doc, score });
  }

  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

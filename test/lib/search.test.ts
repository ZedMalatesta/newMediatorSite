import { describe, expect, it } from "vitest";
import { search } from "@lib/search";
import { searchIndex } from "@lib/searchIndex";

describe("search", () => {
  it("returns nothing for an empty query", () => {
    expect(search("   ")).toEqual([]);
  });

  it("finds a page by its title, ranking title matches first", () => {
    const hits = search("медиация");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].title.toLowerCase()).toContain("медиаци");
    for (let i = 1; i < hits.length; i++) expect(hits[i - 1].score).toBeGreaterThanOrEqual(hits[i].score);
  });

  it("requires every term, and treats ё as е and case as irrelevant", () => {
    const doc = searchIndex.find((d) => /ё/i.test(d.text)) ?? searchIndex[0];
    const word = (doc.text.match(/[А-Яа-яЁё]*ё[А-Яа-яЁё]*/i)?.[0] ?? doc.title.split(" ")[0]).toUpperCase().replace(/Ё/g, "Е");
    expect(search(word).some((h) => h.slug === doc.slug)).toBe(true);
    expect(search(`${word} zzzqqq`)).toEqual([]);
  });

  it("scores the title, the description and the body", () => {
    const doc = searchIndex.find((d) => d.description) ?? searchIndex[0];
    const term = doc.title.split(/\s+/)[0];
    const hit = search(term).find((h) => h.slug === doc.slug);
    expect(hit?.score).toBeGreaterThanOrEqual(8);
  });

  it("caps the number of results", () => {
    expect(search("а", 3)).toHaveLength(3);
  });
});

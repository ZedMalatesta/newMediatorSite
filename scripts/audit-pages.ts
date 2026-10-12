/**
 * Checks every page against the live page it was built from.
 *
 *   npm run audit:pages                 audit the static export in out/
 *   npm run audit:pages -- <url>        audit a running site, e.g. http://localhost:3000
 *   npm run audit:pages -- <src> <page> report one page in full
 *
 * For each block of the live page (app/lib/pageBlocks.ts) it looks for the
 * block's own sentences in the page's <main> and reports the two ways a page
 * goes wrong:
 *
 *   MISSING     a live section the page does not show at all
 *   DUPLICATED  a live section the page shows twice - once in a hand-built
 *               component and again through the imported blocks
 *   NO PICTURE  a section is there but a picture the live page gives it is not
 *   CROPPED     an illustration is drawn cut to a box instead of whole
 *
 * Exits non-zero when any is found, so it can gate a deploy.
 */
import fs from "node:fs";
import path from "node:path";
import { pageBlocks, type PageBlock } from "../app/lib/pageBlocks";
import { fixTypos, isTildaArtefact } from "../app/lib/copyFilters";
import { isIcon } from "../app/lib/blockQuery";

const [source = "out", onlyPage] = process.argv.slice(2);
const remote = /^https?:/.test(source);

/** Pages whose route is not the manifest key. */
const ROUTE: Record<string, string> = { home: "" };

/**
 * Live blocks a page leaves out on purpose, keyed by how the block's label
 * starts. A key that is part of a picture's path waives that picture alone,
 * and "@pictures" every picture check on the page. Each entry says why - an
 * empty reason is not accepted, so this cannot become a way to silence the
 * audit.
 */
const WAIVED: Record<string, Record<string, string>> = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts", "audit-waivers.json"), "utf8"),
);

/** Letters and digits only - plus the mark that separates one element's text from the next. */
const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9|]+/gi, "");

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

async function mainHtml(page: string): Promise<string | null> {
  const route = ROUTE[page] ?? page;
  let html: string;
  if (remote) {
    const res = await fetch(`${source.replace(/\/$/, "")}/${route}`);
    if (!res.ok) return null;
    html = await res.text();
  } else {
    const file = [path.join(source, `${route || "index"}.html`), path.join(source, route, "index.html")].find((f) => fs.existsSync(f));
    if (!file) return null;
    html = fs.readFileSync(file, "utf8");
  }
  return /<main\b[\s\S]*?<\/main>/.exec(html)?.[0] ?? html;
}

function textOf(main: string): string {
  const text = main
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    // Inline tags sit inside a sentence; any other tag ends one, so two
    // neighbouring elements can never read as one sentence.
    .replace(/<\/?(?:a|span|strong|b|em|i|u|mark|sup|sub)\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "|");
  return norm(decode(text));
}

/** The sentences that identify a block: long enough not to match by accident. */
function sentences(b: PageBlock): string[] {
  const lines = [
    b.heading,
    ...b.body.map((n) => n.text),
    ...b.cards.flatMap((c) => [c.title, ...c.body.map((n) => n.text)]),
    ...b.accordion.flatMap((a) => [a.title, ...a.body]),
  ];
  const keys = lines.filter((l) => l && !isTildaArtefact(l)).map((l) => norm(fixTypos(l)).replace(/\|/g, "").slice(0, 48));
  return keys.filter((k) => k.length >= 24);
}

const count = (hay: string, needle: string) => hay.split(needle).length - 1;
const label = (b: PageBlock, i: number) =>
  `[${i}] «${(b.heading || b.body[0]?.text || b.cards[0]?.title || b.cards[0]?.body[0]?.text || b.role).slice(0, 60)}»`;

async function run() {
  const pages = Object.keys(pageBlocks).filter((p) => !onlyPage || p === onlyPage).sort();
  let missing = 0;
  let duplicated = 0;
  let pictures = 0;
  let checked = 0;

  for (const page of pages) {
    const main = await mainHtml(page);
    if (main === null) continue; // the live page has no route here (system and alias pages)
    const text = textOf(main);
    const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    checked++;
    const out: string[] = [];
    // A sentence the live page itself says twice - the same note under two
    // price lists - is expected twice here as well.
    const live = new Map<string, number>();
    const variants = new Set<string>();
    for (const b of pageBlocks[page]) {
      const keys = sentences(b);
      if (variants.has(keys.join("/"))) continue;
      variants.add(keys.join("/"));
      for (const k of keys) live.set(k, (live.get(k) ?? 0) + 1);
    }

    const seen = new Set<string>();
    pageBlocks[page].forEach((b, i) => {
      const keys = [...new Set(sentences(b))];
      if (keys.length === 0) return;
      // Tilda's desktop and phone variants of one block are one section.
      const same = keys.join("/");
      if (seen.has(same)) return;
      seen.add(same);
      const counts = keys.map((k) => count(text, k));
      const absent = counts.filter((c) => c === 0).length;
      const twice = counts.filter((c, n) => c > live.get(keys[n])!).length;
      // What a popup holds is not on the live page either until it is opened.
      if (b.popupCards) return;
      const waiver = Object.entries(WAIVED[page] ?? {}).find(([k]) => label(b, i).includes(k));
      // The opening block is the title and tagline; the hero rewords it, and
      // the title may well come up again further down.
      const lead = i === 0 && keys.length <= 4;

      if (lead) return;
      if (absent / keys.length > 0.5 && !waiver?.[1]) {
        missing++;
        out.push(`  MISSING     ${label(b, i)}  (${absent}/${keys.length} lines absent)`);
      } else if (twice / keys.length > 0.5 && !waiver?.[1]) {
        duplicated++;
        out.push(`  DUPLICATED  ${label(b, i)}  (${twice}/${keys.length} lines shown more often than on the live page)`);
      } else if (!waiver?.[1]) {
        // The section is on the page: are its pictures, and are they whole?
        const onCards = b.cards.flatMap((c) => (c.image && !isIcon(c.image) ? [c.image.src] : []));
        const loose = b.images.filter((im) => !isIcon(im) && !onCards.includes(im.src)).map((im) => im.src);
        // Several loose photographs are a gallery: tiles are trimmed to match
        // and open whole on click. Portraits of people are trimmed to a square.
        const gallery = loose.length > 1 || b.cards.some((c) => !c.title && !c.body.length && c.image);
        const waivedPicture = (src: string) =>
          Object.entries(WAIVED[page] ?? {}).some(([k, why]) => why && (k === "@pictures" || src.includes(k)));
        for (const src of new Set([...onCards, ...loose])) {
          if (waivedPicture(src)) continue;
          const tags = imgs.filter((t) => t.includes(src));
          if (tags.length === 0) {
            pictures++;
            out.push(`  NO PICTURE  ${label(b, i)}  ${src}`);
          } else if (!gallery && b.role !== "person" && tags.every((t) => /\bobject-cover\b/.test(t))) {
            pictures++;
            out.push(`  CROPPED     ${label(b, i)}  ${src}`);
          }
        }
      }
      if (onlyPage && out.every((l) => !l.includes(label(b, i)))) {
        out.push(`  ok          ${label(b, i)}  (${keys.length - absent}/${keys.length}${waiver ? ", waived: " + waiver[1] : ""})`);
      }
    });
    if (out.length) console.log(`${page}\n${out.join("\n")}`);
  }

  console.log(
    `\n${checked} pages checked · ${missing} sections missing · ${duplicated} sections duplicated · ${pictures} pictures missing or cropped`,
  );
  if (checked === 0) {
    console.error(`nothing to check in ${source} - build first, or pass the site's URL`);
    process.exit(2);
  }
  process.exit(missing + duplicated + pictures > 0 ? 1 : 0);
}

run();

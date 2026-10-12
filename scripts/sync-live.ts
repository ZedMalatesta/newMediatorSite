/**
 * Syncs the content manifests with the live site (mediatorok.by).
 *
 *   npm run sync:live              fetch every page in the sitemap, then regenerate
 *   npm run sync:live -- --offline regenerate from .cache/live without fetching
 *
 * The live site is a Tilda build: every page is a sequence of numbered records
 * (`data-record-type`), which makes its structure machine-readable. This walks
 * those records and emits, per page and in original order, what each block
 * says, shows and does - text, images, slider/zoom behaviour, video embeds,
 * accordions - plus the forms the page offers.
 *
 * Outputs (generated, do not hand-edit):
 *   app/lib/pageBlocks.ts   content blocks per page
 *   app/lib/pageForms.ts    popup / inline forms per page, footer form, newsletter
 *
 * Images are resolved through scripts/live-assets.json, which maps each live
 * image URL to the file already committed under public/. An unknown URL is a
 * new image: it is downloaded to public/images/live/ and added to the map, so
 * re-running never renames or duplicates what is already there.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ORIGIN = "https://mediatorok.by";
const ROOT = process.cwd();
const CACHE = path.join(ROOT, ".cache", "live");
const PUBLIC = path.join(ROOT, "public");
const ASSETS_JSON = path.join(ROOT, "scripts", "live-assets.json");
const OFFLINE = process.argv.includes("--offline");

/** Tilda blocks plain requests; it wants to see a browser. */
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8",
  Referer: `${ORIGIN}/`,
};

/** Tilda system pages, and alias slugs that duplicate a page under another URL. */
const SKIP = (slug: string) => slug === "error" || /^page\d+\.html$/.test(slug);
const ALIASES: Record<string, string> = {
  new_technologies: "newtechnologies",
  jajdajizni: "zhazhdazhizni",
};

/** Tilda record type -> the role the block plays on the page. */
const ROLE: Record<string, string> = {};
const roles: Record<string, string[]> = {
  cover: ["800", "184", "190", "185", "853"],
  "feature-image": ["612", "921", "1066", "486", "478", "477", "544"],
  "band-image": ["814", "503"],
  "card-grid": ["858", "1065", "959", "677", "499", "1068"],
  "icon-row": ["498", "577", "506"],
  person: ["778", "770", "524", "497"],
  gallery: ["480", "472", "476", "474", "603", "531", "508"],
};
for (const [role, types] of Object.entries(roles)) for (const t of types) ROLE[t] = role;
const FALLBACK_ROLE = "card-grid";
const ACCORDION_TYPES = new Set(["585", "668"]);
const MAP_TYPES = new Set(["555"]);

const IMG_RE =
  /https:\/\/static\.tildacdn\.[a-z]+\/[A-Za-z0-9._/-]+\.(?:jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP|svg|gif|GIF)/g;

// ---------------------------------------------------------------------------
// text helpers
// ---------------------------------------------------------------------------

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/ /g, " ");
}

/**
 * Inline tags are removed outright rather than replaced with a space: Tilda
 * wraps fragments of a word in spans, and spacing them out produced visible
 * typos ("принц ипам", "сп оры") in the previous extraction.
 */
const INLINE = /<\/?(?:span|strong|b|em|i|u|a|font|sup|sub|s|mark)\b[^>]*>/gi;

function lines(html: string, breakOnBlocks = false): string[] {
  let s = html.replace(/<br\s*\/?>/gi, "\n");
  if (breakOnBlocks) s = s.replace(/<\/(?:li|p|div|h\d)>/gi, "\n");
  s = decode(s.replace(INLINE, "").replace(/<[^>]+>/g, " "));
  return s
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const text = (html: string) => lines(html).join(" ");

function grab(frag: string, cls: string): string[] {
  const out: string[] = [];
  const run = (close: string) => {
    const re = new RegExp(`class="[^"]*${cls}[^"]*"[^>]*>([\\s\\S]*?)</${close}>`, "g");
    for (const m of frag.matchAll(re)) out.push(...lines(m[1]));
  };
  run("div");
  if (out.length === 0) run("(?:h\\d|p|span)");
  return out;
}

function dedupe(list: string[]): string[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    const k = s.toLowerCase();
    if (s.length <= 1 || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const TITLE = "(?:t\\d+__title|t\\d+__heading|t-title|t-heading|t\\d+__bt-title)";
const DESCR = "(?:t\\d+__descr|t\\d+__text|t-descr|t-text|t\\d+__bt-descr|t\\d+__uptitle)";

// ---------------------------------------------------------------------------
// fetching
// ---------------------------------------------------------------------------

async function get(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function pool<T>(items: T[], size: number, fn: (item: T) => Promise<void>) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: size }, async () => {
      for (let item = queue.shift(); item !== undefined; item = queue.shift()) await fn(item);
    }),
  );
}

const slugOf = (url: string) =>
  url.replace(ORIGIN, "").replace(/^\//, "").replace(/\/$/, "") || "home";

async function loadPages(): Promise<Record<string, string>> {
  fs.mkdirSync(CACHE, { recursive: true });
  if (!OFFLINE) {
    const sitemap = (await get(`${ORIGIN}/sitemap.xml`)).toString("utf8");
    const urls = [...sitemap.matchAll(/<loc>([^<]+)/g)].map((m) => m[1]);
    for (const f of fs.readdirSync(CACHE)) fs.rmSync(path.join(CACHE, f));
    await pool(urls, 8, async (url) => {
      const slug = slugOf(url);
      fs.writeFileSync(path.join(CACHE, `${slug}.html`), await get(url));
    });
    console.log(`fetched ${urls.length} pages`);
  }
  const pages: Record<string, string> = {};
  for (const f of fs.readdirSync(CACHE).sort()) {
    if (f.endsWith(".html")) pages[f.slice(0, -5)] = fs.readFileSync(path.join(CACHE, f), "utf8");
  }
  if (Object.keys(pages).length === 0) throw new Error("no cached pages - run without --offline");
  return pages;
}

// ---------------------------------------------------------------------------
// images
// ---------------------------------------------------------------------------

function dimensions(file: string): { width: number; height: number } {
  const b = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (ext === ".gif") return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  if (ext === ".webp") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const n = b.readUInt32LE(21);
      return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 };
    }
  }
  if (ext === ".jpg" || ext === ".jpeg") {
    for (let i = 2; i < b.length - 9; ) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return { width: 0, height: 0 }; // svg, or unreadable
}

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};
const slugify = (s: string) =>
  [...s.toLowerCase()].map((c) => TRANSLIT[c] ?? c).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";

class Assets {
  private map: Record<string, string> = JSON.parse(fs.readFileSync(ASSETS_JSON, "utf8"));
  private dims = new Map<string, { width: number; height: number }>();
  added: string[] = [];

  /** Local path for a live image URL, downloading it first if it is new. */
  async resolve(url: string): Promise<string | null> {
    if (path.basename(url) === "tildacopy.png") return null; // Tilda's own badge
    if (this.map[url]) return this.map[url];
    if (OFFLINE) return null;

    const id = url.split("/").at(-2)!.replace(/^tild/, "").replace(/-/g, "").slice(0, 10);
    let ext = path.extname(url).toLowerCase();
    if (ext === ".jpeg") ext = ".jpg";
    const rel = `/images/live/${id}-${slugify(path.basename(url, path.extname(url)))}${ext}`;
    const file = path.join(PUBLIC, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, await get(url));
    // Nothing on the site renders wider than this; keep new photos in line with
    // the ones already committed. sips is macOS-only, so this is best-effort.
    if (ext !== ".svg" && ext !== ".gif" && dimensions(file).width > 1800) {
      try { execFileSync("sips", ["--resampleWidth", "1800", file], { stdio: "ignore" }); } catch {}
    }
    this.map[url] = rel;
    this.added.push(rel);
    return rel;
  }

  size(rel: string) {
    if (!this.dims.has(rel)) this.dims.set(rel, dimensions(path.join(PUBLIC, rel)));
    return this.dims.get(rel)!;
  }

  save() {
    const sorted = Object.fromEntries(Object.entries(this.map).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(ASSETS_JSON, JSON.stringify(sorted, null, 1) + "\n");
  }
}

// ---------------------------------------------------------------------------
// records
// ---------------------------------------------------------------------------

type Rec = { id: string; type: string; raw: string; frag: string };

function records(html: string): Rec[] {
  const marks = [...html.matchAll(/<div id="(rec\d+)"[^>]*data-record-type="(\d+)"/g)];
  return marks.map((m, i) => {
    const raw = html.slice(m.index!, i + 1 < marks.length ? marks[i + 1].index! : html.length);
    return { id: m[1], type: m[2], raw, frag: raw.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, " ") };
  });
}

type Video = { provider: "youtube" | "vk"; id: string };

function videos(frag: string): Video[] {
  const out: Video[] = [];
  for (const tag of frag.matchAll(/<[^>]*data-videolazy-id="([^"]+)"[^>]*>/g)) {
    const type = /data-videolazy-type="([^"]+)"/.exec(tag[0])?.[1] ?? "youtube";
    if (type === "youtube") out.push({ provider: "youtube", id: tag[1] });
    else if (type === "vkvideo") {
      const m = /video(-?\d+)_(\d+)/.exec(tag[1]);
      if (m) out.push({ provider: "vk", id: `${m[1]}_${m[2]}` });
    }
  }
  return out;
}

type AccordionItem = { title: string; body: string[] };

function accordion(frag: string, type: string): AccordionItem[] {
  const titles = [...frag.matchAll(new RegExp(`<span[^>]*class="[^"]*t${type}__title[^"]*"[^>]*>([\\s\\S]*?)</span>\\s*<span class="t${type}__icon`, "g"))];
  return titles
    .map((m, i) => {
      const slice = frag.slice(m.index! + m[0].length, i + 1 < titles.length ? titles[i + 1].index! : frag.length);
      const start = slice.search(new RegExp(`class="[^"]*t${type}__text`));
      const body = start < 0 ? [] : lines(slice.slice(slice.indexOf(">", start) + 1), true);
      return { title: text(m[1]), body };
    })
    .filter((item) => item.title);
}

type FormField = {
  key: string;
  kind: "name" | "email" | "phone" | "text" | "textarea" | "choice";
  label: string;
  required: boolean;
  options?: string[];
};
type LiveForm = { hook: string; trigger: string; title: string; text: string; submit: string; fields: FormField[] };

const KIND: Record<string, FormField["kind"]> = { nm: "name", em: "email", ph: "phone", ta: "textarea", rd: "choice", sb: "choice", in: "text" };
const DEFAULT_LABEL: Record<string, string> = { name: "Ваше имя", email: "Email", phone: "Телефон", textarea: "Комментарий" };
/** Mask and field-name placeholders Tilda inserts; not labels anyone wrote. */
const JUNK_LABEL = /^(?:\+1\(000\)000-0000|Phone|Email|Name)$/i;

function form(rec: Rec, page: string): LiveForm | null {
  const body = /<form\b[\s\S]*?<\/form>/.exec(rec.frag)?.[0];
  if (!body) return null;

  const fields: FormField[] = [];
  const groups = body.split(/(?=<div[^>]*class="[^"]*t-input-group)/).slice(1);
  for (const g of groups) {
    const type = /data-field-type="([^"]+)"/.exec(g)?.[1] ?? "";
    const kind = KIND[type];
    const name = /<(?:input|textarea|select)[^>]*name="([^"]+)"/.exec(g)?.[1];
    if (!kind || !name) continue; // checkboxes (consent) are rendered by the form itself
    const title = text(/class="[^"]*t-input-title[^"]*"[^>]*>([\s\S]*?)<\/(?:div|label)>/.exec(g)?.[1] ?? "");
    const placeholder = decode(/placeholder="([^"]*)"/.exec(g)?.[1] ?? "");
    const label = [title, placeholder].find((l) => l && !JUNK_LABEL.test(l)) ?? DEFAULT_LABEL[kind] ?? decode(name);
    const options = dedupe(
      [...g.matchAll(/<input[^>]*type="radio"[^>]*value="([^"]*)"/g), ...g.matchAll(/<option[^>]*value="([^"]+)"/g)].map((m) => decode(m[1])),
    );
    const key =
      kind === "email" ? "email" : kind === "phone" ? "phone" : kind === "textarea" ? "comment"
      : name === "Name" ? "name" : decode(name).replace(/\*+$/, "").trim();
    fields.push({ key, kind, label: label.replace(/\*+$/, "").trim(), required: /data-tilda-req="1"/.test(g), ...(options.length ? { options } : {}) });
  }
  if (fields.length === 0) return null;

  const hook = /data-tooltip-hook="([^"]+)"/.exec(rec.frag)?.[1] ?? "";
  const first = (cls: string) => text(new RegExp(`class="[^"]*${cls}[^"]*"[^>]*>([\\s\\S]*?)</div>`).exec(rec.frag)?.[1] ?? "");
  return {
    hook,
    trigger: "",
    title: first("t\\d+__title") || "Оставьте заявку",
    text: first("t\\d+__descr"),
    submit: text(/<button[^>]*class="[^"]*t-submit[^"]*"[^>]*>([\s\S]*?)<\/button>/.exec(rec.frag)?.[1] ?? "") || "Отправить",
    fields,
  };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

type Image = { src: string; width: number; height: number; alt: string };
type Block = {
  role: string; heading: string; subheadings: string[]; paragraphs: string[]; listItems: string[];
  slider: boolean; cycle: boolean; arrows: boolean; dots: boolean; zoomable: boolean;
  images: Image[]; videos: Video[]; accordion: AccordionItem[]; map: boolean;
};

async function main() {
  const pages = await loadPages();
  const assets = new Assets();

  const parsed: Record<string, Rec[]> = {};
  const seenOn = new Map<string, number>();
  for (const [slug, html] of Object.entries(pages)) {
    parsed[slug] = records(html);
    for (const r of parsed[slug]) seenOn.set(r.id, (seenOn.get(r.id) ?? 0) + 1);
  }
  // A record present on most pages is site chrome (menu, footer), not content.
  const chrome = new Set([...seenOn].filter(([, n]) => n >= Object.keys(pages).length * 0.6).map(([id]) => id));

  const blocks: Record<string, Block[]> = {};
  const covers: Record<string, string> = {};
  const forms: Record<string, LiveForm[]> = {};
  const newsletter: string[] = [];
  let footerForm: LiveForm | null = null;

  for (const slug of Object.keys(parsed).sort()) {
    if (SKIP(slug) || ALIASES[slug]) continue;
    const out: Block[] = [];
    const used = new Set<string>();
    const pageForms: LiveForm[] = [];

    for (const rec of parsed[slug]) {
      const hasForm = /<form\b/.test(rec.frag);
      if (hasForm) {
        if (/sform\[email\]/.test(rec.frag)) { newsletter.push(slug); continue; }
        const f = form(rec, slug);
        if (chrome.has(rec.id)) { footerForm ??= f; continue; }
        if (f && !pageForms.some((p) => p.hook === f.hook && p.hook)) pageForms.push(f);
        continue; // a form is offered through pageForms, not rendered as copy
      }
      if (chrome.has(rec.id)) continue;

      const isAccordion = ACCORDION_TYPES.has(rec.type);
      const titles = dedupe(grab(rec.frag, TITLE));
      const descrs = dedupe(grab(rec.frag, DESCR));
      const items = dedupe([...rec.frag.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => lines(m[1]).join(" ")));
      const acc = isAccordion ? accordion(rec.frag, rec.type) : [];

      const alts = new Map<string, string>();
      for (const tag of rec.raw.matchAll(/<img\b[^>]*>/g)) {
        const url = /data-original="([^"]+)"/.exec(tag[0])?.[1] ?? /src="([^"]+)"/.exec(tag[0])?.[1];
        const alt = decode(/alt="([^"]*)"/.exec(tag[0])?.[1] ?? "").trim();
        if (url && alt) alts.set(url, alt);
      }
      const images: Image[] = [];
      for (const url of new Set(rec.raw.match(IMG_RE) ?? [])) {
        const src = await assets.resolve(url);
        if (!src || used.has(src)) continue;
        used.add(src);
        images.push({ src, ...assets.size(src), alt: alts.get(url) ?? "" });
      }

      const block: Block = {
        role: ROLE[rec.type] ?? FALLBACK_ROLE,
        heading: isAccordion
          ? text(/class="[^"]*t-section__title[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(rec.frag)?.[1] ?? "")
          : (titles[0] ?? "").slice(0, 160),
        subheadings: isAccordion ? [] : titles.slice(1, 8),
        paragraphs: isAccordion ? [] : descrs.filter((d) => d.length > 40).slice(0, 80),
        listItems: isAccordion ? [] : [...descrs.filter((d) => d.length <= 40).slice(0, 40), ...items.slice(0, 60)],
        slider: rec.raw.includes("t-slds__wrapper") && images.length > 1,
        cycle: !rec.raw.includes("t-slds__nocycle"),
        arrows: rec.raw.includes("t-slds__arrow"),
        dots: rec.raw.includes("t-slds__bullet"),
        zoomable: rec.raw.includes("data-zoomable"),
        images,
        videos: videos(rec.raw),
        accordion: acc,
        map: MAP_TYPES.has(rec.type),
      };
      const hasContent =
        block.heading || block.paragraphs.length || block.listItems.length || images.length ||
        block.videos.length || acc.length || block.map;
      if (hasContent) out.push(block);
    }

    // The page's lead image is rendered by its hero, so it leaves the body.
    let cover: string | undefined;
    for (const role of ["cover", "band-image", "feature-image"]) {
      cover = out.find((b) => b.role === role && b.images[0]?.width >= 600)?.images[0].src;
      if (cover) break;
    }
    if (cover) {
      covers[slug] = cover;
      for (const b of out) b.images = b.images.filter((i) => i.src !== cover);
    }
    blocks[slug] = out.filter(
      (b) => b.heading || b.paragraphs.length || b.listItems.length || b.images.length || b.videos.length || b.accordion.length || b.map,
    );

    // Label each popup with the text of the button that opens it.
    for (const f of pageForms) {
      if (!f.hook) continue;
      const hook = f.hook.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const a = new RegExp(`<a[^>]*href="${hook}"[^>]*>([\\s\\S]*?)</a>`).exec(pages[slug]);
      f.trigger = a ? text(a[1].replace(/<(script|style|svg)[^>]*>[\s\S]*?<\/\1>/g, "")) : "";
    }
    if (pageForms.length) forms[slug] = pageForms;
  }

  assets.save();
  writeBlocks(blocks, covers);
  writeForms(forms, footerForm, [...new Set(newsletter)].filter((s) => !SKIP(s) && !ALIASES[s]).sort());

  const count = (pick: (b: Block) => number) => Object.values(blocks).flat().reduce((n, b) => n + pick(b), 0);
  console.log(
    `pages ${Object.keys(blocks).length} · blocks ${count(() => 1)} · images ${count((b) => b.images.length)} · ` +
      `videos ${count((b) => b.videos.length)} · accordion items ${count((b) => b.accordion.length)} · ` +
      `forms ${Object.values(forms).flat().length} · new assets ${assets.added.length}`,
  );
  for (const a of assets.added) console.log(`  + ${a}`);
}

const j = (v: unknown) => JSON.stringify(v);

function writeBlocks(blocks: Record<string, Block[]>, covers: Record<string, string>) {
  const L: string[] = [
    "// AUTO-GENERATED by scripts/sync-live.ts from the live mediatorok.by pages.",
    "// Blocks appear in the same order, with the same role, as on the live site.",
    "// Do not edit by hand - run `npm run sync:live`.",
    "",
    "export type BlockRole =",
    ...["cover", "feature-image", "band-image", "card-grid", "icon-row", "person", "gallery"].map(
      (r, i, a) => `  | "${r}"${i === a.length - 1 ? ";" : ""}`,
    ),
    "",
    "export type BlockImage = {",
    "  src: string;",
    "  width: number;",
    "  height: number;",
    "  alt: string;",
    "};",
    "",
    "export type BlockVideo = {",
    '  provider: "youtube" | "vk";',
    "  /** YouTube video id, or `<owner>_<video>` for VK. */",
    "  id: string;",
    "};",
    "",
    "export type AccordionItem = {",
    "  title: string;",
    "  body: string[];",
    "};",
    "",
    "export type PageBlock = {",
    "  role: BlockRole;",
    "  /** Heading the live page shows above this block, if any. */",
    "  heading: string;",
    "  subheadings: string[];",
    "  paragraphs: string[];",
    "  /** Bullet/list copy the block lists. */",
    "  listItems: string[];",
    "  /** The live block is a slider/carousel rather than a static grid. */",
    "  slider: boolean;",
    "  /** Slider wraps around from the last slide back to the first. */",
    "  cycle: boolean;",
    "  arrows: boolean;",
    "  dots: boolean;",
    "  /** Clicking an image opens a full-size zoom overlay. */",
    "  zoomable: boolean;",
    "  images: BlockImage[];",
    "  /** Videos the live block embeds. */",
    "  videos: BlockVideo[];",
    "  /** Collapsible question/answer items, when the live block is an accordion. */",
    "  accordion: AccordionItem[];",
    "  /** The live block is a map of the office location. */",
    "  map: boolean;",
    "};",
    "",
    "export const pageBlocks: Record<string, PageBlock[]> = {",
  ];
  for (const [page, list] of Object.entries(blocks)) {
    L.push(`  ${j(page)}: [`);
    for (const b of list) {
      L.push("    {");
      L.push(`      role: ${j(b.role)},`);
      L.push(`      heading: ${j(b.heading)},`);
      for (const k of ["subheadings", "paragraphs", "listItems"] as const) L.push(`      ${k}: ${j(b[k])},`);
      for (const k of ["slider", "cycle", "arrows", "dots", "zoomable"] as const) L.push(`      ${k}: ${b[k]},`);
      L.push("      images: [");
      for (const i of b.images) L.push(`        { src: ${j(i.src)}, width: ${i.width}, height: ${i.height}, alt: ${j(i.alt)} },`);
      L.push("      ],");
      L.push(`      videos: ${j(b.videos)},`);
      L.push(`      accordion: ${j(b.accordion)},`);
      L.push(`      map: ${b.map},`);
      L.push("    },");
    }
    L.push("  ],");
  }
  L.push("};", "", "/** Lead image the live page uses at the top, if it has one. */", "export const pageCover: Record<string, string> = {");
  for (const [p, c] of Object.entries(covers).sort()) L.push(`  ${j(p)}: ${j(c)},`);
  L.push("};", "", "export function getPageBlocks(page: string): PageBlock[] {", "  return pageBlocks[page] ?? [];", "}", "");
  fs.writeFileSync(path.join(ROOT, "app", "lib", "pageBlocks.ts"), L.join("\n"));
}

function writeForms(forms: Record<string, LiveForm[]>, footer: LiveForm | null, newsletter: string[]) {
  const L: string[] = [
    "// AUTO-GENERATED by scripts/sync-live.ts from the live mediatorok.by pages.",
    "// The forms each live page offers: which fields they ask for, and how they open.",
    "// Do not edit by hand - run `npm run sync:live`.",
    "",
    "export type LiveFormField = {",
    "  /** Key the value is submitted under. */",
    "  key: string;",
    '  kind: "name" | "email" | "phone" | "text" | "textarea" | "choice";',
    "  label: string;",
    "  required: boolean;",
    "  options?: string[];",
    "};",
    "",
    "export type LiveForm = {",
    "  /** Tilda popup hook - set when the live site opens this form in a popup. */",
    "  hook: string;",
    "  /** Label of the button that opens the popup on the live page. */",
    "  trigger: string;",
    "  title: string;",
    "  text: string;",
    "  submit: string;",
    "  fields: LiveFormField[];",
    "};",
    "",
    "export const pageForms: Record<string, LiveForm[]> = {",
  ];
  for (const [page, list] of Object.entries(forms)) {
    L.push(`  ${j(page)}: [`);
    for (const f of list) L.push(`    ${j(f)},`);
    L.push("  ],");
  }
  L.push("};", "");
  L.push("/** The lead form the live site shows at the foot of every page. */");
  L.push(`export const footerForm: LiveForm | null = ${j(footer)};`, "");
  L.push("/** Pages on which the live site offers the newsletter subscription. */");
  L.push(`export const newsletterPages: string[] = ${j(newsletter)};`, "");
  L.push("/** The form a page opens in a popup, if the live page has one. */");
  L.push("export function popupFor(page: string): LiveForm | undefined {");
  L.push("  return pageForms[page]?.find((f) => f.hook);", "}", "");
  fs.writeFileSync(path.join(ROOT, "app", "lib", "pageForms.ts"), L.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

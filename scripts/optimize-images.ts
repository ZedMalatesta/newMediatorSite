/**
 * Writes the resized WebP variants of every picture in public/images to
 * public/optimized/ (see app/lib/imageVariants.ts). Runs before every build.
 *
 *   npm run images
 *
 * A picture is re-encoded only when its content or the encoder settings
 * change: a manifest of content hashes in .cache/ records what each variant
 * was made from, so a run on a cached tree takes seconds. Variants whose
 * original has gone are removed.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { VARIANT_DIR, WIDTHS, hasVariants, variantPath } from "../app/lib/imageVariants";

const PUBLIC = path.join(process.cwd(), "public");
const OUT = path.join(PUBLIC, VARIANT_DIR);
const MANIFEST = path.join(process.cwd(), ".cache", "optimized-images.json");
const QUALITY = 75;
/** Changing the widths or the encoder invalidates every variant. */
const SETTINGS = JSON.stringify({ WIDTHS, QUALITY, encoder: "webp" });

type Manifest = { settings: string; files: Record<string, string> };

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

/** "/images/a.jpg" for public/images/a.jpg. */
const srcOf = (file: string) => "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
const fileOf = (src: string) => path.join(PUBLIC, ...src.split("/"));

function readManifest(): Manifest {
  try {
    const m = JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as Manifest;
    if (m.settings === SETTINGS) return m;
  } catch {
    // No manifest yet: everything is made.
  }
  return { settings: SETTINGS, files: {} };
}

async function makeVariants(src: string, input: Buffer): Promise<void> {
  for (const width of WIDTHS) {
    const out = fileOf(variantPath(src, width));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    // rotate() applies the EXIF orientation before the metadata is dropped.
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
  }
}

async function main() {
  const sources = walk(path.join(PUBLIC, "images")).map(srcOf).filter(hasVariants).sort();
  const manifest = readManifest();
  const next: Manifest = { settings: SETTINGS, files: {} };
  let made = 0;

  const queue = [...sources];
  const worker = async () => {
    for (let src = queue.shift(); src; src = queue.shift()) {
      const input = fs.readFileSync(fileOf(src));
      const hash = crypto.createHash("sha1").update(input).digest("hex");
      const present = WIDTHS.every((w) => fs.existsSync(fileOf(variantPath(src, w))));
      if (manifest.files[src] !== hash || !present) {
        await makeVariants(src, input);
        made++;
      }
      next.files[src] = hash;
    }
  };
  await Promise.all(Array.from({ length: Math.min(4, os.availableParallelism()) }, worker));

  // Remove what no current picture and width accounts for.
  const wanted = new Set(sources.flatMap((src) => WIDTHS.map((w) => fileOf(variantPath(src, w)))));
  let removed = 0;
  for (const file of fs.existsSync(OUT) ? walk(OUT) : []) {
    if (!wanted.has(file)) {
      fs.rmSync(file);
      removed++;
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(next, null, 1));

  const size = (files: string[]) => files.reduce((n, f) => n + fs.statSync(f).size, 0);
  const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)} MB`;
  const original = size(sources.map(fileOf));
  const at1080 = size(sources.map((src) => fileOf(variantPath(src, 1080))));
  console.log(
    `${sources.length} pictures · ${made} encoded · ${sources.length - made} unchanged · ${removed} stale removed`,
  );
  console.log(`originals ${mb(original)} → at 1080 px ${mb(at1080)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

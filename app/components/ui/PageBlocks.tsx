import Image from "next/image";
import {
  getPageBlocks,
  type BlockCard,
  type BlockImage,
  type BlockLink,
  type PageBlock,
  type TextNode,
} from "@lib/pageBlocks";
import { isIcon } from "@lib/blockQuery";
import { fixTypos, isTildaArtefact } from "@lib/copyFilters";
import ImageSlider from "./ImageSlider";
import ZoomableGrid from "./ZoomableGrid";
import VideoEmbed from "./VideoEmbed";
import MapEmbed from "./MapEmbed";
import SmartLink from "./SmartLink";

/**
 * Renders a live page's content as sections, in the live page's order.
 *
 * A section is a heading with everything the live page puts under it: its
 * text, its cards - each with the title, text and picture that belong to it -
 * and its photographs. The rules it keeps, because breaking each of them is
 * what made the imported pages hard to read:
 *
 *  - the block that only repeats the page title is left to the hero;
 *  - a block with no heading of its own continues the section above it rather
 *    than becoming a band of its own;
 *  - a card's words stay with the card - never a list of titles followed by a
 *    list of texts;
 *  - an illustration is shown whole. Only photographs in a gallery are trimmed
 *    to a common tile, and those open full-size on click.
 */

/** A "heading" longer than this is a sentence someone styled large. */
const HEADING_MAX = 110;

function clean(nodes: TextNode[]): TextNode[] {
  return nodes
    .map((n) => ({ ...n, text: fixTypos(n.text.replace(/\s*р\.\s*р\.\s*/g, " ").trim()) }))
    .filter((n) => n.text && !isTildaArtefact(n.text));
}

// ---------------------------------------------------------------------------
// text
// ---------------------------------------------------------------------------

/** A line's words - as a link, where the whole line is one on the live page. */
function Line({ node }: { node: TextNode }) {
  if (!node.href) return <>{node.text}</>;
  return (
    <SmartLink
      href={node.href}
      {...(node.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-accent-700 font-medium hover:underline"
    >
      {node.text}
    </SmartLink>
  );
}

function Prose({ nodes, small = false }: { nodes: TextNode[]; small?: boolean }) {
  if (nodes.length === 0) return null;

  // Consecutive list items form one list.
  const groups: (TextNode | TextNode[])[] = [];
  for (const n of nodes) {
    const last = groups.at(-1);
    if (n.kind === "li" && Array.isArray(last)) last.push(n);
    else groups.push(n.kind === "li" ? [n] : n);
  }
  const size = small ? "text-sm" : "text-base";

  return (
    <div className="space-y-3">
      {groups.map((g, i) =>
        Array.isArray(g) ? (
          <ul key={i} className="space-y-2">
            {g.map((item, k) => (
              <li key={k} className={`flex items-start gap-2.5 text-slate-600 ${size} leading-relaxed`}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2.5" />
                <span>
                  <Line node={item} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            key={i}
            className={
              // A short line ending in a colon introduces what follows it, and
              // so does one set in capitals - the clause titles of a contract.
              (g.text.length < 70 && g.text.endsWith(":")) ||
              (g.text.length < 90 && /[А-ЯЁA-Z]{4}/.test(g.text) && !/[а-яёa-z]/.test(g.text))
                ? `font-semibold text-slate-900 ${size} pt-1`
                : `text-slate-600 ${size} leading-relaxed`
            }
          >
            <Line node={g} />
          </p>
        ),
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// pictures
// ---------------------------------------------------------------------------

/** A picture at its own proportions - never cropped. */
function Figure({ image, alt, className = "" }: { image: BlockImage; alt: string; className?: string }) {
  if (!image.width || !image.height) {
    return (
      <div className={`relative aspect-4/3 ${className}`}>
        <Image src={image.src} alt={image.alt || alt} fill className="object-contain" sizes="(max-width: 768px) 100vw, 560px" />
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt || alt}
      width={image.width}
      height={image.height}
      className={`w-full h-auto rounded-2xl shadow-sm ${className}`}
      sizes="(max-width: 768px) 100vw, 560px"
    />
  );
}

function Icon({ image }: { image: BlockImage }) {
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <Image src={image.src} alt="" fill className="object-contain" sizes="48px" />
    </div>
  );
}

function Photos({ block, images }: { block: PageBlock; images: BlockImage[] }) {
  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      // Never drawn larger than the file is: a small picture stays small.
      <div className="mx-auto" style={{ maxWidth: Math.min(768, images[0].width || 768) }}>
        <Figure image={images[0]} alt={block.heading || "МедиаторОк"} />
      </div>
    );
  }
  if (block.slider) {
    return (
      <div className="max-w-4xl mx-auto">
        <ImageSlider images={images} cycle={block.cycle} arrows={block.arrows} dots={block.dots} zoomable />
      </div>
    );
  }
  // Tiles are trimmed to match each other, so every one opens whole on click.
  return (
    <ZoomableGrid
      images={images}
      aspect={block.role === "person" ? "aspect-3/4" : "aspect-4/3"}
      objectPosition={block.role === "person" ? "object-top" : "object-center"}
      columns={images.length === 2 ? "grid-cols-2" : images.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}
    />
  );
}

// ---------------------------------------------------------------------------
// cards
// ---------------------------------------------------------------------------

type Item = { title: string; body: TextNode[]; image: BlockImage | null; href?: string };

function toItem(card: BlockCard, keepImage: boolean): Item {
  let title = fixTypos(card.title);
  let body = clean(card.body);
  // An untitled item whose first line is short is titled by that line.
  if (!title && body.length > 1 && body[0].text.length <= 60) {
    title = body[0].text;
    body = body.slice(1);
  }
  return { title, body, image: keepImage ? card.image : null, href: card.href };
}

const cols = (n: number, wide = false) =>
  wide || n === 1
    ? "grid-cols-1 md:grid-cols-2" + (n % 3 === 0 ? " xl:grid-cols-3" : "")
    : n === 2 || n === 4
      ? "grid-cols-1 sm:grid-cols-2" + (n === 4 ? " lg:grid-cols-4" : "")
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

/** Items that are a single line each: what the live page lists with ticks or numbers. */
function Checklist({ items }: { items: Item[] }) {
  return (
    <ul className={`grid gap-3 ${items.length > 3 ? "md:grid-cols-2" : ""}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 bg-white rounded-xl border border-slate-200 px-5 py-4 text-slate-700 text-sm leading-relaxed"
        >
          <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-accent-500 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{item.title || item.body[0]?.text}</span>
        </li>
      ))}
    </ul>
  );
}

function PersonCard({ item, titled }: { item: Item; titled: boolean }) {
  return (
    <li className="flex flex-col">
      {item.image && (
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
          <Image
            src={item.image.src}
            alt={item.image.alt || item.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 280px"
          />
        </div>
      )}
      <ItemTitle titled={titled} className="font-semibold text-slate-900 leading-snug mb-1.5">{item.title}</ItemTitle>
      <Prose nodes={item.body} small />
    </li>
  );
}

/**
 * An item's title sits one level under the section's heading - or is itself a
 * section-level heading where the section has none, so headings never skip a
 * level (h1 straight to h3).
 */
function ItemTitle({ titled, className, children }: { titled: boolean; className: string; children: React.ReactNode }) {
  return titled ? <h3 className={className}>{children}</h3> : <h2 className={className}>{children}</h2>;
}

/** A picture's alt text, unless it only repeats the caption printed beside it. */
const ownAlt = (alt: string, caption: string) => (alt && alt !== caption ? alt : "");

function Card({ item, icons, titled }: { item: Item; icons: boolean; titled: boolean }) {
  const photo = !icons && item.image && !isIcon(item.image) && item.image.width > 0 ? item.image : null;
  const icon = item.image && !photo ? item.image : null;
  return (
    <li
      className={`relative bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col ${
        item.href ? "transition-shadow hover:shadow-md hover:border-accent-200" : ""
      }`}
    >
      {photo && (
        // One frame per row so the cards line up; the picture is fitted inside
        // it, never cut to it.
        <div className={`relative bg-slate-50 ${photo.width > photo.height * 1.1 ? "aspect-3/2" : "aspect-square"}`}>
          <Image
            src={photo.src}
            alt={ownAlt(photo.alt, item.title)}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>
      )}
      <div className="p-6 flex-1">
        {icon && (
          <div className="mb-4">
            <Icon image={icon} />
          </div>
        )}
        {item.title && (
          <ItemTitle titled={titled} className="font-semibold text-slate-900 leading-snug mb-2">
            {item.href ? (
              // The link's hit area is stretched over the whole card.
              <SmartLink
                href={item.href}
                {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hover:text-accent-700 transition-colors after:absolute after:inset-0"
              >
                {item.title}
              </SmartLink>
            ) : (
              item.title
            )}
          </ItemTitle>
        )}
        <Prose nodes={item.body} small />
      </div>
    </li>
  );
}

function Cards({ block, items, titled }: { block: PageBlock; items: Item[]; titled: boolean }) {
  if (items.length === 0) return null;

  // A single item is a caption for what surrounds it, not a grid of one.
  if (items.length === 1) {
    const [only] = items;
    const photo = only.image && !isIcon(only.image) ? only.image : null;
    return (
      <div className={`max-w-3xl ${photo ? "sm:flex sm:items-start sm:gap-8" : ""} ${only.href ? "relative" : ""}`}>
        {photo && (
          <div className="sm:w-56 flex-shrink-0 mb-5 sm:mb-0">
            <Figure image={{ ...photo, alt: ownAlt(photo.alt, only.title) }} alt="" />
          </div>
        )}
        <div>
          {only.title && (
            <ItemTitle titled={titled} className="font-semibold text-slate-900 text-lg leading-snug mb-2">
              {only.href ? (
                // As on the live page, the item leads to its page; the link covers the picture too.
                <SmartLink
                  href={only.href}
                  {...(only.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="hover:text-accent-700 transition-colors after:absolute after:inset-0"
                >
                  {only.title}
                </SmartLink>
              ) : (
                only.title
              )}
            </ItemTitle>
          )}
          <Prose nodes={only.body} />
        </div>
      </div>
    );
  }

  const oneLine = items.every((i) => i.body.length + (i.title ? 1 : 0) <= 1);
  const pictured = items.filter((i) => i.image).length;
  // One tick or arrow repeated on every item is a bullet, not an illustration.
  const sameImage = pictured > 1 && new Set(items.map((i) => i.image?.src)).size === 1;

  if (oneLine && (pictured === 0 || sameImage)) return <Checklist items={items} />;

  const people =
    block.role === "person" && pictured === items.length && items.every((i) => i.image && !isIcon(i.image));
  if (people) {
    return (
      <ul className={`grid gap-x-6 gap-y-10 ${items.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
        {items.map((item, i) => (
          <PersonCard key={i} item={item} titled={titled} />
        ))}
      </ul>
    );
  }

  // In a row of icons, a larger file is still an icon - drawn at their size.
  const icons = items.some((i) => i.image && isIcon(i.image));
  const long = items.some((i) => i.body.length > 5 || i.body.reduce((n, x) => n + x.text.length, 0) > 420);
  return (
    <ul className={`grid gap-5 ${cols(items.length, long)}`}>
      {items.map((item, i) => (
        <Card key={i} icons={icons} titled={titled} item={sameImage ? { ...item, image: null } : item} />
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// what a block does beyond text and pictures
// ---------------------------------------------------------------------------

/**
 * Collapsible items, as the live accordion blocks behave. Native <details>
 * gives keyboard operation and the expanded state to assistive technology
 * without any script, and the answers stay in the HTML for search engines.
 */
function Accordion({ block }: { block: PageBlock }) {
  return (
    <div className="max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
      {block.accordion.map((item) => (
        <details key={item.title} className="group">
          <summary className="flex items-start justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="font-semibold text-slate-900 leading-snug group-hover:text-accent-700 transition-colors">
              {item.title}
            </span>
            <span
              aria-hidden="true"
              className="flex-shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pb-5 space-y-2">
            {item.body
              .filter((line) => !isTildaArtefact(line))
              .map((line, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">
                  {fixTypos(line)}
                </p>
              ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/**
 * Sign-up buttons are not repeated: every page here ends in its own form, and
 * a button to the live site's Google Form beside it would offer two ways to do
 * one thing. Buttons that lead somewhere else - a chat, a download, another
 * page - are kept.
 */
const SIGNUP_LINK = /^#|forms\.gle|docs\.google\.com\/forms|tilda\./;

/** A download list (/pravo, /literature) reads as a list, one document per line. */
const DOWNLOAD = /^Скачать/;

function Buttons({ links }: { links: BlockLink[] }) {
  const shown = links.filter((l) => !SIGNUP_LINK.test(l.href));
  if (shown.length === 0) return null;
  const downloads = shown.every((l) => DOWNLOAD.test(l.label));
  return (
    <div className={downloads ? "flex flex-col items-start gap-3" : "flex flex-wrap gap-3"}>
      {shown.map((l) => (
        <SmartLink
          key={l.label + l.href}
          href={l.href.startsWith("/") || /^[a-z]+:/.test(l.href) ? l.href : `/${l.href}`}
          {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-block bg-accent-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-accent-400 transition-colors"
        >
          {fixTypos(l.label)}
        </SmartLink>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// one live block
// ---------------------------------------------------------------------------

function Block({ block, titled }: { block: PageBlock; titled: boolean }) {
  // A line the block repeats as the opening of one of its cards is said once.
  const opening = new Set(block.cards.flatMap((c) => [c.title, c.body[0]?.text]));
  const body = clean(block.body).filter((n) => !opening.has(n.text));
  const imageOnly = block.cards.filter((c) => !c.title && c.body.length === 0 && c.image);
  const textCards = block.cards.filter((c) => c.title || c.body.length > 0);

  // Where a block mixes captioned items with loose photographs it is a gallery
  // with a caption, so the photographs stay together.
  const keepCardImage = (c: BlockCard) =>
    Boolean(c.image) && (imageOnly.length === 0 || isIcon(c.image!));
  const items = textCards.map((c) => toItem(c, keepCardImage(c))).filter((i) => i.title || i.body.length);

  const onCards = new Set(textCards.filter(keepCardImage).map((c) => c.image!.src));
  const photos: BlockImage[] = [];
  for (const img of [...block.images, ...block.cards.flatMap((c) => (c.image ? [c.image] : []))]) {
    // Loose icons are decoration the live template adds; they say nothing.
    if (onCards.has(img.src) || isIcon(img) || photos.some((p) => p.src === img.src)) continue;
    photos.push(img);
  }

  // One picture beside text: the live "text and image" band.
  const split = photos.length === 1 && (body.length > 0 || items.length > 0) && !block.slider;
  const text = (
    <>
      <Prose nodes={body} />
      <Cards block={block} items={items} titled={titled} />
    </>
  );

  return (
    <div className="space-y-8">
      {split ? (
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">{text}</div>
          {/* An upright picture at full column width would tower over its text. */}
          <div className={photos[0].height > photos[0].width ? "max-w-sm mx-auto w-full" : ""}>
            <Figure image={photos[0]} alt={block.heading || "МедиаторОк"} />
          </div>
        </div>
      ) : (
        <>
          {body.length > 0 && (
            <div className="max-w-3xl">
              <Prose nodes={body} />
            </div>
          )}
          <Cards block={block} items={items} titled={titled} />
          <Photos block={block} images={photos} />
        </>
      )}

      {block.accordion.length > 0 && <Accordion block={block} />}

      {block.videos.length > 0 && (
        <div className={`grid gap-5 ${block.videos.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {block.videos.map((video) => (
            <VideoEmbed key={`${video.provider}:${video.id}`} video={video} title={block.heading || "Видео МедиаторОк"} />
          ))}
        </div>
      )}

      {block.map && <MapEmbed />}
      <Buttons links={block.links} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// the page
// ---------------------------------------------------------------------------

/** True when there is something of this block left to show. */
function hasContent(b: PageBlock): boolean {
  return Boolean(
    clean(b.body).length ||
      b.cards.length ||
      b.images.some((i) => !isIcon(i)) ||
      b.accordion.length ||
      b.videos.length ||
      b.map ||
      b.links.some((l) => !SIGNUP_LINK.test(l.href)),
  );
}

type Section = { heading: string; kicker?: string; blocks: PageBlock[] };

/** What a block says, for telling a repeat from something new. */
const signature = (b: PageBlock) =>
  [b.heading, ...b.body.map((n) => n.text), ...b.cards.flatMap((c) => [c.title, ...c.body.map((n) => n.text)])].join("|");

function toSections(blocks: PageBlock[]): Section[] {
  const out: Section[] = [];
  for (const b of blocks) {
    let heading = isTildaArtefact(b.heading) ? "" : fixTypos(b.heading);
    let block = b;
    if (heading.length > HEADING_MAX) {
      block = { ...b, body: [{ kind: "p", text: heading }, ...b.body] };
      heading = "";
    }
    if (heading || out.length === 0) out.push({ heading, blocks: [block] });
    else out.at(-1)!.blocks.push(block);
  }

  const shown: Section[] = [];
  let kicker: string | undefined;
  for (const s of out) {
    const blocks = s.blocks.filter(hasContent);
    if (blocks.length === 0) {
      // A heading with nothing under it introduces the section that follows.
      // (At the very end it introduced something this page shows elsewhere.)
      kicker = s.heading || kicker;
      continue;
    }
    shown.push({ heading: s.heading, kicker: s.heading ? kicker : undefined, blocks });
    if (!s.heading && kicker) shown.at(-1)!.heading = kicker;
    kicker = undefined;
  }
  return shown;
}

const startsWith = (b: PageBlock, keys: string[]) =>
  keys.some((k) =>
    [b.heading, b.body[0]?.text, b.cards[0]?.title, b.cards[0]?.body[0]?.text].some((line) => line?.startsWith(k)),
  );

export default function PageBlocks({
  page,
  people = true,
  lead = false,
  omit,
  only,
  className = "",
}: {
  /** Page key in the generated block manifest (usually the route segment). */
  page: string;
  /**
   * Set false on a page that presents its people with its own component. The
   * live site's people cards open each CV in a popup; a page that already has
   * cards and a CV dialog would otherwise show the same people twice.
   */
  people?: boolean;
  /** Show the live page's opening block too. Off by default: the hero says it. */
  lead?: boolean;
  /**
   * Live blocks a hand-built section of the page already presents, each named
   * by how its heading (or, lacking one, its first line) starts.
   */
  omit?: string[];
  /** Render just these live blocks, named the same way - to place them by hand. */
  only?: string[];
  className?: string;
}) {
  const all = getPageBlocks(page);
  const blocks = all.filter((b, i) => {
    if (!people && b.popupCards) return false;
    if (only) return startsWith(b, only);
    if (omit && startsWith(b, omit)) return false;
    // The opening block is the page title and tagline, which the hero carries.
    if (i === 0 && !lead && b.heading && (b.role === "cover" || b.cards.length === 0)) return false;
    // Tilda keeps a desktop and a phone variant of some blocks; one is enough.
    const said = signature(b);
    if (said.length > 20 && all.slice(0, i).some((earlier) => signature(earlier) === said)) return false;
    return true;
  });
  const sections = toSections(blocks);
  if (sections.length === 0) return null;

  return (
    <div className={className}>
      {sections.map((section, i) => (
        <section key={i} className={`px-4 py-12 md:py-16 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"}`}>
          <div className="max-w-6xl mx-auto">
            {section.kicker && (
              <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">{section.kicker}</p>
            )}
            {section.heading && (
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 max-w-3xl">{section.heading}</h2>
            )}
            <div className="space-y-10">
              {section.blocks.map((block, k) => (
                <Block key={k} block={block} titled={Boolean(section.heading)} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

import Image from "next/image";
import { getPageBlocks, type PageBlock } from "@lib/pageBlocks";
import ImageSlider from "./ImageSlider";
import ZoomableGrid from "./ZoomableGrid";

/**
 * Renders a page's content in the same order — and the same role — the original
 * mediatorok.by page used: headings, copy, bullet lists, lead banners, image
 * cards, icon rows, portraits and sliders each keep their original position.
 */

function BlockHeading({ text }: { text: string }) {
  if (!text) return null;
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
      {text}
    </h2>
  );
}

function BlockText({ block }: { block: PageBlock }) {
  const { paragraphs, listItems, subheadings } = block;
  if (
    paragraphs.length === 0 &&
    listItems.length === 0 &&
    subheadings.length === 0
  ) {
    return null;
  }

  return (
    <div className="mb-8 max-w-3xl">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-slate-600 text-base leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {subheadings.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {subheadings.map((s) => (
            <span
              key={s}
              className="bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {listItems.length > 0 && (
        <ul className="space-y-2.5">
          {listItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Slider / zoom grid / static grid, matching how the original block behaved. */
function Media({
  block,
  images,
  aspect = "aspect-4/3",
  objectPosition = "object-center",
  columns = "grid-cols-2 md:grid-cols-3",
}: {
  block: PageBlock;
  images: PageBlock["images"];
  aspect?: string;
  objectPosition?: string;
  columns?: string;
}) {
  if (images.length === 0) return null;

  if (block.slider) {
    return (
      <ImageSlider
        images={images}
        cycle={block.cycle}
        arrows={block.arrows}
        dots={block.dots}
        zoomable={block.zoomable}
      />
    );
  }

  if (block.zoomable) {
    return (
      <ZoomableGrid
        images={images}
        aspect={aspect}
        objectPosition={objectPosition}
        columns={columns}
      />
    );
  }

  return (
    <div className={`grid ${columns} gap-4 md:gap-5`}>
      {images.map((i) => (
        <div
          key={i.src}
          className={`relative ${aspect} rounded-xl overflow-hidden bg-slate-200 shadow-sm`}
        >
          <Image
            src={i.src}
            alt={i.alt || block.heading || "МедиаторОк"}
            fill
            className={`object-cover ${objectPosition}`}
            sizes="(max-width: 768px) 50vw, 380px"
          />
        </div>
      ))}
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function BandImage({ block }: { block: PageBlock }) {
  const img = block.images[0];
  return (
    <Shell>
      <BlockHeading text={block.heading} />
      <BlockText block={block} />
      {img && (
        <div className="relative w-full aspect-16/7 rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
          <Image
            src={img.src}
            alt={img.alt || block.heading || "МедиаторОк"}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}
    </Shell>
  );
}

function FeatureImage({ block }: { block: PageBlock }) {
  const [img, ...rest] = block.images;
  if (!img) {
    return (
      <Shell>
        <BlockHeading text={block.heading} />
        <BlockText block={block} />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
            <Image
              src={img.src}
              alt={img.alt || block.heading || "МедиаторОк"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
          {rest.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {rest.map((i) => (
                <div key={i.src} className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    src={i.src}
                    alt={i.alt}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <BlockHeading text={block.heading} />
          <BlockText block={block} />
        </div>
      </div>
    </Shell>
  );
}

function CardGrid({ block }: { block: PageBlock }) {
  // Tilda mixed photo cards and bullet icons into the same block; split them so
  // 100px icons don't get stretched into photo-sized tiles.
  const photos = block.images.filter((i) => Math.max(i.width, i.height) > 260);
  const icons = block.images.filter((i) => Math.max(i.width, i.height) <= 260);

  return (
    <Shell>
      <BlockHeading text={block.heading} />
      <BlockText block={block} />
      {photos.length > 0 && (
        <div className="mb-8">
          <Media block={block} images={photos} />
        </div>
      )}
      {icons.length > 0 && <IconStrip images={icons} />}
    </Shell>
  );
}

function IconStrip({ images }: { images: PageBlock["images"] }) {
  return (
    <div className="flex flex-wrap gap-6 md:gap-8">
      {images.map((i) => (
        <div
          key={i.src}
          className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0"
        >
          <Image
            src={i.src}
            alt={i.alt}
            fill
            className="object-contain"
            sizes="80px"
          />
        </div>
      ))}
    </div>
  );
}

function IconRow({ block }: { block: PageBlock }) {
  return (
    <Shell>
      <BlockHeading text={block.heading} />
      <BlockText block={block} />
      <IconStrip images={block.images} />
    </Shell>
  );
}

function People({ block }: { block: PageBlock }) {
  return (
    <Shell>
      <BlockHeading text={block.heading} />
      <BlockText block={block} />
      <Media
        block={block}
        images={block.images}
        aspect="aspect-3/4"
        objectPosition="object-top"
        columns="grid-cols-2 md:grid-cols-4"
      />
    </Shell>
  );
}

function Gallery({ block }: { block: PageBlock }) {
  return (
    <Shell>
      <BlockHeading text={block.heading} />
      <BlockText block={block} />
      <Media block={block} images={block.images} />
    </Shell>
  );
}

function Block({ block }: { block: PageBlock }) {
  switch (block.role) {
    case "band-image":
    case "cover":
      return <BandImage block={block} />;
    case "feature-image":
      return <FeatureImage block={block} />;
    case "card-grid":
      return <CardGrid block={block} />;
    case "icon-row":
      return <IconRow block={block} />;
    case "person":
      return <People block={block} />;
    case "gallery":
      return <Gallery block={block} />;
    default:
      return null;
  }
}

export default function PageBlocks({
  page,
  className = "",
}: {
  /** Page key in the generated block manifest (usually the route segment). */
  page: string;
  className?: string;
}) {
  const blocks = getPageBlocks(page);
  if (blocks.length === 0) return null;

  return (
    <div className={className}>
      {blocks.map((block, i) => (
        <div key={i} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
          <Block block={block} />
        </div>
      ))}
    </div>
  );
}

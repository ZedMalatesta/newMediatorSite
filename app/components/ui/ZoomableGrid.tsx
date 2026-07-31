"use client";

import Image from "next/image";
import { useState } from "react";
import type { BlockImage } from "@lib/pageBlocks";
import Lightbox from "./Lightbox";

type Props = {
  images: BlockImage[];
  /** Tailwind aspect utility for each tile. */
  aspect?: string;
  /** object-fit anchoring — portraits look better pinned to the top. */
  objectPosition?: string;
  columns?: string;
};

/**
 * Image grid whose tiles open a full-size overlay on click, as the original
 * zoomable Tilda gallery blocks did.
 */
export default function ZoomableGrid({
  images,
  aspect = "aspect-4/3",
  objectPosition = "object-center",
  columns = "grid-cols-2 md:grid-cols-3",
}: Props) {
  const [zoom, setZoom] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className={`grid ${columns} gap-4 md:gap-5`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setZoom(i)}
            aria-label={img.alt || `Открыть изображение ${i + 1}`}
            className={`relative ${aspect} rounded-xl overflow-hidden bg-slate-200 shadow-sm cursor-zoom-in group`}
          >
            <Image
              src={img.src}
              alt={img.alt || "Фотография МедиаторОк"}
              fill
              className={`object-cover ${objectPosition} transition-transform duration-300 group-hover:scale-105`}
              sizes="(max-width: 768px) 50vw, 380px"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={zoom}
        onClose={() => setZoom(null)}
        onIndexChange={setZoom}
      />
    </>
  );
}

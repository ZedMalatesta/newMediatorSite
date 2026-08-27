"use client";

import Image from "next/image";
import { useState } from "react";
import type { BlockImage } from "@lib/pageBlocks";
import Lightbox from "./Lightbox";

type Props = {
  images: BlockImage[];
  /** Wrap around past the last slide, as the original slider did. */
  cycle?: boolean;
  arrows?: boolean;
  dots?: boolean;
  /** Clicking a slide opens the full-size overlay. */
  zoomable?: boolean;
};

/**
 * One-at-a-time image slider reproducing the original Tilda carousel: previous
 * / next arrows, bullet pagination, optional wrap-around and click-to-zoom.
 */
export default function ImageSlider({
  images,
  cycle = true,
  arrows = true,
  dots = true,
  zoomable = false,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  if (images.length === 0) return null;

  const atStart = current === 0;
  const atEnd = current === images.length - 1;

  const go = (delta: number) => {
    const next = current + delta;
    if (next < 0) setCurrent(cycle ? images.length - 1 : 0);
    else if (next >= images.length) setCurrent(cycle ? 0 : images.length - 1);
    else setCurrent(next);
  };

  const img = images[current];

  return (
    <div className="relative">
      <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
        <Image
          src={img.src}
          alt={img.alt || "Фотография МедиаторОк"}
          fill
          className={`object-cover ${zoomable ? "cursor-zoom-in" : ""}`}
          sizes="(max-width: 1200px) 100vw, 1100px"
          priority={current === 0}
        />
        {zoomable && (
          <button
            type="button"
            onClick={() => setZoom(current)}
            aria-label="Открыть изображение"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {arrows && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!cycle && atStart}
            aria-label="Предыдущий слайд"
            className="absolute top-1/2 -translate-y-1/2 left-3 w-11 h-11 rounded-full bg-white/85 text-slate-800 text-2xl leading-none shadow hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!cycle && atEnd}
            aria-label="Следующий слайд"
            className="absolute top-1/2 -translate-y-1/2 right-3 w-11 h-11 rounded-full bg-white/85 text-slate-800 text-2xl leading-none shadow hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </>
      )}

      {dots && images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === current}
              className={`h-2.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-accent-500"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}

      {zoomable && (
        <Lightbox
          images={images}
          index={zoom}
          onClose={() => setZoom(null)}
          onIndexChange={setZoom}
        />
      )}
    </div>
  );
}

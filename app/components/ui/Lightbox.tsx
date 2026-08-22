"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { BlockImage } from "@lib/pageBlocks";

type Props = {
  images: BlockImage[];
  /** Index of the open image; null closes the overlay. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Full-size image overlay, matching the zoom the original Tilda gallery blocks
 * opened on click. Closes on Esc or backdrop click; arrow keys step through the
 * images of the same block.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, step]);

  if (index === null) return null;
  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр изображения"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 transition-colors"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Предыдущее изображение"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 md:left-6 w-11 h-11 rounded-full bg-white/10 text-white text-3xl leading-none hover:bg-white/20 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующее изображение"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 md:right-6 w-11 h-11 rounded-full bg-white/10 text-white text-3xl leading-none hover:bg-white/20 transition-colors"
          >
            ›
          </button>
        </>
      )}

      <figure
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.src}
          alt={img.alt || "Фотография МедиаторОк"}
          width={img.width || 1200}
          height={img.height || 900}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
          sizes="100vw"
        />
        {images.length > 1 && (
          <figcaption className="text-center text-white/70 text-sm mt-3">
            {index + 1} / {images.length}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

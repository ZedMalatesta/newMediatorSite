"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { testimonialImages } from "@/app/lib/data";

export default function TestimonialsSection() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);

  const prev = useCallback(() =>
    setOpen((i) => (i === null ? null : (i - 1 + testimonialImages.length) % testimonialImages.length)),
    []
  );

  const next = useCallback(() =>
    setOpen((i) => (i === null ? null : (i + 1) % testimonialImages.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close, prev, next]);

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Отзывы
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Отзывы наших учеников
          </h2>
        </div>

        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {testimonialImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="flex-shrink-0 snap-start w-64 md:w-72 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all bg-white cursor-zoom-in group relative"
              aria-label={`Открыть отзыв ${i + 1}`}
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={src}
                  alt={`Отзыв ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="288px"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                    Открыть
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-zinc-500 font-semibold hover:text-amber-600 transition-colors text-sm"
          >
            Ещё больше отзывов здесь →
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Image container */}
          <div
            className="relative max-w-2xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[85vh] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={testimonialImages[open]}
                alt={`Отзыв ${open + 1}`}
                width={640}
                height={900}
                className="object-contain w-full max-h-[85vh]"
                priority
              />
            </div>

            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-3 -right-3 w-9 h-9 bg-white text-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors font-bold text-lg leading-none"
              aria-label="Закрыть"
            >
              ×
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-0 -translate-x-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-slate-700 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-colors"
              aria-label="Предыдущий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-0 translate-x-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-slate-700 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-colors"
              aria-label="Следующий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {open + 1} / {testimonialImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

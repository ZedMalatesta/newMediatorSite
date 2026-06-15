import Image from "next/image";
import { testimonialImages } from "@/lib/data";

export default function TestimonialsSection() {
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

        {/* Horizontal scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonialImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-start w-64 md:w-72 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={src}
                  alt={`Отзыв ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="288px"
                />
              </div>
            </div>
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
    </section>
  );
}

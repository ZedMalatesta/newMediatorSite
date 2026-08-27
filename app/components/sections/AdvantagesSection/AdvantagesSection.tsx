import Image from "next/image";
import { advantages } from "@/app/lib/data";

export default function AdvantagesSection() {
  return (
    <section className="px-4 py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Почему обучаться у нас
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Преимущества нашего обучения
          </h2>
        </div>

        {/* Two-column layout: image left, cards right */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Decorative image */}
          <div className="flex-shrink-0 w-full lg:w-72 xl:w-80 flex flex-col items-center">
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 drop-shadow-xl">
              <Image
                src="/images/decorative/advantages-lightbulb.png"
                alt="Уникальные программы обучения"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 256px, 320px"
              />
            </div>
            <p className="mt-6 text-center text-slate-500 text-sm leading-relaxed max-w-xs hidden lg:block">
              Наши программы уникальны по содержанию и построены на интеграции
              нескольких наук и современных технологий коммуникации.
            </p>
          </div>

          {/* 2×3 cards grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="bg-white rounded-xl p-5 border border-slate-100 hover:border-accent-200 hover:shadow-md transition-all flex gap-4 items-start"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={adv.iconSrc}
                      alt={adv.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {adv.title}
                    </h3>
                    <span className="text-xs font-bold text-accent-400 flex-shrink-0">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

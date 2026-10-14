import Image from "next/image";
import { experts } from "@/app/lib/data";

const fallbackColors = [
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-zinc-200",
];

export default function ExpertsSection() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Наша команда
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Наши эксперты
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            Каждую программу ведут опытные практикующие специалисты, востребованные
            в своей сфере.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {experts.map((expert, i) => (
            <div
              key={expert.name}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:border-accent-200 hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-accent-200 flex-shrink-0">
                {expert.photoSrc ? (
                  <div className="relative w-20 h-20">
                    <Image
                      src={expert.photoSrc}
                      alt={expert.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div
                    className={`${fallbackColors[i % fallbackColors.length]} w-full h-full flex items-center justify-center font-bold text-slate-700 text-lg`}
                  >
                    {expert.initials}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-0.5">{expert.name}</h3>
              <div className="text-accent-600 text-xs font-semibold mb-3">{expert.role}</div>
              <p className="text-slate-400 text-xs leading-relaxed">{expert.credentials}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/trainers" className="text-zinc-500 font-semibold hover:text-accent-600 transition-colors text-sm">
            Подробнее об экспертах →
          </a>
        </div>
      </div>
    </section>
  );
}

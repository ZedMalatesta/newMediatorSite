import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { formats, prices } from "./counseling-data";

export default function CounselingFormats() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Форматы" title="Как проходит консультирование" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {formats.map((f) => (
            <div key={f.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <p className="font-bold text-slate-900 text-sm mb-2">{f.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <SectionHeader label="Стоимость" title="Цены на консультации" />
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          {prices.map((row, i) => (
            <div
              key={row.service}
              className={`flex items-center justify-between gap-3 px-6 py-5 ${
                i !== prices.length - 1 ? "border-b border-slate-100" : ""
              } ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
            >
              <p className="font-semibold text-slate-900 text-sm">{row.service}</p>
              <span className="inline-block bg-accent-50 border border-accent-200 text-accent-800 font-bold text-sm px-4 py-1.5 rounded-lg whitespace-nowrap">
                {row.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { included, program } from "./summerschool2025-data";

export default function Summerschool2025Program() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Программа" title="Чем были заняты четыре дня" />

        <div className="space-y-3 mb-14">
          {program.map((d) => (
            <div key={d.date} className="bg-white rounded-2xl border border-slate-100 p-6">
              <p className="text-amber-600 font-bold text-sm mb-3">{d.date}</p>
              <ul className="space-y-2">
                {d.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SectionHeader label="Что было включено" title="Условия участия" />
        <div className="flex flex-wrap gap-3">
          {included.map((i) => (
            <span
              key={i}
              className="bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

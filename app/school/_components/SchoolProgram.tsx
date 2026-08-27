import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { outcomes, streams, topics } from "./school-data";

export default function SchoolProgram() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Потоки" title="Когда начинаем" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {streams.map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
              <p className="text-accent-600 font-bold text-sm mb-1">{s.label}</p>
              <p className="text-slate-700 text-sm">{s.dates}</p>
            </div>
          ))}
        </div>

        <SectionHeader label="Программа" title="Темы занятий" />
        <div className="flex flex-wrap gap-3 mb-14">
          {topics.map((t) => (
            <span
              key={t}
              className="bg-accent-50 border border-accent-200 text-accent-800 text-sm font-semibold px-4 py-2 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <SectionHeader label="Чему научится ребёнок" title="Результаты обучения" />
        <ul className="space-y-2.5">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

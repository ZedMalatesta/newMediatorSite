import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { additionalMaterials, books } from "./literature-data";

export default function LiteratureList() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Методическая помощь"
          title="Рекомендуемая литература"
          subtitle="Мы будем пополнять список полезной литературы, которую рекомендуют наши эксперты."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {books.map((b) => (
            <div key={b.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
              <p className="font-bold text-slate-900 text-sm mb-1">{b.title}</p>
              <p className="text-slate-500 text-xs">{b.author}</p>
            </div>
          ))}
        </div>

        <SectionHeader label="Дополнительно" title="Материалы для скачивания" />
        <ul className="space-y-3">
          {additionalMaterials.map((m) => (
            <li key={m} className="flex items-start gap-3 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

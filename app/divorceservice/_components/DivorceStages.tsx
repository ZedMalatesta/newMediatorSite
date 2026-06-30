import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { packageItems, stages } from "./divorce-data";

export default function DivorceStages() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Что делать, если вы хотите развестись?"
          title="Развод — это не один момент, а процесс"
          subtitle="Расторжение брака с юридической стороны может занять от 6 месяцев до 10 лет и проходит через несколько этапов."
        />

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-14">
          {stages.map((s, i) => (
            <div key={s} className="bg-slate-50 rounded-2xl border border-slate-100 p-4 text-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mx-auto mb-3">
                {i + 1}
              </span>
              <p className="text-slate-700 text-sm font-medium leading-snug">{s}</p>
            </div>
          ))}
        </div>

        <SectionHeader label="Пакет услуг" title="Что включает сопровождение" />
        <ul className="space-y-3">
          {packageItems.map((p) => (
            <li key={p} className="flex items-start gap-3 bg-slate-50 rounded-xl border border-slate-100 px-5 py-4 text-slate-700 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

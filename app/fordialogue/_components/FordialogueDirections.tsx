import { SectionHeader } from "@ui/SectionHeader/SectionHeader";

const directions: string[] = [
  "Распространение информации о способах сотрудничества",
  "Индивидуальные консультации сторонам конфликта",
  "Подготовка к переговорам",
  "Поиск переговорщиков и переговорных площадок",
  "Организация и проведение переговоров",
  "Медиация в переговорных процессах",
];

export default function FordialogueDirections() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Направления деятельности"
          title="Что мы делаем"
          subtitle="Эксперты в области медиации и переговоров из разных стран работают на волонтёрской основе и предоставляют услуги бесплатно."
        />

        <ul className="space-y-3">
          {directions.map((d) => (
            <li key={d} className="flex items-start gap-3 bg-slate-50 rounded-xl border border-slate-100 px-5 py-4 text-slate-700 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

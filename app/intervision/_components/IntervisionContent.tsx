import { SectionHeader } from "@ui/SectionHeader/SectionHeader";

const activities: string[] = [
  "Изучение новых подходов и методов в медиации",
  "Анализ специальной литературы",
  "Обмен профессиональным опытом",
  "Разбор реальных случаев с методической помощью коллег",
  "Организация совместных проектов и мероприятий",
  "Профилактика профессионального выгорания",
];

export default function IntervisionContent() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Для кого"
          title="Для практикующих медиаторов"
          subtitle="Группа подойдёт тем, кто хочет развиваться в профессии и получать поддержку коллег в своей практике."
        />

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-7">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
            Что входит во встречи
          </p>
          <ul className="space-y-2.5">
            {activities.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const directions = [
  {
    emoji: "⚖️",
    text: "Семейные конфликты и восстановление отношений",
  },
  {
    emoji: "🏢",
    text: "Для бизнес-структур — программы по управлению конфликтами и психологии сотрудничества, корпоративное обучение",
  },
  {
    emoji: "👨‍👩‍👧",
    text: "Курсы по детской и семейной психологии",
  },
];

export default function AboutHistory() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* History */}
        <div>
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            С чего всё началось
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Наша история</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              В 2020 году наши мечты приобрели физическую и юридическую форму в виде
              ООО «МедиаторОк» и УПУ «МедиаторОк Проф».
            </p>
            <p>
              Также мы создали Международную онлайн академию психологии, медиации и
              коучинга. В рамках нашей школы работает научная школа, результаты которой
              внедряются в образовательные программы.
            </p>
          </div>
        </div>

        {/* Research directions */}
        <div>
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Научная работа
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Основные направления исследований
          </h2>
          <div className="space-y-4">
            {directions.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100"
              >
                <span className="text-2xl flex-shrink-0">{d.emoji}</span>
                <p className="text-slate-700 text-sm leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

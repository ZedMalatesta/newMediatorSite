type FamilyService = {
  title: string;
  bullets: string[];
  note?: string;
  specialists?: string[];
};

const SPECIALISTS_BADGE_COLORS: Record<string, string> = {
  МЕДИАТОР: "bg-amber-100 text-amber-800 border-amber-200",
  НОТАРИУС: "bg-slate-100 text-slate-700 border-slate-200",
  ЮРИСТ: "bg-blue-50 text-blue-700 border-blue-100",
  АДВОКАТ: "bg-indigo-50 text-indigo-700 border-indigo-100",
  ПСИХОЛОГ: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

const services: FamilyService[] = [
  {
    title: "КОНСУЛЬТИРОВАНИЕ СУПРУГОВ У ПСИХОЛОГА",
    bullets: [
      "Консультирование супругов индивидуально и совместно по вопросам семейных споров и конфликтов",
      "Консультирование по вопросам восстановления отношений в период семейных кризисов",
      "Ориентирование и консультирование семей в решении сложных жизненных ситуаций",
      "Обучение навыкам коммуникации и бесконфликтного общения и взаимодействия",
      "Проведение семейных конференций в ситуациях домашнего насилия и различного вида зависимостей",
    ],
  },
  {
    title: "КОНСУЛЬТАЦИИ СПЕЦИАЛИСТОВ НА ЭТАПЕ РАЗВОДА",
    bullets: [
      "Консультирование и сопровождение супругов на разных этапах: предразвод, развод, постразвод",
      "Консультирование родителей по вопросам совместного родительства в период развода — воспитание и содержание детей, выплата алиментов",
    ],
    specialists: ["МЕДИАТОР", "НОТАРИУС", "ЮРИСТ", "АДВОКАТ", "ПСИХОЛОГ"],
  },
  {
    title: "КОНСУЛЬТИРОВАНИЕ РОДИТЕЛЕЙ И ДЕТЕЙ",
    bullets: [
      "Обучение родителей навыкам коммуникации и бесконфликтного общения",
      "Консультирование по вопросам психологического сопровождения детей разного возраста в период развода",
      "Консультирование и сопровождение семей в период сложных многопоколенных конфликтов",
    ],
    note: "С помощью семейной медиации можно решить: как будет происходить общение с ребёнком после развода, как сохранить родительские функции и обеспечить психологическое благополучие ребёнка.",
  },
  {
    title: "СОСТАВЛЕНИЕ БРАЧНОГО ДОГОВОРА",
    bullets: [
      "Соглашение лиц, вступающих в брак, либо супругов об определении их личных неимущественных и имущественных прав и обязанностей как в период брака, так и после его расторжения",
      "Позволяет добровольно урегулировать имущественные и неимущественные отношения",
      "Минимизирует последующее административное и судебное вмешательство в вопросы жизни семьи",
    ],
    specialists: ["НОТАРИУС", "ЮРИСТ", "АДВОКАТ"],
  },
];

export default function FamilyServices() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Для семейных пар
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Что мы можем предложить для семейных пар
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all flex flex-col"
            >
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-5 pb-4 border-b border-amber-100">
                {s.title}
              </h3>

              <ul className="space-y-3 flex-1 mb-4">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>

              {s.note && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
                  <p className="text-amber-800 text-xs leading-relaxed">{s.note}</p>
                </div>
              )}

              {s.specialists && (
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                    Специалисты
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.specialists.map((sp) => (
                      <span
                        key={sp}
                        className={`text-xs font-semibold px-2 py-0.5 rounded border ${SPECIALISTS_BADGE_COLORS[sp] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

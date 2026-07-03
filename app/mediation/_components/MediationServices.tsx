const SPECIALISTS_BADGE_COLORS: Record<string, string> = {
  МЕДИАТОР: "bg-amber-100 text-amber-800 border-amber-200",
  НОТАРИУС: "bg-slate-100 text-slate-700 border-slate-200",
  ЮРИСТ: "bg-blue-50 text-blue-700 border-blue-100",
  АДВОКАТ: "bg-indigo-50 text-indigo-700 border-indigo-100",
  ПСИХОЛОГ: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

type Service = {
  title: string;
  bullets: string[];
  specialists?: string[];
};

const services: Service[] = [
  {
    title: "МЕДИАЦИЯ В СИТУАЦИЯХ РАЗВОДА",
    bullets: [
      "Консультирование и юридическое сопровождение семьи на всех этапах развода: предразвод, развод, постразвод",
      "Рассматриваются юридические, экономические и психологические аспекты развода",
    ],
    specialists: ["МЕДИАТОР", "НОТАРИУС", "ЮРИСТ", "АДВОКАТ", "ПСИХОЛОГ"],
  },
  {
    title: "НАСЛЕДСТВЕННЫЕ СПОРЫ",
    bullets: [
      "Разрешение наследственных споров любой сложности",
    ],
    specialists: ["МЕДИАТОР", "НОТАРИУС", "ЮРИСТ", "АДВОКАТ"],
  },
  {
    title: "МЕДИАЦИЯ СЕМЕЙНЫХ КОНФЛИКТОВ",
    bullets: [
      "Проведение переговоров относительно семейных конфликтов любой сложности, независимо от предмета спора, срока давности и степени родства",
      "Консультирование и сопровождение семей в период сложных многопоколенных конфликтов и конфликтов разного уровня (дети — родители, братья — сёстры)",
      "Проведение семейных конференций в ситуациях домашнего насилия и различного вида зависимостей",
    ],
  },
];

export default function MediationServices() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Что мы предлагаем
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Наши услуги по проведению процедуры медиации
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all flex flex-col"
            >
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-5 pb-4 border-b border-amber-100">
                {s.title}
              </h3>

              <ul className="space-y-3 flex-1 mb-6">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>

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

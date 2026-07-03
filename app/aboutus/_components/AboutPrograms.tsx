const professionalPrograms = [
  "Подготовка медиаторов по программе, утверждённой Минюстом РБ",
  "Семейный психолог",
  "Семейный медиатор",
  "Семейный консультант",
  "Семейный конфликтолог",
  "Семейный и детский коуч",
  "Семейный сексолог",
  "Клинический психолог",
  "Детский психолог",
];

export default function AboutPrograms() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Чему мы учим
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Обучающие программы
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-3xl">
            Наши программы помогают людям менять себя и мир вокруг согласно
            общечеловеческим принципам и законам межличностного общения, ставить
            вопросы, чтобы находить нужные ответы, создавать новые ценности и
            поддерживать культуру ненасилия.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Audience cards */}
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl mb-4">
                🎓
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Специалистам</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Тем, кто хочет усовершенствовать свои профессиональные навыки
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl mb-4">
                🌱
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Неспециалистам</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Людям, которые хотят найти в себе новые возможности и ресурсы или освоить новую профессию
              </p>
            </div>
          </div>

          {/* Program list */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 text-lg">
              Программы для специалистов
            </h3>
            <ul className="space-y-3">
              {professionalPrograms.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="#programs"
              className="inline-block mt-6 text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors"
            >
              Подробнее об обучении →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IntensiveHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
          10-й юбилейный сезон
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Летний интенсив медиаторов 2026
        </h1>
        <p className="text-slate-300 text-xl mb-2 max-w-xl">
          Интенсивный выездной обучающий курс «Бизнес-медиация»
        </p>
        <p className="text-slate-400 mb-8">
          Учебный центр Национального банка, дер. Раубичи, Минский р-н
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#signup"
            className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            Зарегистрироваться
          </a>
          <div className="flex items-center gap-2 text-slate-300 text-sm bg-white/10 px-5 py-3 rounded-lg border border-white/20">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            10–12 июля 2026 г.
          </div>
        </div>
      </div>
    </section>
  );
}

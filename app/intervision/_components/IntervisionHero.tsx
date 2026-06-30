export default function IntervisionHero() {
  return (
    <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Наш проект
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl">
          Интервизорская группа «Pro Mediation»
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mb-8">
          Пространство для общения, профессиональной поддержки, обмена опытом
          и личностного роста медиатора.
        </p>
        <div className="flex flex-wrap gap-6 text-sm">
          {[
            "Онлайн, 2 раза в месяц по пятницам, 19:00–21:00",
            "Бесплатно для участников",
          ].map((c) => (
            <div key={c} className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

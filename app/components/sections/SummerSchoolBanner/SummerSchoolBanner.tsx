export default function SummerSchoolBanner() {
  return (
    <section className="px-4 py-0 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-14 md:py-16 max-w-2xl">
            <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-4">
              Приглашаем принять участие
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              ЛЕТНЯЯ Школа медиаторов 2026!
            </h2>
            <p className="text-slate-200 text-lg mb-2">
              4–6 июля 2026 г., г. Гродно
            </p>
            <p className="text-slate-300 mb-8">
              Интенсивный выездной обучающий курс{" "}
              <span className="text-white font-semibold">
                «Медиатор как личность и как профессионал»
              </span>
            </p>
            <a
              href="#"
              className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Узнать подробнее
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

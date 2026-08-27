const outcomes = [
  {
    icon: "🎯",
    text: "Знания, которые можно сразу применять на практике",
  },
  {
    icon: "📋",
    text: "Алгоритм работы с супругами в разных подходах от первой сессии до завершения терапии",
  },
  {
    icon: "✨",
    text: "28 новых авторских техник в работе с супружескими парами",
  },
  {
    icon: "🔬",
    text: "Глубокое погружение в отработку практических навыков",
  },
  {
    icon: "📚",
    text: "Электронные книги в PDF + доступ ко всем образовательным материалам",
  },
  {
    icon: "🎬",
    text: "14 видеозаписей занятий",
  },
  {
    icon: "💬",
    text: "7 сессий с разбором",
  },
  {
    icon: "📜",
    text: "Сертификат государственного образца + сертификат на двух языках (русский и английский)",
  },
];

export default function CourseOutcomes() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Результат обучения
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Что вы получите
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:border-accent-200 hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-4 block">{o.icon}</span>
              <p className="text-slate-700 text-sm leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

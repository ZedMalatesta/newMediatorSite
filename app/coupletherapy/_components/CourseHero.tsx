import Image from "next/image";

export default function CourseHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/services/couple-mediation.jpg"
          alt="Супружеская и парная терапия"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-accent-900/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Программа обучения
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Супружеская и парная терапия
        </h1>
        <p className="text-slate-300 text-xl mb-8 max-w-xl">
          Курс «Семейный психолог». Уровень — психолог-практик.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#signup"
            className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
          >
            Заполнить заявку
          </a>
          <div className="flex items-center gap-2 text-slate-300 text-sm bg-white/10 px-5 py-3 rounded-lg border border-white/20">
            <svg className="w-4 h-4 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Первый модуль 1–2 августа 2026 г.
          </div>
        </div>
      </div>
    </section>
  );
}

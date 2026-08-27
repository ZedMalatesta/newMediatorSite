import Image from "next/image";

export default function CourseInstructor() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Преподаватель курса
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Ваш куратор
          </h2>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-accent-200 shadow-md relative">
              <Image
                src="/images/experts/shulga.jpg"
                alt="Шульга Оксана"
                fill
                className="object-cover object-top"
                sizes="160px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Шульга Оксана</h3>
            <p className="text-accent-600 font-semibold text-sm mb-5">
              Преподаватель курса
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {[
                "Кандидат психологических наук",
                "Доцент",
                "Системный семейный психолог",
                "Медиатор",
                "Гештальт-терапевт",
                "Детский психолог",
                "Психолингвист",
                "Конфликтолог",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Директор РОО «Белорусская Лига семейных медиаторов», директор
              Учебно-практического учреждения «МедиаторОк Проф». Автор авторских
              техник в области супружеской и семейной терапии.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

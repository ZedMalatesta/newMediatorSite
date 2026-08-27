import Image from "next/image";

export default function SchoolTrainer() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Тренер
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Кто ведёт занятия</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-accent-200 shadow-md relative">
              <Image
                src="/images/experts/shulga.jpg"
                alt="Оксана Шульга"
                fill
                className="object-cover object-top"
                sizes="128px"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Оксана Шульга</h3>
            <p className="text-accent-600 font-semibold text-sm mb-4">
              Кандидат психологических наук, доцент
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Системный семейный психолог, медиатор, директор РОО «Белорусская Лига
              семейных медиаторов». Более 20 лет работы с детьми и подростками.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

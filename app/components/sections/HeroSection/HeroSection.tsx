import { stats, forWhom } from "@/app/lib/data";

export default function HeroSection() {
  return (
    <section id="about" className="bg-white px-4 pt-16 pb-0">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-14">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Наша миссия
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-10">
            Учебно-практическое учреждение «МедиаторОк&nbsp;Проф»
          </h1>

          {/* Mission statement, set as a pull quote. */}
          <figure className="relative mb-10">
            <span
              aria-hidden="true"
              className="absolute -top-6 -left-2 md:-left-4 text-7xl md:text-8xl leading-none text-accent-200 select-none font-display"
            >
              «
            </span>
            <blockquote className="relative border-l-4 border-accent-500 pl-6 md:pl-8 py-1">
              <p className="font-display text-2xl md:text-3xl lg:text-[2.1rem] font-bold text-slate-900 leading-snug tracking-tight">
                Мы помогаем людям менять себя и мир вокруг согласно
                общечеловеческим принципам и законам, создавать новые ценности
                и поддерживать культуру ненасилия!
              </p>
            </blockquote>
            <figcaption className="mt-4 pl-6 md:pl-8 text-sm text-slate-500">
              <cite className="not-italic font-semibold text-slate-600">
                «МедиаторОк Проф»
              </cite>{" "}
              — о том, зачем мы работаем
            </figcaption>
          </figure>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
            За этими словами — три направления работы: мы обучаем медиаторов и
            специалистов помогающих профессий, проводим процедуры медиации и
            ведём психологическое консультирование. Разное по форме, но об одном:
            дать людям способ договариваться там, где раньше был только спор.
          </p>

          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Кому это подходит
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {forWhom.map((item, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 hover:border-accent-200 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="block font-display text-accent-500 font-bold mb-2"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-600 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#programs"
              className="inline-block bg-zinc-200 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-300 transition-colors border border-zinc-300"
            >
              Актуальные программы обучения
            </a>
            <a
              href="#services"
              className="inline-block border-2 border-accent-400 text-accent-700 px-8 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors"
            >
              Наши услуги
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t-2 border-accent-400 pt-4 pb-8">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

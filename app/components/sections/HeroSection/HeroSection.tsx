import { stats, forWhom } from "@/app/lib/data";

export default function HeroSection() {
  return (
    <section id="about" className="bg-white px-4 pt-16 pb-0">
      <div className="max-w-6xl mx-auto">
        {/* Mission */}
        <div className="max-w-3xl mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Учебно-практическое учреждение «МедиаторОк Проф»
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
            Мы помогаем людям менять себя и мир вокруг согласно
            общечеловеческим принципам и законам, создавать новые ценности и
            поддерживать культуру ненасилия!
          </h1>

          <ul className="space-y-3 mb-10">
            {forWhom.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="#programs"
              className="inline-block bg-zinc-200 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-300 transition-colors border border-zinc-300"
            >
              Актуальные программы обучения
            </a>
            <a
              href="#services"
              className="inline-block border-2 border-amber-400 text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Наши услуги
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t-2 border-amber-400 pt-4 pb-8">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

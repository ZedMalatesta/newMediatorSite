import { stats, forWhom } from "@/lib/data";

export default function HeroSection() {
  return (
    <section id="about" className="bg-white px-4 pt-16 pb-0">
      <div className="max-w-6xl mx-auto">
        {/* Mission */}
        <div className="max-w-3xl mb-14">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-4">
            МедиаторОк Проф — Professional Mediation Centre
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            We help people change themselves and the world according to
            universal principles and laws
          </h1>
          <p className="text-lg text-slate-500 mb-10">
            We create new values and support a culture of non-violence — through
            evidence-based training, professional mediation, and lasting personal
            development.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#programs"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              View Training Programmes
            </a>
            <a
              href="#services"
              className="inline-block border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-teal-400 hover:text-teal-600 transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-t-2 border-teal-500 pt-4 pb-6"
            >
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* For whom — full-width strip */}
      <div className="bg-slate-50 border-t border-slate-100 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {forWhom.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

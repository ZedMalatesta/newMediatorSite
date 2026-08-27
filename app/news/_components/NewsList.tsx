import { news, promos } from "@lib/data";

export default function NewsList() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Новости и достижения
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Что у нас нового</h2>
        </div>

        <div className="space-y-4 mb-16">
          {news.map((item, i) => (
            <div key={i} className="flex gap-4 bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <div className="flex-shrink-0 w-1 rounded-full bg-accent-400 self-stretch" />
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Скоро
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ближайшие события</h2>
        </div>

        <ul className="space-y-3">
          {promos.map((p) => (
            <li key={p} className="flex items-start gap-3 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

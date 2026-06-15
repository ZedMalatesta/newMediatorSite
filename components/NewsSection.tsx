import { news } from "@/lib/data";

export default function NewsSection() {
  return (
    <section className="px-4 py-14 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-6">
          Новости и достижения
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-1 rounded-full bg-amber-400 self-stretch" />
              <p className="text-slate-600 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

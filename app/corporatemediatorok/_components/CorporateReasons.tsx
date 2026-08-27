import { reasons } from "./corporate-data";

export default function CorporateReasons() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((r) => (
          <div key={r.title} className="bg-slate-50 rounded-2xl border border-slate-100 p-7">
            <h3 className="text-lg font-bold text-accent-700 mb-4">{r.title}</h3>
            <ul className="space-y-2.5">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-1.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

import { stats } from "./intensive-data";

export default function IntensiveStats() {
  return (
    <section className="bg-amber-500 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-1">{s.value}</p>
            <p className="text-amber-100 text-sm leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

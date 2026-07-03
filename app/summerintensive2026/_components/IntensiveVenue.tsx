import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { benefits, onlineFormat, venue } from "./intensive-data";

export default function IntensiveVenue() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Место проведения" title={venue.name} subtitle={venue.address} />

        <p className="text-slate-600 text-base leading-relaxed max-w-3xl mb-12">
          {venue.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center"
            >
              <p className="text-slate-700 text-sm font-medium leading-relaxed">{b.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-white">
          <h3 className="text-2xl font-bold mb-5">{onlineFormat.title}</h3>
          <ul className="space-y-2.5">
            {onlineFormat.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

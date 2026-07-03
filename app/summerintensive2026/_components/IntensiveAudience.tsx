import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { audience } from "./intensive-data";

export default function IntensiveAudience() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Кому подойдёт" title="Для кого этот интенсив" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audience.map((a) => (
            <div
              key={a.title}
              className="bg-white rounded-2xl border border-slate-100 p-6 text-center"
            >
              <p className="font-bold text-slate-900 text-sm mb-2">{a.title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

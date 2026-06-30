import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { pillars } from "./intensive-data";

export default function IntensiveAbout() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="О программе"
          title="Ретрит вдали от работы и суеты"
          subtitle="Три дня, которые дают духовное наполнение, новые профессиональные инструменты и инсайты — наравне с отдыхом и общением с коллегами."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center"
            >
              <h3 className="text-lg font-bold text-amber-600 mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { extraCourses } from "./extra-courses-data";

export default function ExtraCourses() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Вебинары и доп. курсы" title="Ещё больше программ" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {extraCourses.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <p className="font-bold text-slate-900 text-sm mb-2">{c.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

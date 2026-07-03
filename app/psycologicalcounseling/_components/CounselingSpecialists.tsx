import Image from "next/image";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { specialists } from "./counseling-data";

export default function CounselingSpecialists() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Специалисты" title="Кто проводит консультации" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {specialists.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
              <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-amber-200 shadow mb-4">
                {s.photo ? (
                  <Image src={s.photo} alt={s.name} fill className="object-cover object-top" sizes="80px" />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600">
                    {s.initials}
                  </div>
                )}
              </div>
              <p className="font-bold text-slate-900 text-sm">{s.name}</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{s.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

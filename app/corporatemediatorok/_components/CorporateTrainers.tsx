import Image from "next/image";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { trainers } from "./corporate-data";

export default function CorporateTrainers() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Тренеры" title="Кто проводит обучение" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trainers.map((t) => (
            <div key={t.name} className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center">
              <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-amber-200 shadow mb-4">
                <Image src={t.photo} alt={t.name} fill className="object-cover object-top" sizes="80px" />
              </div>
              <p className="font-bold text-slate-900 text-sm">{t.name}</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

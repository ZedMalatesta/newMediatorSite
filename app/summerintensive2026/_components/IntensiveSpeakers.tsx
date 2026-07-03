import Image from "next/image";
import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { speakers } from "./intensive-data";

export default function IntensiveSpeakers() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Спикеры" title="Кто будет учить" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map((s) => (
            <div
              key={s.name}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-5 flex flex-col items-center text-center gap-4"
            >
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-200 shadow flex-shrink-0">
                {s.photo ? (
                  <Image src={s.photo} alt={s.name} fill className="object-cover object-top" sizes="96px" />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600 text-xl">
                    {s.initials}
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm leading-snug">{s.name}</p>
                <p className="text-amber-600 text-xs font-semibold mt-1 leading-snug">{s.role}</p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { speakers } from "./summerschool2025-data";

export default function Summerschool2025Speakers() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Спикеры"
          title="За семь лет — восемь школ и более 500 участников"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {speakers.map((s) => (
            <div
              key={s.name}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-5 flex items-center gap-4"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent-200 shadow flex-shrink-0">
                {s.photo ? (
                  <Image src={s.photo} alt={s.name} fill className="object-cover object-top" sizes="64px" />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {s.initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm leading-snug">{s.name}</p>
                <p className="text-slate-500 text-xs mt-1 leading-snug">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

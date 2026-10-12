import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { specialists } from "./counseling-data";

export default function CounselingSpecialists() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Специалисты" title="Наши психологи" align="center" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {specialists.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-accent-200 shadow mb-4">
                {s.photo ? (
                  <Image src={s.photo} alt={s.name} fill className="object-cover object-top" sizes="112px" />
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

        <div className="mt-10 text-center">
          <Link href="/team" className="text-zinc-500 font-semibold hover:text-accent-600 transition-colors text-sm">
            Резюме и контакты специалистов →
          </Link>
        </div>
      </div>
    </section>
  );
}

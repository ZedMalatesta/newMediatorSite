import Image from "next/image";
import { specialists } from "./team-data";

export default function TeamGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {specialists.map((s) => (
        <div
          key={s.name}
          className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center gap-4"
        >
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent-200 shadow flex-shrink-0">
            {s.photo ? (
              <Image src={s.photo} alt={s.name} fill className="object-cover object-top" sizes="112px" />
            ) : (
              <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600 text-2xl">
                {s.initials}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-base">{s.name}</p>
            <p className="text-accent-600 text-xs font-semibold mt-1 leading-snug">{s.role}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {s.tags.map((t) => (
              <span key={t} className="bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <ul className="space-y-2 text-left w-full">
            {s.bio.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-500 text-xs leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

import Image from "next/image";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { EventDetailsProps } from "./types";

export function EventDetails({ description, groups, speaker }: EventDetailsProps) {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {description && description.length > 0 && (
          <div className="space-y-4 mb-14">
            {description.map((p, i) => (
              <p key={i} className="text-slate-600 text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}

        {groups?.map((g) => (
          <div key={g.heading} className="mb-14">
            <SectionHeader label="Программа" title={g.heading} />
            <ul className="space-y-2.5">
              {g.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {speaker && (
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent-200 shadow-md relative">
                {speaker.photo ? (
                  <Image src={speaker.photo} alt={speaker.name} fill className="object-cover object-top" sizes="112px" />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center font-bold text-slate-600 text-2xl">
                    {speaker.initials}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{speaker.name}</h3>
              <p className="text-accent-600 font-semibold text-sm">{speaker.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

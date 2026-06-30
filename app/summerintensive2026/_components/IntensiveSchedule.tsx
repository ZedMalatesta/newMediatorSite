"use client";

import { useState } from "react";
import { SectionHeader } from "@/app/components/ui/SectionHeader/SectionHeader";
import { schedule } from "./intensive-data";

export default function IntensiveSchedule() {
  const [activeDay, setActiveDay] = useState(0);
  const day = schedule[activeDay];

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Программа" title="Расписание интенсива" align="center" />

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {schedule.map((d, i) => (
            <button
              key={d.date}
              onClick={() => setActiveDay(i)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                activeDay === i
                  ? "bg-amber-500 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300"
              }`}
            >
              {d.date} · {d.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
          {day.sessions.map((s, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4">
              <span className="flex-shrink-0 w-24 text-amber-600 font-semibold text-sm pt-0.5">
                {s.time}
              </span>
              <div className="min-w-0">
                <p className="text-slate-900 font-medium text-sm leading-snug">{s.title}</p>
                {s.speaker && <p className="text-slate-400 text-xs mt-0.5">{s.speaker}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

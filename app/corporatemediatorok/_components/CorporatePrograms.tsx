"use client";

import { useState } from "react";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import { programs } from "./corporate-data";

export default function CorporatePrograms() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Программы для руководителей"
          title="Обучающие программы"
          subtitle="Реализуются в формате тренинга: мини-лекции, разбор кейсов, работа в малых группах, дискуссии и интерактивные упражнения."
        />

        <div className="space-y-3">
          {programs.map((p, i) => (
            <div key={p.title} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{p.title}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 border-t border-slate-100 bg-slate-50">
                  <p className="pt-4 text-slate-600 text-sm leading-relaxed">{p.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { programs } from "@/app/lib/data";

type Tab = "all" | "in-person" | "online";

const tabs: { label: string; value: Tab }[] = [
  { label: "Все программы", value: "all" },
  { label: "Очно", value: "in-person" },
  { label: "Онлайн", value: "online" },
];

export default function ProgramTabs() {
  const [active, setActive] = useState<Tab>("all");

  const filtered = programs.filter((p) => {
    if (active === "all") return true;
    if (active === "in-person") return p.format === "in-person" || p.format === "both";
    if (active === "online") return p.format === "online" || p.format === "both";
    return true;
  });

  return (
    <section id="programs" className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Записаться сейчас
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Актуальные программы обучения
            </h2>
            <p className="text-slate-500 text-base">
              Справки государственного образца и практические навыки с первого дня.
            </p>
          </div>

          <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl w-fit flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  active === tab.value
                    ? "bg-zinc-200 text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                  Запись открыта
                </span>
                <span className="text-xs text-slate-400 font-medium text-right">
                  {program.format === "online"
                    ? "🌐 Онлайн"
                    : program.format === "in-person"
                    ? "🏛 Очно"
                    : "🔀 Смешанный"}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug mb-5 flex-1">
                {program.title}
              </h3>

              <ul className="space-y-2 text-sm text-slate-500 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">📅</span>
                  <span>
                    <span className="text-slate-400">Начало: </span>
                    {program.startDate}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">⏱</span>
                  <span>{program.duration}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-500">📜</span>
                  <span>{program.certificate}</span>
                </li>
              </ul>

              <button className="w-full bg-zinc-200 text-slate-800 py-2.5 rounded-lg font-semibold hover:bg-zinc-300 transition-colors text-sm border border-zinc-300">
                Подробнее
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-400 py-16">
            Программ для данного формата не найдено.
          </div>
        )}

        <div className="mt-10 text-center">
          <a href="#" className="text-zinc-500 font-semibold hover:text-amber-600 transition-colors text-sm">
            Ещё больше наших программ здесь →
          </a>
        </div>
      </div>
    </section>
  );
}

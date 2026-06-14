"use client";

import { useState } from "react";
import { programs, type ProgramFormat } from "@/lib/data";

type Tab = "all" | "in-person" | "online";

const tabs: { label: string; value: Tab }[] = [
  { label: "All Programmes", value: "all" },
  { label: "In-person", value: "in-person" },
  { label: "Online", value: "online" },
];

export default function ProgramTabs() {
  const [active, setActive] = useState<Tab>("all");

  const filtered = programs.filter((p) => {
    if (active === "all") return true;
    if (active === "in-person")
      return p.format === "in-person" || p.format === "both";
    if (active === "online")
      return p.format === "online" || p.format === "both";
    return true;
  });

  return (
    <section id="programs" className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Enroll now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Training Programmes
            </h2>
            <p className="text-slate-500 text-base">
              State-standard certificates and practical skills from day one.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl w-fit flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  active === tab.value
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:border-teal-300 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full text-xs font-semibold">
                  Enrollment open
                </span>
                <span className="text-xs text-slate-400 font-medium text-right">
                  {program.format === "online"
                    ? "🌐 Online"
                    : program.format === "in-person"
                    ? "🏛 In-person"
                    : "🔀 Hybrid"}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug mb-5 flex-1">
                {program.title}
              </h3>

              <ul className="space-y-2 text-sm text-slate-500 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">📅</span>
                  <span>
                    <span className="text-slate-400">Start: </span>
                    {program.startDate}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">⏱</span>
                  <span>{program.duration}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">📜</span>
                  <span>{program.certificate}</span>
                </li>
              </ul>

              <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-400 py-16">
            No programmes available for this format.
          </div>
        )}
      </div>
    </section>
  );
}

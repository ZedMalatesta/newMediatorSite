"use client";

import { useState } from "react";
import { programs, type ProgramFormat } from "@/lib/data";

type Tab = "all" | "in-person" | "online";

const tabs: { label: string; value: Tab }[] = [
  { label: "All Programs", value: "all" },
  { label: "In-person", value: "in-person" },
  { label: "Online", value: "online" },
];

const formatIcons: Record<string, string> = {
  "📅": "Start Date",
  "🎯": "Format",
  "⏱️": "Duration",
  "🏆": "Certificate",
};

export default function ProgramTabs() {
  const [active, setActive] = useState<Tab>("all");

  const filtered = programs.filter((p) => {
    if (active === "all") return true;
    if (active === "in-person") return p.format === "in-person" || p.format === "both";
    if (active === "online") return p.format === "online" || p.format === "both";
    return true;
  });

  return (
    <section id="programs" className="px-4 py-16 md:py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Professional Certification Programs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Specialized training designed for professionals seeking real growth
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl w-fit mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                active === tab.value
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-zinc-700 rounded-xl p-6 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-block bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-xs font-semibold">
                  Enrollment Open
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {program.format === "online"
                    ? "🌐 Online"
                    : program.format === "in-person"
                    ? "🏛 In-person"
                    : "🔀 Hybrid"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex-1">
                {program.title}
              </h3>

              <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    <span className="text-gray-400 dark:text-gray-500">Start: </span>
                    {program.startDate}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{program.duration}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🏆</span>
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
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No programs found for this format.
          </p>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { cities } from "./divorce-data";

export default function DivorcePricing() {
  const [active, setActive] = useState(0);
  const city = cities[active];

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Прайс-лист
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Стоимость услуг в {city.label}
          </h2>
          <p className="text-slate-400 text-sm">Указанные цены носят справочный характер</p>
        </div>

        <div className="flex gap-1 bg-white border border-slate-200 p-1 rounded-xl w-fit mb-10">
          {cities.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                active === i ? "bg-zinc-200 text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
          {city.rows.map((row, i) => (
            <div
              key={row.service}
              className={`flex items-center justify-between gap-3 px-6 py-4 ${
                i !== city.rows.length - 1 ? "border-b border-slate-100" : ""
              } ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
            >
              <p className="text-slate-700 text-sm">{row.service}</p>
              <span className="inline-block bg-accent-50 border border-accent-200 text-accent-800 font-bold text-sm px-4 py-1.5 rounded-lg whitespace-nowrap">
                {row.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 bg-accent-50 border border-accent-200 rounded-xl px-6 py-4">
          <p className="text-accent-800 text-sm font-medium">Полная стоимость пакета</p>
          <p className="text-accent-900 font-bold whitespace-nowrap">{city.total}</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

type PricingRow = {
  service: string;
  detail: string;
  price: string;
};

const MINSK: PricingRow[] = [
  {
    service: "Услуги семейного медиатора",
    detail: "1 медиация + составление медиативного соглашения. Каждая дополнительная встреча — 2 баз.вел. Информационная встреча — бесплатно.",
    price: "от 300 бел.руб.",
  },
  {
    service: "Консультация психолога для супружеской пары",
    detail: "1 консультация",
    price: "от 120 бел.руб.",
  },
  {
    service: "Консультация психолога индивидуальная",
    detail: "1 консультация",
    price: "от 75 бел.руб.",
  },
  {
    service: "Адвокат",
    detail: "1 консультация",
    price: "от 240 бел.руб.",
  },
  {
    service: "Нотариус",
    detail: "1 консультация",
    price: "1 баз.вел.",
  },
  {
    service: "Нотариус — оформление брачного договора",
    detail: "Полное оформление",
    price: "6 баз.вел.",
  },
];

const GRODNO: PricingRow[] = [
  {
    service: "Услуги семейного медиатора",
    detail: "1 медиация + составление медиативного соглашения. Каждая дополнительная встреча — 1,5 баз.вел. Информационная встреча — бесплатно.",
    price: "от 200 бел.руб.",
  },
  {
    service: "Консультация психолога для супружеской пары",
    detail: "1 консультация",
    price: "от 100 бел.руб.",
  },
  {
    service: "Консультация психолога индивидуальная",
    detail: "1 консультация",
    price: "от 50 бел.руб.",
  },
  {
    service: "Адвокат",
    detail: "1 консультация",
    price: "от 120 бел.руб.",
  },
  {
    service: "Нотариус",
    detail: "1 консультация",
    price: "1 баз.вел.",
  },
  {
    service: "Нотариус — оформление брачного договора",
    detail: "Полное оформление",
    price: "6 баз.вел.",
  },
];

const CITIES = [
  { label: "Минск", rows: MINSK },
  { label: "Гродно и Лида", rows: GRODNO },
];

export default function PricingSection() {
  const [active, setActive] = useState(0);
  const rows = CITIES[active].rows;

  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Стоимость услуг
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Стоимость услуг в {CITIES[active].label}
          </h2>
          <p className="text-slate-400 text-sm">
            Указанные цены носят справочный характер
          </p>
        </div>

        {/* City tabs */}
        <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl w-fit mb-10">
          {CITIES.map((city, i) => (
            <button
              key={city.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                active === i
                  ? "bg-zinc-200 text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>

        {/* Pricing table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 ${
                i !== rows.length - 1 ? "border-b border-slate-100" : ""
              } ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
            >
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm mb-0.5">{row.service}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{row.detail}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-block bg-accent-50 border border-accent-200 text-accent-800 font-bold text-sm px-4 py-1.5 rounded-lg whitespace-nowrap">
                  {row.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

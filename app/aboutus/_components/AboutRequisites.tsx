"use client";

import { useState } from "react";
import Image from "next/image";

const requisites = [
  { label: "Организация", value: "УПУ «МедиаторОк Проф»" },
  { label: "Адрес", value: "Республика Беларусь, 231300 г. Лида, пр. Победы, 116/а оф 4С" },
  { label: "Расчётный счёт", value: "BY43 ALFA 3015 2В01 8400 1027 0000" },
  { label: "Банк", value: "ЗАО «АЛЬФА-БАНК», г. Минск, ул. Сурганова, 43-47" },
  { label: "SWIFT", value: "ALFABY2X" },
  { label: "УНП", value: "591384839" },
  { label: "Email", value: "mediatorOk.by@gmail.com" },
  { label: "Сайт", value: "www.mediatorOk.by" },
  { label: "Телефон", value: "+375 29 867-82-40" },
];

export default function AboutRequisites() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Юридическая информация
          </p>
          <h2 className="text-3xl font-bold text-slate-900">Наши реквизиты</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Requisites table */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {requisites.map((r, i) => (
              <div
                key={r.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 px-6 py-4 ${
                  i !== requisites.length - 1 ? "border-b border-slate-100" : ""
                } ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider w-36 flex-shrink-0">
                  {r.label}
                </span>
                <span className="text-slate-800 text-sm font-medium">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Registration certificate */}
          <div className="flex-shrink-0 w-full lg:w-64">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
              Свидетельство о регистрации
            </p>
            <button
              onClick={() => setOpen(true)}
              className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md w-full aspect-[3/4] group cursor-zoom-in block"
              aria-label="Открыть свидетельство о регистрации"
            >
              <Image
                src="/images/about/register.webp"
                alt="Свидетельство о государственной регистрации МедиаторОк"
                fill
                className="object-cover"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                  Открыть
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/images/about/register.webp"
              alt="Свидетельство о государственной регистрации МедиаторОк"
              width={600}
              height={800}
              className="w-full h-auto"
              priority
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 bg-white text-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors font-bold text-lg leading-none"
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

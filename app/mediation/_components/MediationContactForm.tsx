"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  "Услуги семейного медиатора",
  "Консультация психолога для пары",
  "Консультация психолога индивидуальная",
  "Консультация адвоката",
  "Консультация нотариуса",
  "Нотариус — оформление брачного договора",
];

export default function MediationContactForm() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (option: string) =>
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );

  return (
    <section className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Записаться
          </p>
          <h2 className="text-3xl font-bold mb-2">Оставьте свои данные для связи</h2>
          <p className="text-slate-400">
            Мы свяжемся с вами в течение одного рабочего дня и подберём удобное время.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Ваш Email"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
              />
            </div>
            <input
              type="tel"
              placeholder="Ваш телефон"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
            />

            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">
                Какие услуги Вас интересуют?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      onClick={() => toggle(opt)}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                        selected.includes(opt)
                          ? "bg-accent-500 border-accent-500"
                          : "border-slate-500 group-hover:border-accent-400"
                      }`}
                    >
                      {selected.includes(opt) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      onClick={() => toggle(opt)}
                      className="text-sm text-slate-300 group-hover:text-white transition-colors leading-snug"
                    >
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              Отправить
            </button>
            <p className="text-slate-500 text-xs text-center">
              Заполняя данную форму, вы соглашаетесь с политикой обработки персональных данных.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

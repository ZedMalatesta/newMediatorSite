"use client";

import { EventSignupProps } from "./types";

export function EventSignup({
  title = "Заполните заявку",
  subtitle = "Мы свяжемся с вами и ответим на все вопросы.",
  submitLabel = "Отправить заявку",
}: EventSignupProps) {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">Записаться</p>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            <textarea
              placeholder="Ваш вопрос или комментарий (необязательно)"
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              {submitLabel}
            </button>
            <p className="text-slate-500 text-xs text-center">
              Отправляя данную форму, вы соглашаетесь с политикой обработки персональных данных.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

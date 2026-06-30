"use client";

import { contactMethods, officeAddress, organizers, participationFormats } from "./intensive-data";

const inputClass =
  "w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors";

export default function IntensiveSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Регистрация
          </p>
          <h2 className="text-3xl font-bold mb-2">Зарегистрироваться на интенсив</h2>
          <p className="text-slate-400">
            Заполните форму — мы свяжемся с вами и поможем выбрать формат участия.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-amber-500/20">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" required placeholder="Электронная почта*" className={inputClass} />
              <input
                type="tel"
                required
                placeholder="Телефон с кодом страны, например +375 29*"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" required placeholder="ФИО*" className={inputClass} />
              <input type="text" required placeholder="Город*" className={inputClass} />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">
                Какой формат участия Вам подходит?*
              </label>
              <select required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Выберите формат
                </option>
                {participationFormats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Как с Вами можно связаться?</label>
              <div className="flex flex-wrap gap-4">
                {contactMethods.map((m) => (
                  <label key={m} className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="checkbox" className="accent-amber-500 w-4 h-4" />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">
                Вам необходим трансфер из Минска до места проведения?*
              </label>
              <div className="flex gap-6">
                {["Да", "Нет"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="radio" name="transfer" required className="accent-amber-500 w-4 h-4" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Ваши комментарии и вопросы"
              rows={3}
              className={`${inputClass} resize-none`}
            />

            <label className="flex items-start gap-2.5 text-slate-400 text-xs">
              <input type="checkbox" required className="accent-amber-500 w-4 h-4 mt-0.5" />
              Согласен с условиями{" "}
              <a href="#" className="text-amber-400 hover:underline">
                политики обработки персональных данных
              </a>
            </label>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {organizers.map((o) => (
            <a
              key={o.name}
              href={o.href}
              className="flex items-center justify-between gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 hover:border-amber-400 transition-colors"
            >
              <span className="text-slate-300 text-sm">{o.name}</span>
              <span className="text-amber-400 text-sm font-semibold whitespace-nowrap">{o.phone}</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-slate-500 text-sm text-center">{officeAddress}</p>
      </div>
    </section>
  );
}

"use client";

export default function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Ваше имя"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
      />
      <input
        type="tel"
        placeholder="Номер телефона"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
      />
      <input
        type="email"
        placeholder="Адрес электронной почты"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
      />
      <button
        type="submit"
        className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
      >
        Отправить
      </button>
      <p className="text-slate-500 text-xs text-center">
        Отправляя данную форму, вы соглашаетесь с политикой обработки
        персональных данных.
      </p>
    </form>
  );
}

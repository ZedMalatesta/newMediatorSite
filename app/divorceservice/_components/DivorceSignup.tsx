"use client";

export default function DivorceSignup() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Бесплатная консультация
          </p>
          <h2 className="text-3xl font-bold mb-2">Оставьте свои данные для связи</h2>
          <p className="text-slate-400">
            Расскажем о пакете услуг и подберём специалистов под вашу ситуацию.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-amber-500/20">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Город"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Ваш Email"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              <input
                type="tel"
                placeholder="Ваш телефон"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Получить консультацию
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

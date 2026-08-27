const cards = [
  {
    title: "Я — медиатор!",
    description: "Присоединяйтесь к сообществу экспертов и помогайте сторонам находить решения.",
    cta: "Присоединиться",
  },
  {
    title: "Я — сторона спора!",
    description: "Если вам нужны переговоры или медиация — мы поможем найти переговорщика.",
    cta: "Обратиться за помощью",
  },
];

export default function FordialogueCta() {
  return (
    <section id="signup" className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Присоединяйтесь
          </p>
          <h2 className="text-3xl font-bold mb-2">Кто вы в этом диалоге?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {cards.map((c) => (
            <div key={c.title} className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20 text-center">
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.description}</p>
              <a
                href="mailto:mediatorok.by@gmail.com"
                className="inline-block bg-accent-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-accent-400 transition-colors text-sm"
              >
                {c.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-slate-500 text-sm text-center">
          Контакт инициативы: Алексей Усенко (Беларусь) и Eastern European Association for Civic Education
        </p>
      </div>
    </section>
  );
}

const results = [
  {
    value: "7",
    label: "Школ медиаторов",
    description:
      "Мы провели 7 Школ медиаторов, в которых приняли участие более 200 слушателей из Беларуси, Украины, России, США, Израиля, Германии и других стран.",
  },
  {
    value: "150+",
    label: "Вебинаров",
    description:
      "Мы провели более 150 вебинаров для психологов, медиаторов, юристов, адвокатов, психотерапевтов, врачей, педагогов, социальных работников и других специалистов.",
  },
  {
    value: "20",
    label: "Групп медиаторов",
    description:
      "Мы выпустили уже более 20 групп профессиональных медиаторов в г. Минске и г. Гродно.",
  },
  {
    value: "2",
    label: "Серии метафорических карт",
    description:
      "Мы издали метафорические ассоциативные карты «Семейные ценности» и «Корпоративные ценности».",
  },
];

export default function AboutStats() {
  return (
    <section className="px-4 py-16 md:py-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Наши достижения
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Результаты, которые нас порадовали
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((r) => (
            <div key={r.label} className="border-t-2 border-amber-400 pt-6">
              <div className="text-4xl font-bold text-amber-400 mb-2">{r.value}</div>
              <div className="font-semibold text-white mb-3">{r.label}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

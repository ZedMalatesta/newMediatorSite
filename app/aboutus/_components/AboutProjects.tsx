const projects = [
  {
    num: "01",
    title: "Обучение медиации",
    description:
      "Мы проводим обучение восстановительной и трансформативной медиации.",
  },
  {
    num: "02",
    title: "Школа медиаторов",
    description:
      "Мы обучаем специалистов искусству медиации и диалога, предлагаем освоить новый опыт и расширить и укрепить профессиональные навыки и связи.",
  },
  {
    num: "03",
    title: "Школа юного медиатора",
    description:
      "Мы проводим программы, в которых обучаем подростков взаимопониманию и сотрудничеству в конфликтах.",
  },
];

export default function AboutProjects() {
  return (
    <section className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Наша деятельность
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            У нас работают проекты
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.num}
              className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all"
            >
              <div className="text-5xl font-bold text-amber-200 group-hover:text-amber-300 transition-colors mb-6 leading-none">
                {p.num}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

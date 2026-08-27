import Image from "next/image";

export default function NegotiationHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/services/training.jpg"
          alt="Лига переговорщиков «Мастерская диалога»"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-accent-900/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Проект Оксаны Шульги
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Лига переговорщиков «Мастерская диалога»
        </h1>
        <p className="text-slate-300 text-xl mb-8 max-w-xl">
          Серия тренингов и обучающих программ по переговорам на основе
          диалогической модели взаимодействия.
        </p>

        <a
          href="#signup"
          className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
        >
          Заполнить заявку
        </a>
      </div>
    </section>
  );
}

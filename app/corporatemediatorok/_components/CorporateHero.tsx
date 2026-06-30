import Image from "next/image";

export default function CorporateHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/services/corporate-training.jpg"
          alt="Корпоративное обучение"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Для компаний
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Корпоративное обучение
        </h1>
        <p className="text-slate-300 text-xl mb-8 max-w-xl">
          Достигайте бизнес-целей вместе с нами — система подготовки персонала,
          разработанная под задачи вашей компании.
        </p>

        <a
          href="#signup"
          className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          Оставить заявку
        </a>
      </div>
    </section>
  );
}

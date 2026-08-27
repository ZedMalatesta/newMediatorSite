import Image from "next/image";

export default function SchoolHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/services/kids-school.jpg"
          alt="Школа юного медиатора «Территория взаимопонимания»"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-accent-900/65" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Для детей и подростков 10–16 лет
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Школа юного медиатора «Территория взаимопонимания»
        </h1>
        <p className="text-slate-300 text-xl mb-8 max-w-xl">
          Приглашаем детей и подростков в увлекательное приключение — стать
          профессиональными примирителями в разрешении любых конфликтов.
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

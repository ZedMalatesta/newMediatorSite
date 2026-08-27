import Image from "next/image";
import { concerns } from "./counseling-data";

export default function CounselingHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/services/family-therapy.jpg"
          alt="Психологическое консультирование"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-accent-900/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Услуга
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          Психологическое консультирование
        </h1>
        <p className="text-slate-300 text-xl mb-8 max-w-xl">
          Психологическое благополучие — основа гармоничной и осознанной жизни.
        </p>

        <div className="flex flex-wrap gap-3 mb-8 max-w-2xl">
          {concerns.map((c) => (
            <span
              key={c}
              className="bg-white/10 border border-white/20 text-slate-200 text-sm px-4 py-2 rounded-lg"
            >
              {c}
            </span>
          ))}
        </div>

        <a
          href="#signup"
          className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
        >
          Оставить заявку
        </a>
      </div>
    </section>
  );
}

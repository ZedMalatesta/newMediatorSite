import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden min-h-[420px] flex items-end">
      <div className="absolute inset-0">
        <Image
          src="/images/about/team-photo.jpg"
          alt="Команда МедиаторОк Проф"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
          Об учреждении
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
          О нас
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
          Давайте познакомим вас с нашей миссией, историей и уже достигнутыми успехами!
        </p>
      </div>
    </section>
  );
}

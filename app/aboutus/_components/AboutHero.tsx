export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden min-h-[420px] flex items-end">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
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

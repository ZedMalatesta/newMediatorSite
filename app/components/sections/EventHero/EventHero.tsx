import Image from "next/image";
import { EventHeroProps } from "./types";

export function EventHero({
  eyebrow,
  title,
  subtitle,
  meta,
  ctaLabel = "Заполнить заявку",
  ctaHref = "#signup",
  imageSrc,
}: EventHeroProps) {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0">
          <Image src={imageSrc} alt={title} fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0 bg-accent-900/75" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">{title}</h1>
        {subtitle && <p className="text-slate-300 text-xl mb-8 max-w-xl">{subtitle}</p>}

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {ctaLabel && (
            <a
              href={ctaHref}
              className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              {ctaLabel}
            </a>
          )}
          {meta && meta.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {meta.map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2 text-slate-300 text-sm bg-white/10 px-5 py-3 rounded-lg border border-white/20"
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

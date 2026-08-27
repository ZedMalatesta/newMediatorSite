import Image from "next/image";
import { services } from "@/app/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-accent-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Что мы предлагаем
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Наши услуги
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            Полный спектр профессиональных услуг в области медиации и обучения
            для частных лиц, семей и организаций.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="group bg-slate-50 hover:bg-white border border-transparent hover:border-accent-200 hover:shadow-md p-6 rounded-xl transition-all"
            >
              <div className="mb-4">
                <Image
                  src={service.iconSrc}
                  alt={service.name}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-zinc-500 transition-colors">
                {service.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href={service.href}
                className="text-zinc-500 text-sm font-semibold hover:text-accent-600 transition-colors"
              >
                Подробнее →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

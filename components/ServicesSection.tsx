import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-3">
            What we offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Our Services
          </h2>
          <p className="text-slate-500 text-base max-w-xl">
            A full range of professional mediation and training services for
            individuals, families, and organisations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="group bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md p-6 rounded-xl transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-teal-700 transition-colors">
                {service.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

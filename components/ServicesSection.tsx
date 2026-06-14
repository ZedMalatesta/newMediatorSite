import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="px-4 py-16 md:py-24 bg-gray-50 dark:bg-zinc-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All Specializations
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
          Explore our comprehensive range of professional services and training
          areas
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <a
              key={service.name}
              href="#"
              className="group bg-white dark:bg-zinc-700 p-6 rounded-lg hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.name}
              </h3>
            </a>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="#programs"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explore All Programs
          </a>
        </div>
      </div>
    </section>
  );
}

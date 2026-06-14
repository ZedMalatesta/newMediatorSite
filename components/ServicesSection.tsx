import { services } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section id="directions" className="px-4 py-16 md:py-20 bg-gray-50 dark:bg-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              All Directions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Explore our comprehensive range of professional specializations
            </p>
          </div>
          <a
            href="#"
            className="hidden sm:inline-block text-teal-600 dark:text-teal-400 font-semibold text-sm hover:underline"
          >
            View all →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <a
              key={service.name}
              href="#"
              className="group bg-white dark:bg-zinc-700 p-6 rounded-xl hover:shadow-md hover:border-teal-300 dark:hover:border-teal-600 border border-transparent transition-all text-center"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm md:text-base">
                {service.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

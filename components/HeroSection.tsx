import { stats } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-zinc-800 dark:to-zinc-900 px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Additional Professional Education
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Professional Mediation &{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Conflict Resolution
            </span>{" "}
            Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            We train professionals in mediation, conflict resolution, and
            leadership through evidence-based programs designed for real-world
            impact.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-10">
            Following the best traditions of professional practice and continuous
            innovation!
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#programs"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Explore All Programs
            </a>
            <a
              href="#footer"
              className="inline-block border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-zinc-700 text-center"
            >
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { programs } from "@/lib/data";

export default function ProgramsSection() {
  return (
    <section id="programs" className="px-4 py-16 md:py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Certification Programs
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
          Enhance your expertise with our specialized training programs designed
          for professionals and organizations seeking continuous development.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Enrollment Open
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {program.title}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">📅</span>
                  <span>Start Date: {program.startDate}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🎯</span>
                  <span>Format: {program.format}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">⏱️</span>
                  <span>Duration: {program.duration}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🏆</span>
                  <span>{program.certificate}</span>
                </li>
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

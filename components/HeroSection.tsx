export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-900 px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Professional Mediation & Conflict Resolution Services
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          Comprehensive training programs for professionals seeking to master
          mediation, conflict resolution, and professional development.
          Established with a commitment to excellence and practical expertise.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We offer modern, evidence-based training following the best traditions
          of professional practice and continuous innovation!
        </p>
        <a
          href="#programs"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Explore All Programs
        </a>
      </div>
    </section>
  );
}

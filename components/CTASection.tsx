export default function CTASection() {
  return (
    <section className="bg-teal-600 dark:bg-teal-800 text-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Advance Your Career?
        </h2>
        <p className="text-lg mb-8 text-teal-100">
          Join our community of professionals committed to excellence and
          continuous growth. New cohort starts August 2026.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#programs"
            className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            Start Your Journey Today
          </a>
          <a
            href="#footer"
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 dark:hover:bg-teal-900 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

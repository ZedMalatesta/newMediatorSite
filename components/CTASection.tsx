export default function CTASection() {
  return (
    <section className="bg-blue-600 dark:bg-blue-900 text-white px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
        <p className="text-lg mb-8 text-blue-100">
          Join our community of professionals committed to excellence and
          continuous growth.
        </p>
        <a
          href="#programs"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Start Your Journey Today
        </a>
      </div>
    </section>
  );
}

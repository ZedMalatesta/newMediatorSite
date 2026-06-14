"use client";

export default function ContactForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Your name"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 transition-colors"
      />
      <input
        type="tel"
        placeholder="Phone number"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 transition-colors"
      />
      <input
        type="email"
        placeholder="Email address"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 transition-colors"
      />
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-500 transition-colors"
      >
        Book a Free Consultation
      </button>
      <p className="text-slate-500 text-xs text-center">
        By submitting you agree to our privacy policy.
      </p>
    </form>
  );
}

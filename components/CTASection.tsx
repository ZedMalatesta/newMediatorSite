import { telegramBenefits } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export default function CTASection() {
  return (
    <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Telegram CTA */}
          <div>
            <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Stay connected
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Join our Telegram channel
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Get useful content, free events, professional literature, and
              exclusive training announcements — all in one place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {telegramBenefits.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">
                      {b.title}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">
                      {b.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-500 transition-colors"
            >
              Join Telegram Channel →
            </a>
          </div>

          {/* Consultation CTA */}
          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Leave your contact details and we will get back to you within one
              business day.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

import { telegramBenefits } from "@/app/lib/data";
import ContactForm from "./ContactForm";

export default function CTASection() {
  return (
    <section className="bg-slate-900 text-white px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Telegram */}
          <div>
            <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Оставайтесь на связи
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Присоединяйтесь к телеграм-каналу
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Полезный контент, бесплатные мероприятия, профессиональная
              литература и анонсы обучения — всё в одном месте.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {telegramBenefits.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">{b.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://t.me/MediatorOK"
              className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              Подписаться в телеграм →
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-accent-500/20">
            <h3 className="text-xl font-bold mb-1">Готовы начать?</h3>
            <p className="text-slate-400 text-sm mb-6">
              Оставьте свои данные для связи — мы ответим в течение одного
              рабочего дня.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Спасибо за заявку | МедиаторОк Проф",
  description: "Заявка успешно отправлена.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <section className="px-4 py-24 md:py-32 bg-white text-center">
          <div className="max-w-xl mx-auto">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-600 mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Спасибо!</h1>
            <p className="text-slate-600 text-base leading-relaxed mb-2">
              Остался последний шаг: завершите регистрацию в Telegram, чтобы получить ссылку на занятие.
            </p>
            <a
              href="https://t.me/MediatorOK"
              className="inline-block mt-6 bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
            >
              Перейти в Telegram
            </a>
          </div>
        </section>
        <PageBlocks page="thankyou" />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/logowebinars") },
  openGraph: { url: absoluteUrl("/logowebinars") },
  title: "Вебинары Центра логотерапии",
  description:
    "Бесплатные образовательные вебинары на основе подхода Виктора Франкла: стремление к смыслу — главная мотивационная сила человека.",
};

const items = [
  {
    title: "Логотерапия и экзистенциальный подход в консультировании",
    description: "Полная программа: 128 часов, 3 месяца.",
    href: "/logotherapy",
  },
  {
    title: "Конфликты в эпоху неопределённости",
    description: "Семинар, 250 BYN / 7 000 RUB.",
    href: "/workshopuncertainty",
  },
];

export default function LogoWebinarsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Центр логотерапии «МедиаторОк Проф»"
          title="Вебинары Центра логотерапии"
          subtitle="Стремление к смыслу — главная мотивационная сила человека (Виктор Франкл)."
          ctaLabel=""
          imageSrc="/images/shared/asset-6.jpg"
        />
        <section className="px-4 py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="Ближайшие события" title="Программы Центра логотерапии" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {items.map((i) => (
                <a
                  key={i.title}
                  href={i.href}
                  className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-accent-300 hover:shadow-md transition-all"
                >
                  <p className="font-bold text-slate-900 text-sm mb-2">{i.title}</p>
                  <p className="text-slate-500 text-xs mb-3">{i.description}</p>
                  <span className="text-accent-600 text-xs font-semibold">Подробнее →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <PageBlocks page="logowebinars" />
      </main>
      <Footer />
    </div>
  );
}

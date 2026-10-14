import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { SectionHeader } from "@ui/SectionHeader/SectionHeader";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/trening2024") },
  openGraph: { url: absoluteUrl("/trening2024") },
  title: "Тренинги на каникулах",
  description:
    "Серия очных и онлайн тренингов в январе: «Провокативная медиация», «Нарративная медиация», «Трансформативная медиация» и практические сессии медиации.",
};

const trainings = [
  { title: "Провокативная медиация", href: "/provocativemediation" },
  { title: "Нарративная медиация", href: "/narrativemediation" },
  { title: "Трансформативная медиация", href: "/transformativemediation" },
];

export default function Trening2024Page() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Январь, Минск и Гродно"
          title="Тренинги на каникулах"
          subtitle="Серия очных и онлайн тренингов: 150 BYN за один день, 250 BYN за два дня."
          ctaLabel=""
          imageSrc="/images/pages/trening2024/11-image.jpg"
        />
        <section className="px-4 py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader label="Программа" title="Три тренинга и практические сессии" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {trainings.map((t) => (
                <a
                  key={t.title}
                  href={t.href}
                  className="bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-accent-300 hover:shadow-md transition-all"
                >
                  <p className="font-bold text-slate-900 text-sm mb-2">{t.title}</p>
                  <span className="text-accent-600 text-xs font-semibold">Подробнее →</span>
                </a>
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Дополнительно — практические сессии медиации с супервизией. Ведущая всех
              тренингов — Оксана Шульга, кандидат психологических наук, медиатор. Для
              медиаторов, психологов, коучей, педагогов, социальных работников и врачей.
            </p>
          </div>
        </section>
        <PageBlocks page="trening2024" />
      </main>
      <Footer />
    </div>
  );
}

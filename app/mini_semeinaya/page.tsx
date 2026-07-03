import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Семейная медиация как технология разрешения семейных кризисов | МедиаторОк Проф",
  description:
    "Вводное знакомство с курсом семейной медиации: алгоритмы и техники эффективного консультирования. Набор группы открыт.",
};

export default function MiniSemeinayaPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вводное занятие"
          title="Семейная медиация как технология разрешения семейных кризисов"
          subtitle="Идёт набор первого потока — регистрация продлена до 1 мая."
          ctaLabel="Записаться на вводное занятие"
        />
        <EventDetails
          description={[
            "Знакомство с программой обучения для будущих медиаторов и специалистов по разрешению конфликтов: алгоритмы и техники эффективного консультирования.",
          ]}
          groups={[
            {
              heading: "Что вы узнаете",
              items: ["Принципы эффективного консультирования", "Алгоритмы консультации", "Базовые навыки семейной медиации"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}

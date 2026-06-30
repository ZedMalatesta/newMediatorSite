import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Английский для психологов | МедиаторОк Проф",
  description:
    "Специализированный курс английского для психологов: разговорные навыки и терминология консультирования. 96 часов, по вторникам.",
};

export default function EnglishForPsychologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Онлайн-курс"
          title="Английский для психологов"
          subtitle="96 часов. Вторники, 11:00–12:30 (MSK)."
          meta={["200 BYN / 6 000 RUB в месяц"]}
        />
        <EventDetails
          description={[
            "Курс сочетает разговорные навыки с терминологией консультирования: 12 модулей о профессиональной коммуникации, активном слушании и работе с семьями, детьми и кризисными ситуациями.",
          ]}
          groups={[
            {
              heading: "Формат",
              items: ["Telegram-клуб для самостоятельных материалов", "Групповые занятия по Zoom по уровню владения языком (A1–A2 или B1–B2)"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Психолог, уровень английского C1",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Тренинг «Нарративная медиация» | МедиаторОк Проф",
  description:
    "Метод разрешения конфликтов, основанный на том, как люди выстраивают и описывают противоречия в своей ситуации. Воскресенье, 11:00–18:00, онлайн.",
};

export default function NarrativeMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Тренинг"
          title="Нарративная медиация"
          subtitle="Воскресенье, 11:00–18:00, 12 академических часов, онлайн по Zoom."
          meta={["240 BYN"]}
        />
        <EventDetails
          description={[
            "Метод разрешения конфликтов, основанный на том, как люди выстраивают и описывают противоречия в своей ситуации.",
          ]}
          groups={[
            {
              heading: "Темы тренинга",
              items: ["Структура конфликта", "Нарративные техники", "Практическое применение и стратегии расширения возможностей"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, семейный системный психолог, медиатор",
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

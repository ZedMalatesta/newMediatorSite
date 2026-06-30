import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Тренинг «Трансформативная медиация» | МедиаторОк Проф",
  description:
    "Теория и практика трансформативного подхода к разрешению конфликтов. Очно в Минске или онлайн по Zoom, 11:00–18:00.",
};

export default function TransformativeMediationPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Тренинг"
          title="Трансформативная медиация"
          subtitle="Очно в Минске или онлайн по Zoom, 11:00–18:00 (7 часов)."
          meta={["240 BYN"]}
        />
        <EventDetails
          description={["Теория и практика трансформативного подхода к разрешению конфликтов."]}
          groups={[
            {
              heading: "Для кого",
              items: ["Медиаторы, психологи, коучи, социальные работники, педагоги, врачи"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Психолог, медиатор, специалист по семейным системам",
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

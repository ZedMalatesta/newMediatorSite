import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Клинические аспекты функционирования личности | МедиаторОк Проф",
  description:
    "Онлайн-лекторий об уровнях функционирования личности: пограничный, нарциссический, мазохистический, параноидно-депрессивный, шизоидный, диссоциативный, истерический типы.",
};

export default function ClinicalAspectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Лекторий"
          title="Клинические аспекты функционирования личности"
          subtitle="7 встреч, 36 часов. Пятницы, 20:00–21:00 по Zoom."
          meta={["50 BYN за лекцию", "350 BYN за курс целиком"]}
        />
        <EventDetails
          description={[
            "Практические знания об уровнях функционирования личности для психологов, социальных работников, медиаторов и юристов.",
          ]}
          groups={[
            {
              heading: "Ведущие",
              items: ["Елена Костюченко — психолог", "Оксана Шульга — психолог, медиатор"],
            },
          ]}
        />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}

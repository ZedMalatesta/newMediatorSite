import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Практическая конфликтология: навыки для жизни, работы и любви | МедиаторОк Проф",
  description:
    "Записанный курс конструктивного разрешения конфликтов в личных и рабочих отношениях: управление эмоциями, навыки коммуникации, современные технологии разрешения споров.",
};

export default function PracticalConflictologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Курс"
          title="Практическая конфликтология: навыки для жизни, работы и любви"
          subtitle="6 видеолекций + 2 онлайн-встречи. Будни, 19:00–21:00."
          meta={["Старт: 1 июня", "400 BYN"]}
        />
        <EventDetails
          description={["Курс подойдёт всем, кто хочет развить навыки управления конфликтами в личной и профессиональной жизни."]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, системный семейный психолог, медиатор",
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

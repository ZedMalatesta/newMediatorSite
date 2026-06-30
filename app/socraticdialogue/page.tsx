import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Сократический диалог в работе медиатора | МедиаторОк Проф",
  description:
    "Онлайн-вебинар об искусстве вопросов как ключевом инструменте медиатора для разрешения конфликтов и достижения договорённостей.",
};

export default function SocraticDialoguePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вебинар"
          title="Сократический диалог в работе медиатора"
          subtitle="ZOOM, 19:00–21:00."
          meta={["55 BYN", "40 BYN для выпускников"]}
        />
        <EventDetails
          description={["Вебинар для медиаторов, переговорщиков, психологов, педагогов, врачей, бизнесменов, юристов и родителей."]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, семейный психолог, медиатор, конфликтолог",
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

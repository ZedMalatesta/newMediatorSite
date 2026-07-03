import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Семинар «Конфликты в эпоху неопределённости» | МедиаторОк Проф",
  description:
    "Интерактивный 6-часовой семинар об управлении конфликтами в нестабильных условиях: модели VUCA/BANI и техники переговоров.",
};

export default function WorkshopUncertaintyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Семинар"
          title="Конфликты в эпоху неопределённости"
          subtitle="ул. Мельникайте 8а, офис 3/2, Минск, 11:00."
          meta={["250 BYN / 7 000 RUB"]}
        />
        <EventDetails
          description={[
            "Интерактивный семинар, сочетающий лекции, разбор кейсов и практические упражнения по управлению конфликтами в нестабильных условиях.",
          ]}
          groups={[
            {
              heading: "Что разберём",
              items: ["Модели VUCA и BANI", "Техники переговоров в условиях неопределённости", "Практические инструменты анализа конфликтов"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Кандидат психологических наук, специалист по разрешению конфликтов, бизнес-тренер",
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

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";
import { EventSignup } from "@sections/EventSignup/EventSignup";

export const metadata: Metadata = {
  title: "Переговоры на шпильках | МедиаторОк Проф",
  description:
    "Женский профессиональный клуб переговоров: стратегии переговоров, лидерство, публичные выступления, деловой стиль и нетворкинг.",
};

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Женский клуб"
          title="Переговоры на шпильках"
          subtitle="Онлайн и офлайн сообщество для женщин, развивающих переговорные навыки."
          meta={["35 BYN в месяц"]}
          ctaLabel="Вступить в клуб"
        />
        <EventDetails
          description={[
            "Сообщество для профессиональных женщин, развивающих переговорные навыки, деловую хватку и личностный рост в кругу единомышленниц.",
          ]}
          groups={[
            {
              heading: "Чем занимаемся",
              items: ["Стратегии переговоров", "Женское лидерство", "Публичные выступления", "Деловой стиль и конфликт-менеджмент"],
            },
          ]}
          speaker={{
            name: "Оксана Шульга",
            role: "Психолог, семейный медиатор, специалист по разрешению конфликтов",
            photo: "/images/experts/shulga.jpg",
            initials: "ОШ",
          }}
        />
        <EventSignup title="Вступить в клуб" submitLabel="Вступить за 35 BYN" />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";

export const metadata: Metadata = {
  title: "Весенняя школа медиаторов 2023 | МедиаторОк Проф",
  description:
    "Архив Весенней школы медиаторов 2023: 17–19 марта, г.п. Сопоцкин. Кризисная медиация, восстановительные практики, профессиональное развитие.",
};

export default function SpringSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Прошедшее мероприятие"
          title="Весенняя школа медиаторов 2023"
          subtitle="17–19 марта 2023 г., г.п. Сопоцкин, ул. Теолинская 39 — Епархиальный Дом милосердия «Каритас»."
          ctaLabel="Смотреть интенсив 2026"
          ctaHref="/summerintensive2026"
        />
        <EventDetails
          description={[
            "Спикеры: Татьяна Билык (международный медиатор и тренер), Оксана Шульга, Станислав Ботвин (практикующий медиатор и юрист).",
          ]}
          groups={[
            {
              heading: "Темы школы",
              items: ["Кризисная медиация", "Восстановительные практики", "Профессиональное развитие медиатора"],
            },
            {
              heading: "Стоимость (для справки)",
              items: ["Участие: 250–400 BYN", "С проживанием: 460 BYN", "Полный пакет: 580 BYN", "Онлайн: 250 BYN"],
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventDetails } from "@sections/EventDetails/EventDetails";

export const metadata: Metadata = {
  title: "Летняя школа медиаторов 2023 | МедиаторОк Проф",
  description:
    "Архив Летней школы медиаторов 2023: 4–7 августа, г.п. Сопоцкин, Гродненская область. Спикеры, программа, итоги.",
};

export default function SummerSchool2023Page() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Прошедшее мероприятие"
          title="Летняя школа медиаторов 2023"
          subtitle="4–7 августа 2023 г., г.п. Сопоцкин, Гродненская область — Епархиальный Дом милосердия «Каритас»."
          ctaLabel="Смотреть интенсив 2026"
          ctaHref="/summerintensive2026"
        />
        <EventDetails
          description={[
            "Спикеры: Рустем Максудов (25 лет практики в медиации), Надежда Федина (ненасильственное общение), Оксана Шульга, Елена Рагулина, Велина Рожко.",
          ]}
          groups={[
            {
              heading: "Темы школы",
              items: [
                "Работа с эмоциями в медиации",
                "Ненасильственное общение",
                "Модели семейной коммуникации",
                "Личный бренд медиатора",
              ],
            },
            {
              heading: "Стоимость (для справки)",
              items: [
                "Участие: 400–450 BYN / 15 000 RUB",
                "Полный пакет с проживанием: 615 BYN",
                "Онлайн-участие: 300 BYN",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}

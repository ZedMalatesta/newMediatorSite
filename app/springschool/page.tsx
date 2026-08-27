import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/springschool") },
  title: "Весенняя школа медиаторов 2023",
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
          imageSrc="/images/pages/springschool/21-p5950267.jpg"
        />
        <PageBlocks page="springschool" />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/summerschool") },
  title: "Летняя школа медиаторов 2023",
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
          imageSrc="/images/shared/asset-10.jpg"
        />
        <PageBlocks page="summerschool" />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";
import { absoluteUrl } from "@lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/conflictology") },
  title: "Конфликтология: навыки для жизни",
  description:
    "Короткий онлайн-вебинар о медиации как технологии разрешения конфликтов: смена угла зрения на конфликт и практические техники.",
};

export default function ConflictologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Вебинар"
          title="Конфликтология: навыки для жизни"
          subtitle="ZOOM, 1–2 часа. Дата формируется по мере набора группы."
          meta={["Стоимость уточняйте по телефону"]}
          imageSrc="/images/pages/conflictology/03-lawyer-talking-clien.jpg"
        />
        <PageBlocks page="conflictology" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}

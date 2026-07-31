import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Точка роста | МедиаторОк Проф",
  description:
    "Финансовый курс для медиаторов, психологов, коучей и предпринимателей: управление личными финансами, психология денег, выход из долгов, инвестиции.",
};

export default function TochkaRostaPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Финансовый курс"
          title="Точка роста"
          subtitle="Вторники и пятницы, 19:00–20:30."
          meta={["320 BYN / 9 000 RUB"]}
          imageSrc="/images/pages/tochkarosta/10-image.jpg"
        />
        <PageBlocks page="tochkarosta" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import TopBar from "@layout/TopBar";
import Navbar from "@layout/Navbar";
import Footer from "@layout/Footer";
import { EventHero } from "@sections/EventHero/EventHero";
import { EventSignup } from "@sections/EventSignup/EventSignup";
import PageBlocks from "@ui/PageBlocks";

export const metadata: Metadata = {
  title: "Клинические аспекты функционирования личности | МедиаторОк Проф",
  description:
    "Онлайн-лекторий об уровнях функционирования личности: пограничный, нарциссический, мазохистический, параноидно-депрессивный, шизоидный, диссоциативный, истерический типы.",
};

export default function ClinicalAspectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>
        <EventHero
          eyebrow="Лекторий"
          title="Клинические аспекты функционирования личности"
          subtitle="7 встреч, 36 часов. Пятницы, 20:00–21:00 по Zoom."
          meta={["50 BYN за лекцию", "350 BYN за курс целиком"]}
        />
        <PageBlocks page="clinicalaspects" />
        <EventSignup />
      </main>
      <Footer />
    </div>
  );
}
